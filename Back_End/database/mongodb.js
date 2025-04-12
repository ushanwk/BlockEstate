import mongoose from 'mongoose';
import { DB_URI } from "../config/env.config.js";

if(!DB_URI){
    throw new Error("MongoDB URI doesn't exist");
}

const connectToDatabase = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log("MongoDB Connected successfully");
    } catch(err){
        console.error("Error connecting database");
        process.exit(1);
    }
}

export default connectToDatabase;