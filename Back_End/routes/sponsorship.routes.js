import {Router} from "express";
import propertyRouter from "./property.routes.js";
import Sponsorship from "../models/sponsorship.model.js";
import Property from "../models/property.model.js";

const sponsorshipRouter = Router();

sponsorshipRouter.post("/create", async (req, res) => {
    try {
        const { propertyId, startingDate, endingDate, amountPaid } = req.body;

        // Validation
        if (!propertyId || !startingDate || !endingDate || !amountPaid) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        const newSponsorship = new Sponsorship({
            propertyId,
            startingDate,
            endingDate,
            amountPaid,
        });

        await newSponsorship.save();

        res.status(201).json({
            message: 'Sponsorship created successfully.',
            sponsorship: newSponsorship,
        });
    } catch (error) {
        console.error('Error creating sponsorship:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

// GET all sponsorships for a specific agency
sponsorshipRouter.get('/agency/:agencyId', async (req, res) => {
    const { agencyId } = req.params;

    try {
        // Step 1: Get all properties owned by the agency
        const properties = await Property.find({ agencyId }, '_id');

        const propertyIds = properties.map(p => p._id);

        // Step 2: Get sponsorships for those properties
        const sponsorships = await Sponsorship.find({ propertyId: { $in: propertyIds } })
            .populate('propertyId', 'title') // populate only the 'name' of the property
            .lean(); // plain JS objects

        const now = new Date();

        // Step 3: Format sponsorship data
        const enrichedSponsorships = sponsorships.map(sponsorship => {
            let status = 'UPCOMING';
            if (now >= new Date(sponsorship.startingDate) && now <= new Date(sponsorship.endingDate)) {
                status = 'RUNNING';
            } else if (now > new Date(sponsorship.endingDate)) {
                status = 'EXPIRED';
            }

            console.log(sponsorship)

            return {
                _id: sponsorship._id,
                propertyName: sponsorship.propertyId?.title || 'Unknown Property',
                startingDate: sponsorship.startingDate,
                endingDate: sponsorship.endingDate,
                amountPaid: sponsorship.amountPaid,
                status,
            };
        });

        res.status(200).json(enrichedSponsorships);
    } catch (error) {
        console.error('Error fetching sponsorships for agency:', error.message);
        res.status(500).json({ message: 'Server error while fetching sponsorships' });
    }
});



export default sponsorshipRouter;