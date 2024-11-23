import { Router } from "express";
import { postBlog } from "../controllers/blogController.js"
import { adminRegister } from "../controllers/adminController.js";
import { adminLogin, checkIfLoggedIn, tokenVerification } from "../middlewares/loginVerification.js";
import { getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { getMessageById, countIfRead, messagePreview } from "../controllers/messageController.js";
import { searchAnyBlog } from "../controllers/searchController.js";


export const admin=Router();

admin.post("/register", adminRegister) //register as an admin
admin.post("/verify", tokenVerification) //takes token and sends boolean if the userName exists or not.
admin.post("/login", adminLogin) //authenticates the admin to use the blog editor.
admin.post("/submit", checkIfLoggedIn, postBlog) //posts the written blog to the database.
admin.get("/blog/", checkIfLoggedIn, getBlogById)//fill blog data in editor to update.
admin.post("/update", checkIfLoggedIn, updateBlog)//update the blog
admin.post("/delete", checkIfLoggedIn, deleteBlog) //delete a blog
admin.get("/blog-search", checkIfLoggedIn, searchAnyBlog) //searches for the blog titles

admin.get("/messagesPreview", checkIfLoggedIn, messagePreview ) //get the few lines of all the messages
admin.get("/message", checkIfLoggedIn, getMessageById) //get the full data of messages with the id
admin.get("/message-count", checkIfLoggedIn, countIfRead) //count the total messages, unread messages