import { Router } from "express";
import { postBlog } from "../controllers/blogController.js"

export const admin=Router();

admin.post("/login") //authenticates the admin to use the blog editor.
admin.post("/submit", postBlog) //posts the written blog to the database.



