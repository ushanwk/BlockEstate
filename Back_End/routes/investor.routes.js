import express from "express";
import Investor from "../models/investor.model.js";
import InvestorWallet from "../models/investorWallet.model.js";

const investorRouter = express.Router();

investorRouter.get('/get-name', async (req, res) => {
    try {
        const investors = await Investor.find({});

        const results = await Promise.all(
            investors.map(async (inv) => {
                const wallet = await InvestorWallet.findOne({ firebaseUID: inv.firebaseId });

                return {
                    firebaseId: inv.firebaseId,
                    name: `${inv.firstName} ${inv.lastName}`,
                    walletAddress: wallet?.walletAddress || "Not Available",
                    mnemonic: wallet?.mnemonic || "Not Available",
                };
            })
        );

        res.status(200).json(results);
    } catch (error) {
        console.error('Error fetching investor details:', error);
        res.status(500).json({ message: 'Server Error: Unable to fetch investor details' });
    }
});

export default investorRouter;