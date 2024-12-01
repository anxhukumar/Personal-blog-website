import { Router } from "express";
import { getLifeBlogSnippet, getPublishedBlogById, totalLifeBlogCount, getLifeBlogTopics } from "../controllers/blogController.js";
import { searchLifeBlog } from "../controllers/searchController.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

export const life=Router();

const searchRateLimiter = rateLimiter(1, 10) // allowing 10 search request each minute

life.get("/home", getLifeBlogSnippet) //get the title, overview and date of the blog and show it on the home page.
life.get("/",getPublishedBlogById) //get specific blog with id
life.get("/search", searchRateLimiter, searchLifeBlog) //search for the blogs
life.get("/totalCount", totalLifeBlogCount) //gives the total number of blogs in this category
life.get("/getTopics", getLifeBlogTopics) //get topics of blogs