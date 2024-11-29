import { Router } from "express";
import { getLifeBlogSnippet, getBlogById, totalLifeBlogCount } from "../controllers/blogController.js";
import { searchLifeBlog } from "../controllers/searchController.js";


export const life=Router();

life.get("/home", getLifeBlogSnippet) //get the title, overview and date of the blog and show it on the home page.
life.get("/",getBlogById) //get specific blog with id
life.get("/search", searchLifeBlog) //search for the blogs
life.get("/totalCount", totalLifeBlogCount) //gives the total number of blogs in this category