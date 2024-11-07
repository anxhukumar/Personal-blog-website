import mongoose from "mongoose";
import { db } from "../config/db.js";

const messagesSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    read: {
        type: Boolean,
        default: false
    }
})

export const messagesData = mongoose.model('messagesData', messagesSchema );