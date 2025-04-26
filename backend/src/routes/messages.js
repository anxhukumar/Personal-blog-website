import { Router } from "express";
import { postMessage } from "../controllers/messageController.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { messageSubmit } from "../config/dotenv.js";


export const messages = Router();

const messageRateLimiter = rateLimiter(60, 2)

messages.post(messageSubmit, messageRateLimiter, postMessage);
