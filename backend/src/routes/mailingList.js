import { Router } from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { postEmail } from "../controllers/mailingListController.js";
import { mailSubmit } from "../config/dotenv.js";

export const mailingList=Router();

const emailRateLimiter = rateLimiter(30, 2)

mailingList.post(mailSubmit, emailRateLimiter, postEmail);