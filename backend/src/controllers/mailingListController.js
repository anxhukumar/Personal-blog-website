import { mailingListData } from "../models/mailingListModel.js";
import {z} from "zod";

const zodSchema=z.object({
    email:z.string().email()
});

export const postEmail = async(req, res) => {
    try{
    const email=req.body;
    let response=zodSchema.safeParse(email);
    if (response.success) {
        await mailingListData.create(email);
        res.json({msg: "email posted successfully!"});
    }else{
        res.status(400).json({msg: "Invalid input."})
    }
    }catch(err) {
        res.status(500).json({error: "An error occurred while posting email."});
    }
}