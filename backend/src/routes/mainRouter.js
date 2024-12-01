import { Router } from "express";
import { mailingList } from "./mailingList.js";
import { admin } from "./admin.js";
import { life } from "./life.js";
import { tech } from "./tech.js";
import { messages } from "./messages.js";
import { mailList, lifeBlogs, techBlogs, adminDashboard, userMessages } from "../config/dotenv.js";

export const mainRouter=Router();

mainRouter.use(mailList, mailingList)
mainRouter.use(lifeBlogs, life)
mainRouter.use(techBlogs, tech)
mainRouter.use(adminDashboard, admin)
mainRouter.use(userMessages, messages)