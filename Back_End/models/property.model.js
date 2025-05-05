import mongoose from 'mongoose';

const PropertySchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    totalBlocks: {
        type: Number,
        required: true
    },
    blockPrice: {
        type: Number,
        required: true
    },
    blockRental: {
        type: Number
    },
    remBlocks: {
        type: Number,
        required: true
    },
    size: {
        type: String
    },
    noOfHouses: {
        type: Number
    },
    noOfRooms: {
        type: Number
    },
    noOfGarages: {
        type: Number
    },
    assetId: {
        type: String,
        default: "NOT SET"
    },
    agencyId: {
        type: String,
        required: true
    },
    imageOneUrl: {
        type: String,
        required: true,
    },
    imageTwoUrl: {
        type: String,
        required: true,
    },
    imageThreeUrl: {
        type: String,
        required: true,
    },
}, { timestamps: true });

const Property = mongoose.model('Property', PropertySchema);

export default Property;
