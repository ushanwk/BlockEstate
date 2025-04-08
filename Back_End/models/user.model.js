import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    firebaseId: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'AGENCY', 'INVESTOR'],
        default: 'INVESTOR',
        trim: true,
    },
    displayName: {
        type: String,
        required: true,
        trim: true,
    },
    profileImageUrl: {
        type: String,
        required: true,
    },
    isActive: {
        type: String,
        enum: ['ACTIVE', 'INACTIVE'],
        default: 'ACTIVE',
        trim: true,
    },

}, { timestamps: true });

const User = mongoose.model('User', userSchema);
export default User;