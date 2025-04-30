import {Router} from "express";
import Admin from "../models/admin.model.js";

const adminRouter = Router();

adminRouter.post('/register-admin', async (req, res) => {
    const {firebaseId, firstName, lastName, nic} = req.body;

    let newAdmin = new Admin({
        firebaseId,
        firstName,
        lastName,
        nic
    });
    await newAdmin.save();

    return res.status(200).json({ message: "Admin registered successfully" });
});


export default adminRouter;