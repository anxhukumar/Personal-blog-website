import { adminData } from "../models/adminModel.js";
import { compareHash } from "../config/hash.js";
import { jwtToken, jwtVerify } from "../config/jwtLogin.js";


export const adminLogin = async (req, res) => {
    try{
    const signInData=req.body;
    const userName=signInData.userName;
    if(userName.length < 1) return res.json({msg:"Invalid input"})
    try{const userData = await adminData.findOne({
        userName: userName
    });
    const isCorrect = await compareHash(signInData.password, userData.password) 
    
    if (isCorrect) {
        const token=jwtToken(userName);
        res.cookie('token', `Bearer ${token}`, {
            httpOnly: true,            // Prevents JavaScript from accessing the cookie
            secure: true,               //only applicable for https servers
            sameSite: 'None',        // Prevents the cookie from being sent in cross-site requests
            path: '/',                 // Cookie is accessible across the entire domain
            maxAge: 86400 * 1000,             // Max age of 1 day in seconds (alternative to expires)
          });
        res.json({status:"Logged in", token}); //this token needs to be saved on the client-side
    }else {
        res.json({msg:"Invalid password"})
    }
    }catch(err){
        res.json({msg:"Invalid username"})
    }
    }catch(err) {
        res.status(500).json({error: "An error occurred while logging in."});
    }
}

export const checkIfLoggedIn = async (req, res, next) => {
    try{
    const authData=req.cookies.token; //get token from client side if it exists
    const token=authData.split(' ')[1];
    if (!token) {
        return res.status(401).json({msg: "Unauthorized access, try login or sign up"});
    }
    try{
        const userNameFromJwt=jwtVerify(token);
        const ifExists = await adminData.exists({
        userName:userNameFromJwt
        });
        if (ifExists) {
            next();
        }else{
            return res.status(401).json({msg: "Unauthorized access, try login or sign up"});
        }
    }catch(err) {
        return res.status(401).json({msg: "Unauthorized access, try login or sign up"});
    }
    }catch(err) {error: "An error occured while fethching jwt data."}
}


export const tokenVerification = async(req, res) => {
    try{
        const authData=req.cookies.token;
        const token=authData.split(' ')[1];
        const userNameFromJwt = jwtVerify(token);
        const ifExists = await adminData.exists({
            userName:userNameFromJwt
        });
        
        if (ifExists) {
            return res.json({exists: true});
        }else{
            return res.json({exists: false});
        }
    }catch{
        return res.json({exists: false});
    }
} 

export const adminLogout = async(req, res) => {
    try{
        res.clearCookie('token', {
            httpOnly: true,            // Prevents JavaScript from accessing the cookie
            secure: true,               //only applicable for https servers
            sameSite: 'None',        // Prevents the cookie from being sent in cross-site requests
            path: '/',                 // Cookie is accessible across the entire domain             
          });
        res.json({status:"Logged out"}); 
    }catch{
        res.json({msg: "Error while logging out"})
    }
}
