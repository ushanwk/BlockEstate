import mongoose from 'mongoose';

const SponsorshipSchema = new mongoose.Schema({
    propertyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Property',
        required: true,
    },
    startingDate: {
        type: Date,
        required: true,
    },
    endingDate: {
        type: Date,
        required: true,
    },
    amountPaid: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['RUNNING', 'CLOSED'],
        default: 'RUNNING',
    }
}, { timestamps: true });

const Sponsorship = mongoose.model('Sponsorship', SponsorshipSchema);

export default Sponsorship;
