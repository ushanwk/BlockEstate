import algosdk from 'algosdk';
import InvestorWallet from "../models/investorWallet.model.js";

export const createInvestorWallet = async (firebaseUID) => {
    const account = algosdk.generateAccount();
    const mnemonic = algosdk.secretKeyToMnemonic(account.sk);

    const newWallet = new InvestorWallet({
        firebaseUID,
        walletAddress: account.addr,
        mnemonic
    });

    await newWallet.save();

    return {
        address: account.addr,
        mnemonic
    };
};
