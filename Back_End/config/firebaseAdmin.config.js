import admin from "firebase-admin";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const serviceAccount = require("../firebase.key.json");

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: "gs://blockestate-16851.firebasestorage.app",
    });
} else {
    admin.app();
}

export default admin;
