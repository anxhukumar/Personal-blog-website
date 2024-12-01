import { Router } from "express";
import { getLifeBlogSnippet, getPublishedBlogById, totalLifeBlogCount, getLifeBlogTopics } from "../controllers/blogController.js";
import { searchLifeBlog } from "../controllers/searchController.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";
import { lifeBlogHome,  lifeBlog, lifeBlogSearch, lifeBlogCount, lifeBlogTopics } from "../config/dotenv.js";

export const life=Router();

const searchRateLimiter = rateLimiter(1, 10) // allowing 10 search request each minute

life.get(lifeBlogHome, getLifeBlogSnippet) //get the title, overview and date of the blog and show it on the home page.
life.get(lifeBlog, getPublishedBlogById) //get specific blog with id
life.get(lifeBlogSearch, searchRateLimiter, searchLifeBlog) //search for the blogs
life.get(lifeBlogCount, totalLifeBlogCount) //gives the total number of blogs in this category
life.get(lifeBlogTopics, getLifeBlogTopics) //get topics of blogs