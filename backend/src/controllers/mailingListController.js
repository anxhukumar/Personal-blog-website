import { mailingListData } from "../models/mailingListModel.js";
import {z} from "zod";

const zodSchema=z.object({
    email:z.string().email()
});

export const postEmail = async(req, res) => {
    const email=req.body;
    let response=zodSchema.safeParse(email);
    if (response.success) {
        await mailingListData.create(email);
        res.json({msg: "email posted successfully!"});
    }else{
        res.json({msg: "Invalid input."})
    }
}