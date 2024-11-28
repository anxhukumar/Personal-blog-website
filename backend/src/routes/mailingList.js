import { Router } from "express";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { postEmail } from "../controllers/mailingListController.js";

export const mailingList=Router();

const emailRateLimiter = rateLimiter(30, 2)

mailingList.post("/submit", emailRateLimiter, postEmail);