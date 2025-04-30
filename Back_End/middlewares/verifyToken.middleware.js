import admin from "../config/firebaseAdmin.config.js";

// initialize admin only once
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(require("../config/firebaseAdmin.config.js")),
    });
}

const verifyFirebaseToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken; // you can access uid, email, etc. from here
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid token" });
    }
};

export default verifyFirebaseToken;
