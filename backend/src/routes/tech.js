import { Router } from "express";
import { getTechBlogSnippet, getBlogById } from "../controllers/blogController.js";
import { searchTechBlog } from "../controllers/searchController.js";

export const tech=Router();

tech.get("/home", getTechBlogSnippet) //get the title, overview and date of the blog and show it on the home page.
tech.get("/", getBlogById) //get specific blog with id
tech.get("/search", searchTechBlog) //search for the blogs