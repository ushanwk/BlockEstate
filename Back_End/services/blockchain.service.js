import algosdk, {mnemonicToSecretKey} from 'algosdk';
import InvestorWallet from "../models/investorWallet.model.js";
import { SYSTEM_WALLET_MN, SYSTEM_WALLET_ADDR } from '../config/env.config.js'



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



const token = "429687815be14b8b23c3cc89e23eb8b03a9aa6e99dc89dc777c8b9646d68e331";
const server = "https://testnet-api.algonode.cloud/";
const port = 443;

let algodClient = new algosdk.Algodv2(token, server, port);


const creator = algosdk.mnemonicToSecretKey(SYSTEM_WALLET_MN);

export const createAsset = async function (unit, asset, total) {
    const suggestedParams = await algodClient.getTransactionParams().do();

    console.log(total)

    const t = parseInt(total)

    const txn = algosdk.makeAssetCreateTxnWithSuggestedParamsFromObject({
        from: creator.addr,
        suggestedParams,
        defaultFrozen: false,
        unitName: unit,
        assetName: asset,
        manager: creator.addr,
        reserve: creator.addr,
        freeze: creator.addr,
        clawback: creator.addr,
        assetURL: "https://www.forbes.com/advisor/in/investing/cryptocurrency/what-is-an-nft-how-do-nfts-work/",
        total: t,
        decimals: 0,
    });

    const signedTxn = txn.signTxn(creator.sk);
    await algodClient.sendRawTransaction(signedTxn).do();

    const result = await algosdk.waitForConfirmation(
        algodClient,
        txn.txID().toString(),
        3
    );

    const assetIndex = result['asset-index'];
    return assetIndex;
}


export const findAccountAssets = async function (assetId) {
    if(assetId === "NOT SET")return null;

    let account_info = await algodClient.accountInformation(creator.addr).do();
    let assets = account_info.assets;

    for(let i = 0; i < assets.length; i++) {
        if(assets[i]['asset-id'] === parseInt(assetId)) {
            let asset_info = await algodClient.getAssetByID(parseInt(assetId)).do();
            return {
                holding: assets[i],
                metadata: asset_info.params
            };
        }
    }

    return null;
}