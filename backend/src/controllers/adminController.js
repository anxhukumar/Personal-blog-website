import { adminData } from "../models/adminModel.js";
import { createHash, compareHash } from "../middlewares/hash.js";
import {z} from "zod";


const zodSchema=z.object({
    firstName:z.string().min(1, "First name is required"),
    lastName:z.string().min(1, "Last name is required"),
    userName:z.string().min(1, "Username is required"), 
    password:z.string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[^\s]+$/, {
            message: "Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and no spaces",
        })
});

export const adminRegister = async (req, res) => {
    const signUpData=req.body;
    let response=zodSchema.safeParse(signUpData);
    if (response.success) {
        const {password, ...rest} = signUpData;
        //Hashing the password with 10 salt rounds
        const hashedPassword= await createHash(password);
        await adminData.create({
            ...rest,
            password: hashedPassword
        });
        res.json({msg: "user registered successfully!"});
    }else{
        res.json({msg: "Invalid input."})
    }
}

export const adminLogin = async (req, res) => {
    const signInData=req.body;
    const userName=signInData.userName;
    try{const userData = await adminData.findOne({
        userName: userName
    });
    const isCorrect = await compareHash(signInData.password, userData.password) 
    //now if isCorrect is true return jwt and enable login or if wrong give error message
    
    }catch(err){
        res.json({msg:"Invalid Username!"})
    }
}