// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDMgdpcXM4xSIU4a3SvLjnhW2uUYwEu0Nk",
    authDomain: "blockestate-16851.firebaseapp.com",
    projectId: "blockestate-16851",
    storageBucket: "blockestate-16851.firebasestorage.app",
    messagingSenderId: "512270413027",
    appId: "1:512270413027:web:757eeae0732e8eb4ca29d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
