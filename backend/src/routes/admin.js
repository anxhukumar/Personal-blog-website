import { Router } from "express";
import { postBlog } from "../controllers/blogController.js"
import { adminRegister } from "../controllers/adminController.js";
import { adminLogin, checkIfLoggedIn } from "../middlewares/loginVerification.js";
import { getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";


export const admin=Router();

admin.post("/register", adminRegister) //register as an admin
admin.post("/login", adminLogin) //authenticates the admin to use the blog editor.
admin.post("/submit", checkIfLoggedIn, postBlog) //posts the written blog to the database.
admin.get("/blog/", checkIfLoggedIn, getBlogById)//fill blog data in editor to update.
admin.post("/update", checkIfLoggedIn, updateBlog)//update the blog
admin.post("/delete", checkIfLoggedIn, deleteBlog) //delete a blog


