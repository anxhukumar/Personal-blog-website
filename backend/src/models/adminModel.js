import mongoose from "mongoose";
import { db } from "../config/db.js";

const adminSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    userName: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        unique: true
    }
});

export const adminData = mongoose.model('AdminData', adminSchema);