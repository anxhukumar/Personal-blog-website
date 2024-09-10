import { Router } from "express";
import { emailRateLimiter } from "../middlewares/emailRateLimiter.js";
import { postEmail } from "../controllers/mailingListController.js";

export const mailingList=Router();

mailingList.post("/submit", emailRateLimiter, postEmail);