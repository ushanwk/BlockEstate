import mongoose from 'mongoose';

const agencySchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
    },
    agencyName:{
        type: String,
        minlength: 2,
        maxlength: 60,
        trim: true,
        default: 'NOTSET',
    },
    country: {
        type: String,
        minlength: 2,
        maxlength: 60,
        default: 'NOTSET',
    },
    approveStatus: {
        type: String,
        enum: ['APPROVED', 'PENDING', 'REJECTED'],
        default: 'PENDING',
    },
    tinNumber: {
        type: String,
        minlength: 2,
        maxlength: 30,
    },
    brUrl: {
        type: String,
        required: true,
    }
});

const Agency = mongoose.model('Agency', agencySchema);
export default Agency;