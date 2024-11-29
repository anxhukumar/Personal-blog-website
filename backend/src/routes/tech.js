import { Router } from "express";
import { getTechBlogSnippet, getBlogById, totalTechBlogCount, getTechBlogTopics } from "../controllers/blogController.js";
import { searchTechBlog } from "../controllers/searchController.js";

export const tech=Router();

tech.get("/home", getTechBlogSnippet) //get the title, overview and date of the blog and show it on the home page.
tech.get("/", getBlogById) //get specific blog with id
tech.get("/search", searchTechBlog) //search for the blogs
tech.get("/totalCount", totalTechBlogCount) //gives the total number of blogs in this category
tech.get("/getTopics", getTechBlogTopics) //get topics of blogs