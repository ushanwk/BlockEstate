// src/firebase/auth.js
import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {auth} from "./firebase.config";

export const handleGoogleRegister = async () => {
    try {
        const provider = new GoogleAuthProvider();

        const result = await signInWithPopup(auth, provider);
        const user = result.user;

        // Extract necessary info
        const { uid, email, displayName, photoURL } = user;

        const google = true;

        // Save to local state, context, or temp storage (session/local)
        localStorage.setItem("dataOne", JSON.stringify({ uid, email, displayName, photoURL, google }));

    } catch (error) {
        console.error("Google Sign-In Failed:", error);
    }
};



