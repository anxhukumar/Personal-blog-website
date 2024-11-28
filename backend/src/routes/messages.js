import { Router } from "express";
import { postMessage } from "../controllers/messageController.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";


export const messages = Router();

const messageRateLimiter = rateLimiter(60, 2)

messages.post("/submit", messageRateLimiter, postMessage);
