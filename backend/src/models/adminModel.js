import { db } from "../config/db.js";

const adminSchema = new mongoose.Schema({
    firstName: String(),
    lastName: String(),
    userName: String(),
    password: String()
});

export const adminData = mongoose.model('AdminData', adminSchema);