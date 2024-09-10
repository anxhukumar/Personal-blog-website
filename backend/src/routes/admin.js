import { Router } from "express";
import { postBlog } from "../controllers/blogController.js"
import { adminRegister, adminLogin } from "../controllers/adminController.js";

export const admin=Router();

admin.post("/register", adminRegister) //register as an admin
admin.post("/login", adminLogin) //authenticates the admin to use the blog editor.
admin.post("/submit", postBlog) //posts the written blog to the database.



