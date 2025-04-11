// src/firebase/auth.js
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebase.config";

// Register user
export const registerUser = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        return user;
    } catch (error) {
        throw error;
    }
};

// Login user
export const loginUser = async (email, password) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
};
