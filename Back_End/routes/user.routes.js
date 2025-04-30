import {Router} from "express";
import User from "../models/user.model.js";
import verifyFirebaseToken from "../middlewares/verifyToken.middleware.js";
import admin from "firebase-admin";
import Agency from "../models/agency.model.js";

const userRouter = Router();

userRouter.post("/get-user-role", async (req, res) => {
    const { firebaseUid } = req.body;

    if (!firebaseUid) {
        return res.status(400).json({ message: "Firebase UID is required" });
    }

    try {
        const user = await User.findOne({ firebaseId: firebaseUid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ role: user.role});
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).json({ message: "Server error" });
    }
});


userRouter.post("/get-user-image", verifyFirebaseToken, async (req, res) => {
    const { firebaseUid } = req.body;
    if (!firebaseUid) {
        return res.status(400).json({ message: "Firebase UID is required" });
    }

    try {
        const user = await User.findOne({ firebaseId: firebaseUid });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ image: user.profileImageUrl});
    } catch (error) {
        console.error("Error fetching user role:", error);
        res.status(500).json({ message: "Server error" });
    }
});


userRouter.get("/get-all-users", verifyFirebaseToken, async (req, res) => {
    try {
        const users = await User.find({}, "-password");
        const listUsersResult = await admin.auth().listUsers();

        const firebaseUserMap = {};
        listUsersResult.users.forEach(firebaseUser => {
            firebaseUserMap[firebaseUser.uid] = {
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                emailVerified: firebaseUser.emailVerified
            };
        });

        const allUsers = users.map(dbUser => {
            const firebaseData = firebaseUserMap[dbUser.firebaseId] || {};

            return {
                firebaseId: dbUser.firebaseId,
                role: dbUser.role,
                displayName: dbUser.displayName || firebaseData.displayName,
                profileImageUrl: dbUser.profileImageUrl || firebaseData.photoURL,
                isActive: dbUser.isActive,
                createdAt: dbUser.createdAt,
                updatedAt: dbUser.updatedAt,
                email: firebaseData.email, // Get email from Firebase
                emailVerified: firebaseData.emailVerified // Get verification status from Firebase
            };
        });

        res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});


userRouter.get("/get-agency-users", verifyFirebaseToken, async (req, res) => {
    try {
        // Step 1: Get AGENCY users from User collection
        const agencyUsers = await User.find({ role: "AGENCY" }, "-password");

        // Step 2: Get Firebase users
        const listUsersResult = await admin.auth().listUsers();
        const firebaseUserMap = {};
        listUsersResult.users.forEach(firebaseUser => {
            firebaseUserMap[firebaseUser.uid] = {
                email: firebaseUser.email,
                displayName: firebaseUser.displayName,
                photoURL: firebaseUser.photoURL,
                emailVerified: firebaseUser.emailVerified
            };
        });

        // Step 3: Get agency-specific data from another collection
        const agencyDetails = await Agency.find({});
        const agencyUsersAg = {};
        agencyDetails.forEach(ag => {
            agencyUsersAg[ag.firebaseId] = {
                country: ag.country,
                approveStatus: ag.approveStatus
            };
        });

        // Step 4: Combine everything
        const allAgencyUsers = agencyUsers.map(dbUser => {
            const firebaseData = firebaseUserMap[dbUser.firebaseId] || {};
            const ag = agencyUsersAg[dbUser.firebaseId] || {};

            return {
                firebaseId: dbUser.firebaseId,
                role: dbUser.role,
                displayName: dbUser.displayName || firebaseData.displayName,
                profileImageUrl: dbUser.profileImageUrl || firebaseData.photoURL,
                isActive: dbUser.isActive,
                createdAt: dbUser.createdAt,
                updatedAt: dbUser.updatedAt,
                email: firebaseData.email,
                emailVerified: firebaseData.emailVerified,
                country: ag.country || null,
                approvalStatus: ag.approveStatus || "PENDING",
            };

        });

        res.status(200).json({ success: true, data: allAgencyUsers });
    } catch (error) {
        console.error("Error fetching agency users:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});



export default userRouter;