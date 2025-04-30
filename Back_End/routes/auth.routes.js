import { Router } from 'express';
import {sendAgencyWelcomeEmail, sendOtpEmail, sendWelcomeEmail} from "../services/email.service.js";
import multer from 'multer';
import admin from "../config/firebaseAdmin.config.js";
import User from "../models/user.model.js";
import Investor from "../models/investor.model.js";
import Agency from "../models/agency.model.js";
import Admin from "../models/admin.model.js";

const storage = multer.memoryStorage();

const upload = multer({ storage }).fields([
    { name: "profilePicture", maxCount: 1 },
    { name: "document", maxCount: 1 }
]);


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
    let uid = null;
    let fileName = null;
    let newUser = null;
    let newInvestor = null;

    try {
        const { email, password, displayName, role, firstName, lastName, nic, address } = req.body;

        const files = req.files;

        const profilePicture = files?.profilePicture?.[0];


        // Step 1: Save user in firebase
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
            emailVerified: true,
        });

        uid = userRecord.uid;


        // Step 2: Upload profile picture with UID as the file name
        const bucket = admin.storage().bucket();

        const extension = profilePicture.originalname.split('.').pop();
        fileName = `Profile_Pictures/${uid}.${extension}`;

        const file = bucket.file(fileName);

        await file.save(profilePicture.buffer, {
            contentType: profilePicture.mimetype,
            public: true,
        });


        // Step 3: Save data in database
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        newUser = new User({
            firebaseId: uid,
            role: role || 'INVESTOR',
            displayName,
            profileImageUrl: imageUrl,
        });
        await newUser.save();

        newInvestor = new Investor({
            firebaseId: uid,
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

        // Rollback: Delete Firebase Auth user
        if (uid) {
            try {
                await admin.auth().deleteUser(uid);
                console.log("Firebase user rolled back");
            } catch (deleteAuthErr) {
                console.error("Failed to delete Firebase user:", deleteAuthErr);
            }
        }

        // Rollback: Delete uploaded profile picture
        if (fileName) {
            try {
                const file = admin.storage().bucket().file(fileName);
                await file.delete();
                console.log("Profile picture deleted from storage");
            } catch (deleteFileErr) {
                console.error("Failed to delete profile picture:", deleteFileErr);
            }
        }

        // Rollback: Delete MongoDB user and investor
        if (newUser?._id) {
            try {
                await User.findByIdAndDelete(newUser._id);
                console.log("MongoDB user document deleted");
            } catch (err) {
                console.error("Failed to delete MongoDB user:", err);
            }
        }

        if (newInvestor?._id) {
            try {
                await Investor.findByIdAndDelete(newInvestor._id);
                console.log("MongoDB investor document deleted");
            } catch (err) {
                console.error("Failed to delete MongoDB investor:", err);
            }
        }

        return res.status(500).json({ error: "Something went wrong" });
    }
});


authRouter.post('/register-investor-google', upload, async (req, res) => {
    let uid = null;
    let fileName = null;
    let newUser = null;
    let newInvestor = null;

    try {
        const { email, displayName, firebaseId} = req.body;

        const files = req.files;

        const profilePicture = files?.profilePicture?.[0];

        uid = firebaseId;

        // Step 2: Upload profile picture with UID as the file name
        const bucket = admin.storage().bucket();

        const extension = profilePicture.originalname.split('.').pop();
        fileName = `Profile_Pictures/${uid}.${extension}`;

        const file = bucket.file(fileName);

        await file.save(profilePicture.buffer, {
            contentType: profilePicture.mimetype,
            public: true,
        });


        // Step 3: Save data in database
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;

        newUser = new User({
            firebaseId: uid,
            role: 'INVESTOR',
            displayName,
            profileImageUrl: imageUrl,
        });
        await newUser.save();

        newInvestor = new Investor({
            firebaseId: uid,
            firstName: displayName,
            lastName: "NOT SET",
            nic: "NOT SET",
            address: "NOT SET",
        });
        await newInvestor.save();

        await sendWelcomeEmail(email, displayName);


        return res.status(200).json({
            message: "Registered successfully!",
        });

    } catch (err) {
        console.error("Register Error:", err);

        // Rollback: Delete Firebase Auth user
        if (uid) {
            try {
                await admin.auth().deleteUser(uid);
                console.log("Firebase user rolled back");
            } catch (deleteAuthErr) {
                console.error("Failed to delete Firebase user:", deleteAuthErr);
            }
        }

        // Rollback: Delete uploaded profile picture
        if (fileName) {
            try {
                const file = admin.storage().bucket().file(fileName);
                await file.delete();
                console.log("Profile picture deleted from storage");
            } catch (deleteFileErr) {
                console.error("Failed to delete profile picture:", deleteFileErr);
            }
        }

        // Rollback: Delete MongoDB user and investor
        if (newUser?._id) {
            try {
                await User.findByIdAndDelete(newUser._id);
                console.log("MongoDB user document deleted");
            } catch (err) {
                console.error("Failed to delete MongoDB user:", err);
            }
        }

        if (newInvestor?._id) {
            try {
                await Investor.findByIdAndDelete(newInvestor._id);
                console.log("MongoDB investor document deleted");
            } catch (err) {
                console.error("Failed to delete MongoDB investor:", err);
            }
        }

        return res.status(500).json({ error: "Something went wrong" });
    }
});


authRouter.post('/register-agency', upload, async (req, res) => {

    let uid = null;
    let profileFileName = null;
    let docFileName = null;
    let newUser = null;
    let newAgency = null;

    try {
        const {
            email,
            password,
            displayName,
            role,
            tinNumber,
            country,
            agencyName
        } = req.body;

        const files = req.files;

        // Step 1: Save user in Firebase
        const userRecord = await admin.auth().createUser({
            email,
            password,
            displayName,
            emailVerified: true,
        });


        uid = userRecord.uid;
        const bucket = admin.storage().bucket();


        //  Step 2: Upload profile picture
        let profileImageUrl = null;

        if (files.profilePicture && files.profilePicture[0]) {
            const profilePic = files.profilePicture[0];
            const profileExt = profilePic.originalname.split('.').pop();
            profileFileName = `Profile_Pictures/${uid}.${profileExt}`;
            const profileFile = bucket.file(profileFileName);

            await profileFile.save(profilePic.buffer, {
                contentType: profilePic.mimetype,
                public: true,
            });

            profileImageUrl = `https://storage.googleapis.com/${bucket.name}/${profileFileName}`;
        }

        // Step 3: Upload document
        let documentUrl = null;

        if (files.document && files.document[0]) {
            const doc = files.document[0];
            const docExt = doc.originalname.split('.').pop();
            docFileName = `Documents/${uid}.${docExt}`;
            const docFile = bucket.file(docFileName);

            await docFile.save(doc.buffer, {
                contentType: doc.mimetype,
                public: true,
            });

            documentUrl = `https://storage.googleapis.com/${bucket.name}/${docFileName}`;
        }

        //  Step 4: Save to MongoDB
        newUser = new User({
            firebaseId: uid,
            role: role || 'AGENCY',
            displayName,
            profileImageUrl,
        });
        await newUser.save();

        newAgency = new Agency({
            firebaseId: uid,
            tinNumber,
            brUrl: documentUrl,
            agencyName: agencyName,
            country: country,
        });
        await newAgency.save();

        await sendAgencyWelcomeEmail(email, displayName);

        return res.status(200).json({ message: "Agency registration data received!" });

    } catch (err) {
        console.error("Register Agency Error:", err);

        // Rollback Firebase Auth
        if (uid) {
            try {
                await admin.auth().deleteUser(uid);
                console.log("Firebase user deleted (rollback)");
            } catch (err) {
                console.error("Error deleting Firebase user:", err);
            }
        }

        // Rollback uploaded files
        const bucket = admin.storage().bucket();

        if (profileFileName) {
            try {
                await bucket.file(profileFileName).delete();
                console.log("Profile picture deleted (rollback)");
            } catch (err) {
                console.error("Error deleting profile picture:", err);
            }
        }

        if (docFileName) {
            try {
                await bucket.file(docFileName).delete();
                console.log("BR document deleted (rollback)");
            } catch (err) {
                console.error("Error deleting BR document:", err);
            }
        }

        // Rollback MongoDB records
        if (newUser?._id) {
            try {
                await User.findByIdAndDelete(newUser._id);
                console.log("MongoDB user deleted (rollback)");
            } catch (err) {
                console.error("Error deleting MongoDB user:", err);
            }
        }

        if (newAgency?._id) {
            try {
                await Agency.findByIdAndDelete(newAgency._id);
                console.log("MongoDB agency deleted (rollback)");
            } catch (err) {
                console.error("Error deleting MongoDB agency:", err);
            }
        }

        return res.status(500).json({ error: "Something went wrong with agency registration" });
    }
});


authRouter.post('/register-agency-google', upload, async (req, res) => {

    let uid = null;
    let profileFileName = null;
    let docFileName = null;
    let newUser = null;
    let newAgency = null;

    try {
        const {
            email,
            displayName,
            tinNumber,
            firebaseId
        } = req.body;

        const files = req.files;



        uid = firebaseId;
        const bucket = admin.storage().bucket();


        //  Step 2: Upload profile picture
        let profileImageUrl = null;

        if (files.profilePicture && files.profilePicture[0]) {
            const profilePic = files.profilePicture[0];
            const profileExt = profilePic.originalname.split('.').pop();
            profileFileName = `Profile_Pictures/${uid}.${profileExt}`;
            const profileFile = bucket.file(profileFileName);

            await profileFile.save(profilePic.buffer, {
                contentType: profilePic.mimetype,
                public: true,
            });

            profileImageUrl = `https://storage.googleapis.com/${bucket.name}/${profileFileName}`;
        }

        // Step 3: Upload document
        let documentUrl = null;

        if (files.document && files.document[0]) {
            const doc = files.document[0];
            const docExt = doc.originalname.split('.').pop();
            docFileName = `Documents/${uid}.${docExt}`;
            const docFile = bucket.file(docFileName);

            await docFile.save(doc.buffer, {
                contentType: doc.mimetype,
                public: true,
            });

            documentUrl = `https://storage.googleapis.com/${bucket.name}/${docFileName}`;
        }

        //  Step 4: Save to MongoDB
        newUser = new User({
            firebaseId: uid,
            role: 'AGENCY',
            displayName,
            profileImageUrl,
        });
        await newUser.save();

        newAgency = new Agency({
            firebaseId: uid,
            tinNumber,
            brUrl: documentUrl,
            agencyName: 'NOT SET',
            country: 'NOT SET',
        });
        await newAgency.save();

        await sendAgencyWelcomeEmail(email, displayName);

        return res.status(200).json({ message: "Agency registration data received!" });

    } catch (err) {
        console.error("Register Agency Error:", err);

        // Rollback Firebase Auth
        if (uid) {
            try {
                await admin.auth().deleteUser(uid);
                console.log("Firebase user deleted (rollback)");
            } catch (err) {
                console.error("Error deleting Firebase user:", err);
            }
        }

        // Rollback uploaded files
        const bucket = admin.storage().bucket();

        if (profileFileName) {
            try {
                await bucket.file(profileFileName).delete();
                console.log("Profile picture deleted (rollback)");
            } catch (err) {
                console.error("Error deleting profile picture:", err);
            }
        }

        if (docFileName) {
            try {
                await bucket.file(docFileName).delete();
                console.log("BR document deleted (rollback)");
            } catch (err) {
                console.error("Error deleting BR document:", err);
            }
        }

        // Rollback MongoDB records
        if (newUser?._id) {
            try {
                await User.findByIdAndDelete(newUser._id);
                console.log("MongoDB user deleted (rollback)");
            } catch (err) {
                console.error("Error deleting MongoDB user:", err);
            }
        }

        if (newAgency?._id) {
            try {
                await Agency.findByIdAndDelete(newAgency._id);
                console.log("MongoDB agency deleted (rollback)");
            } catch (err) {
                console.error("Error deleting MongoDB agency:", err);
            }
        }

        return res.status(500).json({ error: "Something went wrong with agency registration" });
    }
});


authRouter.get('/check-firebase-user/:firebaseId', async (req, res) => {
    const { firebaseId } = req.params;

    console.log(firebaseId)

    let user = await User.findOne({ firebaseId });

    console.log(user);

    if (user) {
        res.json({ exists: true, user });
    } else {
        res.json({ exists: false });
    }
});


export default authRouter;