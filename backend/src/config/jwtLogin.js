import jwt from "jsonwebtoken";
import { jwtPass } from "./dotenv.js";

const password=jwtPass;

export const jwtToken= function (userName) {
    let token = jwt.sign({userName: userName}, password);
    return token;
}

export const jwtVerify= function (token) {
    const decoded = jwt.verify(token, password);
    const userName=decoded.userName;
    return userName;
}

