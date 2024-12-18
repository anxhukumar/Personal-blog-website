import { Router } from "express";
import { postBlog, getAllTechBlogSnippet, getAllLifeBlogSnippet } from "../controllers/blogController.js"
import { adminRegister } from "../controllers/adminController.js";
import { adminLogin, checkIfLoggedIn, tokenVerification, adminLogout } from "../middlewares/loginVerification.js";
import { getBlogById, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { getMessageById, countIfRead, messagePreview, deleteMsg, updateReadValue } from "../controllers/messageController.js";
import { searchAnyBlog } from "../controllers/searchController.js";
import { adminSignup, adminVerifyToken, adminSignin, adminCreateBlog, adminGetBlog, adminUpdateBlog, adminDeleteBlog, adminSearchBlogs,
         adminGetBlogById, adminGetMessagePreview, adminGetMessage, adminMessageCount, adminDeleteMessage, adminMarkMessageAsRead, 
         adminSignout, adminGetAllTechSnippets, adminGetAllLifeSnippets} 
         from "../config/dotenv.js";
import { rateLimiter } from "../middlewares/rateLimiter.js";


export const admin=Router();
const loginRateLimiter = rateLimiter(1440, 10)

admin.post(adminSignup, adminRegister) //register as an admin
admin.post(adminVerifyToken, tokenVerification) //takes token and sends boolean if the userName exists or not.
admin.post(adminSignin, loginRateLimiter, adminLogin) //authenticates the admin to use the blog editor.
admin.post(adminCreateBlog, checkIfLoggedIn, postBlog) //posts the written blog to the database.
admin.get(adminGetBlog, checkIfLoggedIn, getBlogById)//fill blog data in editor to update.
admin.patch(adminUpdateBlog, checkIfLoggedIn, updateBlog)//update the blog
admin.delete(adminDeleteBlog, checkIfLoggedIn, deleteBlog) //delete a blog
admin.get(adminSearchBlogs, checkIfLoggedIn, searchAnyBlog) //searches for the blog titles
admin.get(adminGetBlogById, checkIfLoggedIn, getBlogById) //get published or unpublished specific blog with id
admin.get(adminSignout, checkIfLoggedIn, adminLogout) //log out
admin.get(adminGetAllTechSnippets, checkIfLoggedIn, getAllTechBlogSnippet) //get unpublished and published blog snippets
admin.get(adminGetAllLifeSnippets, checkIfLoggedIn, getAllLifeBlogSnippet) //get unpublished and published blog snippets

admin.get(adminGetMessagePreview, checkIfLoggedIn, messagePreview ) //get the few lines of all the messages
admin.get(adminGetMessage, checkIfLoggedIn, getMessageById) //get the full data of messages with the id
admin.get(adminMessageCount, checkIfLoggedIn, countIfRead) //count the total messages, unread messages
admin.delete(adminDeleteMessage, checkIfLoggedIn, deleteMsg) //get the id and delete a message
admin.patch(adminMarkMessageAsRead, checkIfLoggedIn, updateReadValue)//get the id and change the read to true