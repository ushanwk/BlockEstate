import mongoose from "mongoose";

const InvestorWalletSchema = new mongoose.Schema({
    firebaseUID: {
        type: String,
        required: true,
        unique: true,
    },
    walletAddress: {
        type: String,
        required: true,
        unique: true,
    },
    mnemonic: {
        type: String,
        required: true, // Consider encrypting this
    },
}, { timestamps: true });

const InvestorWallet = mongoose.model('InvestorWallet', InvestorWalletSchema);
export default InvestorWallet;
