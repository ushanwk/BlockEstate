import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
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
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;