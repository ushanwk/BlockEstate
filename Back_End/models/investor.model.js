import mongoose from 'mongoose';

const investorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        minlength: 2,
        maxlength: 60,
        trim: true,
    },
    lastName: {
        type: String,
        minlength: 2,
        maxlength: 60,
        trim: true,
    },
    nic: {
        type: String,
        minlength: 2,
        maxlength: 20,
        default: "NOTSET",
        trim: true,
    },
    address: {
        type: String,
        minlength: 2,
        maxlength: 60,
        default: "NOTSET",
        trim: true,
    },
});

const Investor = mongoose.model('Investor', investorSchema);
export default Investor;