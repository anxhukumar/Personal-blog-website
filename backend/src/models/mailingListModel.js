import mongoose from "mongoose";
import { db } from "../config/db.js";

const mailingListSchema=new mongoose.Schema({
    email: {
        type: String,                                                                                                               
        required: true,
        unique: true
    },
    subscribed: {
        type: Boolean,
        default: true
    },
    subscriptionDate: {
        type: Date,
        default: Date.now
    }                                                                                                                              
});

export const mailingListData = mongoose.model('MailingListData', mailingListSchema);
