import { adminData } from "../models/adminModel.js";
import { createHash } from "../config/hash.js";
import { newAdminKey } from "../config/dotenv.js";
import {z} from "zod";

const zodSchema=z.object({
    firstName:z.string().min(1, "First name is required"),
    lastName:z.string().min(1, "Last name is required"),
    userName:z.string().min(1, "Username is required"), 
    password:z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/, {
            msg: "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and no spaces",
        }),
    secretKey:z.string()
});

export const adminRegister = async (req, res) => {
    try{
    const signUpData=req.body;
    const secretKey=req.body.secretKey;
    let response=zodSchema.safeParse(signUpData);
    if (response.success) {
        if (secretKey!=newAdminKey) {
            return res.json({msg: "Wrong secret key"})
        }
        const {password, ...rest} = signUpData;
        //Hashing the password with 10 salt rounds
        const hashedPassword= await createHash(password);
        await adminData.create({
            ...rest,
            password: hashedPassword
        });
        res.json({msg: "successful"});
    }else{
        res.json({msg: "Invalid input"})
    }
    }catch(err) {
        res.status(500).json({error: "An error occurred while registering."});
    }
}