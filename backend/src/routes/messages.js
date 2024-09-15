import { Router } from "express";
import { postMessage } from "../controllers/messageController.js";


export const messages = Router();

messages.post("/submit", postMessage);
