import { Router } from "express";
import { getLifeBlogSnippet, getBlogById } from "../controllers/blogController.js";

export const life=Router();

life.get("/home", getLifeBlogSnippet) //get the title, overview and date of the blog and show it on the home page.
life.get("/",getBlogById) //get specific blog with id
