import { Router } from 'express';
import {sendOtpEmail, sendWelcomeEmail} from "../services/email.service.js";
import multer from 'multer';
import admin from "../config/firebaseAdmin.config.js";
import User from "../models/user.model.js";
import Investor from "../models/investor.model.js";

const storage = multer.memoryStorage();
const upload = multer({ storage }).single('profilePicture');

const authRouter = Router();


authRouter.get('/register', (req, res) => {
    res.send({message: "Auth sign up!"});
});

authRouter.post('/register-otp', async(req, res) => {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000);

    const expiresAt = Date.now() + 3 * 60 * 1000;

    try {
        await sendOtpEmail(email, otp);
        res.json({ message: "OTP sent successfully", otp, expiresAt });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ error: "Failed to send email" });
    }
});


authRouter.post('/register-investor', upload, async (req, res) => {
    try {
        const { email, password, displayName, role, firstName, lastName, nic, address } = req.body;
        const profilePicture = req.file;

        console.log('Form data:', req.body);
        console.log('Uploaded file:', profilePicture);

        // Step 1: Save user in firebase
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
            emailVerified: true,
        });

        const uid = userRecord.uid;


        // Step 2: Upload profile picture with UID as the file name
        const bucket = admin.storage().bucket();

        const extension = profilePicture.originalname.split('.').pop();
        const fileName = `Profile_Pictures/${uid}.${extension}`; // e.g., Profile_Pictures/abc123.jpg

        const file = bucket.file(fileName);

        await file.save(profilePicture.buffer, {
            contentType: profilePicture.mimetype,
            public: true,
        });


        // Step 3: Save data in database
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        const newUser = new User({
            firebaseId: uid,
            role: role || 'INVESTOR',
            displayName,
            profileImageUrl: imageUrl,
        });
        await newUser.save();

        const newInvestor = new Investor({
            firstName,
            lastName,
            nic,
            address,
        });
        await newInvestor.save();

        await sendWelcomeEmail(email, displayName);


        return res.status(200).json({
            message: "Registered successfully!",
        });

    } catch (err) {
        console.error("Register Error:", err);
        return res.status(500).json({ error: "Something went wrong" });
    }
});



export default authRouter;