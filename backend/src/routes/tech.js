import { Router } from "express";
import { getTechBlogSnippet, getPublishedBlogById, totalTechBlogCount, getTechBlogTopics } from "../controllers/blogController.js";
import { searchTechBlog } from "../controllers/searchController.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";

export const tech=Router();

const searchRateLimiter = rateLimiter(1, 10) // allowing 10 search request each minute

tech.get("/home", getTechBlogSnippet) //get the title, overview and date of the blog and show it on the home page.
tech.get("/", getPublishedBlogById) //get specific blog with id
tech.get("/search", searchRateLimiter, searchTechBlog) //search for the blogs
tech.get("/totalCount", totalTechBlogCount) //gives the total number of blogs in this category
tech.get("/getTopics", getTechBlogTopics) //get topics of blogs