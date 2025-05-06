import {Router} from "express";
import User from "../models/user.model.js";
import verifyFirebaseToken from "../middlewares/verifyToken.middleware.js";
import admin from "firebase-admin";
import Agency from "../models/agency.model.js";
import Admin from "../models/admin.model.js";
import Investor from "../models/investor.model.js";
import Property from "../models/property.model.js";

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

        // Step 3: Get agency-specific data from Agency collection
        const agencyDetails = await Agency.find({});
        const agencyMap = {};
        for (const ag of agencyDetails) {
            // 🆕 Step 3.1: Count how many properties this agency has listed
            const propertyCount = await Property.countDocuments({ agencyId: ag.firebaseId });

            agencyMap[ag.firebaseId] = {
                country: ag.country,
                approveStatus: ag.approveStatus,
                agencyName: ag.agencyName,
                propertyCount: propertyCount // add property count here
            };
        }

        // Step 4: Merge all info together
        const allAgencyUsers = agencyUsers.map(dbUser => {
            const firebaseData = firebaseUserMap[dbUser.firebaseId] || {};
            const ag = agencyMap[dbUser.firebaseId] || {};

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
                agencyName: ag.agencyName || "NOTSET",
                propertyCount: ag.propertyCount || 0 // 🆕 new field
            };
        });

        res.status(200).json({ success: true, data: allAgencyUsers });
    } catch (error) {
        console.error("Error fetching agency users:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});



userRouter.get("/get-profile/:firebaseId", verifyFirebaseToken, async (req, res) => {
    const { firebaseId } = req.params;

    try {
        // Step 1: Get user from main User table
        const user = await User.findOne({ firebaseId });

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Step 2: Get Firebase user data
        const firebaseUser = await admin.auth().getUser(firebaseId);
        const firebaseData = {
            email: firebaseUser.email,
            displayName: firebaseUser.displayName,
            photoURL: firebaseUser.photoURL,
            emailVerified: firebaseUser.emailVerified
        };

        // Step 3: Fetch role-based data
        let roleData = {};
        let name = ""; // Full name

        if (user.role === "INVESTOR") {
            const investor = await Investor.findOne({ firebaseId });
            if (investor) {
                roleData = {
                    firstName: investor.firstName,
                    lastName: investor.lastName,
                    nic: investor.nic,
                    address: investor.address
                };
                name = `${investor.firstName}`;
            }
        } else if (user.role === "AGENCY") {
            const agency = await Agency.findOne({ firebaseId });
            if (agency) {
                roleData = {
                    agencyName: agency.agencyName,
                    country: agency.country,
                    approveStatus: agency.approveStatus,
                    tinNumber: agency.tinNumber,
                    brUrl: agency.brUrl
                };
                name = agency.agencyName;
            }
        } else if (user.role === "ADMIN") {
            const adminUser = await Admin.findOne({ firebaseId });
            if (adminUser) {
                roleData = {
                    firstName: adminUser.firstName,
                    lastName: adminUser.lastName,
                    nic: adminUser.nic
                };
                name = `${adminUser.firstName}`;
            }
        }

        // Step 4: Return all in one nice object
        const profile = {
            firebaseId: user.firebaseId,
            displayName: user.displayName || firebaseData.displayName,
            email: firebaseData.email,
            emailVerified: firebaseData.emailVerified,
            profileImageUrl: user.profileImageUrl || firebaseData.photoURL,
            status: user.isActive,
            role: user.role,
            name: name,
            createdAt: user.createdAt.toDateString(),
            updatedAt: user.updatedAt.toDateString(),
            extra: roleData
        };

        console.log(profile.status);

        res.status(200).json({ success: true, data: profile });

    } catch (error) {
        console.error("Error fetching profile:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
});


userRouter.patch("/update-agency-status/:firebaseId", async (req, res) => {
    const { firebaseId } = req.params;
    const { status } = req.body;

    console.log(firebaseId)

    if (!["APPROVED", "REJECTED"].includes(status)) {
        return res.status(400).json({ message: "Invalid status value." });
    }

    try {
        const agency = await Agency.findOneAndUpdate(
            { firebaseId },
            { approveStatus: status },
            { new: true },
        );

        if (!agency) {
            return res.status(404).json({ message: "Agency not found." });
        }

        res.status(200).json({ message: "Status updated.", agency });
    } catch (error) {
        console.error("Error updating agency status:", error);
        res.status(500).json({ message: "Internal Server Error." });
    }
});


userRouter.get("/get-agency-status/:firebaseId", async (req, res) => {
    const { firebaseId } = req.params;

    try {
        const agency = await Agency.findOne({ firebaseId });

        if (!agency) {
            return res.status(404).json({ message: "Agency not found." });
        }

        return res.status(200).json({
            firebaseId: agency.firebaseId,
            agencyName: agency.agencyName,
            approveStatus: agency.approveStatus,
        });
    } catch (error) {
        console.error("Error fetching agency status:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
});




export default userRouter;