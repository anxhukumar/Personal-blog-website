import { mailingListData } from "../models/mailingListModel.js";
import {z} from "zod";
import { dataSourceKey } from "../config/dotenv.js";

const zodSchema=z.object({
    email:z.string().email().min(1, "Email is required").max(60, "Email cannot exceed 60 characters")
});

export const postEmail = async(req, res) => {
    try{
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being sent from unauthorized source"})}
    
    if (!req.body.email || req.body.email.trim() === '') {
        return res.status(400).json({msg: "Invalid input."})
    }
    const email=req.body;
    let response=zodSchema.safeParse(email);
    if (response.success) {
        
        const existingEmail = await mailingListData.findOne({ email: email.email });
            
        if (existingEmail) {
            return res.json({msg: "Email already exists"})
        }
        
        await mailingListData.create(email);
        
        res.json({msg: "email posted successfully!"});
    }else{
        res.status(400).json({msg: "Invalid input."})
    }
    }catch{
        res.status(500).json({msg: "An error occurred while posting email."});
    }
}