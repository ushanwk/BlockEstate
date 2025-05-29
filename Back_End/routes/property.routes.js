import {Router} from "express";
import multer from "multer";
import admin from "../config/firebaseAdmin.config.js";
import Property from "../models/property.model.js";
import mongoose from "mongoose";
import Agency from "../models/agency.model.js";
import {sendPropertyAddedEmail} from "../services/email.service.js";
import {createAsset, findAccountAssets} from "../services/blockchain.service.js";
import {SYSTEM_WALLET_ADDR} from "../config/env.config.js";


const propertyRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage }).fields([
    { name: "images", maxCount: 3 }
]);

propertyRouter.post("/create", upload, async (req, res) => {

    try {
        const {
            title, country, city, address, description,
            totalBlocks, blockPrice, blockRental, remBlocks,
            size, noOfHouses, noOfRooms, noOfGarages, agencyId
        } = req.body;

        const files = req.files?.images;

        if (!files || files.length !== 3) {
            return res.status(400).json({ error: "Exactly 3 images are required." });
        }

        // ✅ Step 1: Create new _id manually
        const newPropertyId = new mongoose.Types.ObjectId();

        // ✅ Step 2: Upload images using the new _id
        const bucket = admin.storage().bucket();
        const imageUrls = [];

        for (let i = 0; i < files.length; i++) {
            const extension = files[i].originalname.split(".").pop();
            const fileName = `Property_Images/${newPropertyId}_${i + 1}.${extension}`;
            const file = bucket.file(fileName);

            await file.save(files[i].buffer, {
                contentType: files[i].mimetype,
                public: true,
            });

            const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
            imageUrls.push(imageUrl);
        }


        //Algorand
        const unit = title.substring(0, 8);       // Max 8 characters
        const assetName = title.substring(0, 32); // Max 32 characters

        const assetId = await createAsset(unit, assetName, remBlocks);


        // ✅ Step 3: Create and save property using manually set _id
        const newProperty = new Property({
            _id: newPropertyId,
            title,
            country,
            city,
            address,
            description,
            totalBlocks,
            blockPrice,
            blockRental,
            remBlocks,
            size,
            noOfHouses,
            noOfRooms,
            noOfGarages,
            assetId: assetId,
            agencyId,
            imageOneUrl: imageUrls[0],
            imageTwoUrl: imageUrls[1],
            imageThreeUrl: imageUrls[2],
        });

        await newProperty.save();


        const agency = await Agency.findOne({ firebaseId: agencyId });

        if (agency && agency.firebaseId) {
            try {
                const firebaseUser = await admin.auth().getUser(agency.firebaseId);

                if (firebaseUser.email) {
                    await sendPropertyAddedEmail(firebaseUser.email, agency.agencyName, title);
                }
            } catch (emailErr) {
                console.error("Failed to send property added email:", emailErr);
            }
        }

        return res.status(201).json({
            message: "Property created successfully!",
            property: newProperty
        });

    } catch (error) {
        console.error("Error creating property:", error);
        return res.status(500).json({ error: "Something went wrong" });
    }
});


propertyRouter.get('/getAll', async (req, res) => {
    try {
        const properties = await Property.find({}, {
            _id: 1,
            title: 1,
            totalBlocks: 1,
            blockPrice: 1,
            country: 1,
            city: 1,
            size: 1
        });

        const transformed = properties.map(p => ({
            id: p._id,
            name: p.title,
            totalBlocks: p.totalBlocks,
            blockPrice: p.blockPrice,
            country: p.country,
            city: p.city,
            size: p.size
        }));

        return res.status(200).json(transformed);
    } catch (error) {
        console.error("Failed to fetch property list:", error);
        return res.status(500).json({ error: "Failed to load properties" });
    }
});


propertyRouter.get('/getByAgency/:agencyId', async (req, res) => {
    const { agencyId } = req.params;

    try {
        const properties = await Property.find({ agencyId }, {
            _id: 1,
            title: 1,
            totalBlocks: 1,
            blockPrice: 1,
            country: 1,
            city: 1,
            size: 1
        });

        const transformed = properties.map(p => ({
            id: p._id,
            name: p.title,
            totalBlocks: p.totalBlocks,
            blockPrice: p.blockPrice,
            country: p.country,
            city: p.city,
            size: p.size
        }));

        return res.status(200).json(transformed);
    } catch (error) {
        console.error("Failed to fetch properties for agency:", error);
        return res.status(500).json({ error: "Failed to load agency properties" });
    }
});

propertyRouter.get('/getIdName/:agencyId', async (req, res) => {
    const { agencyId } = req.params;

    try {
        const properties = await Property.find({ agencyId }, {
            _id: 1,
            title: 1
        });

        const transformed = properties.map(p => ({
            id: p._id,
            name: p.title
        }));

        return res.status(200).json(transformed);
    } catch (error) {
        console.error("Failed to fetch properties for agency:", error);
        return res.status(500).json({ error: "Failed to load agency properties" });
    }
});


propertyRouter.get('/get/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const property = await Property.findById(id);

        if (!property) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json(property);
    } catch (error) {
        console.error('Error fetching property by ID:', error.message);
        res.status(500).json({ message: 'Server error while fetching property' });
    }
});


propertyRouter.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const deletedProperty = await Property.findByIdAndDelete(id);

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.status(200).json({ message: 'Property deleted successfully', deletedProperty });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Server error while deleting property' });
    }
})

propertyRouter.get('/exchange', async (req, res) => {
    try {
        const properties = await Property.find({}, 'title assetId');
        const result = [];

        for (const prop of properties) {
            let assetInfo = null;

            if (prop.assetId && prop.assetId !== "NOT SET") {
                assetInfo = await findAccountAssets(prop.assetId);
            }

            // assetInfo can be null, so destructure carefully
            const holding = assetInfo?.holding;
            const metadata = assetInfo?.metadata;

            console.log('holding', holding);
            console.log('metadata', metadata);

            result.push({
                property: prop.title,
                assetId: prop.assetId,
                unitName: metadata?.['unit-name'] || "N/A",
                assetName: metadata?.name || "N/A",
                unitAmount: holding?.amount || "N/A",
                creator: metadata?.creator || "N/A",
            });
        }

        res.status(200).json(result);
    } catch (error) {
        console.error("Error fetching property and asset data:", error);
        res.status(500).json({ message: "Failed to fetch exchange data." });
    }
});


export default propertyRouter;