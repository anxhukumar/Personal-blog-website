import env from "dotenv";

env.config();

export const serverPort=process.env.PORT;
export const dblink=process.env.DBLINK;
export const jwtPass=process.env.JWT_PASSWORD;
export const newAdminKey=process.env.NEW_ADMIN_SECRET_KEY;
export const dataSourceKey=process.env.DATA_SOURCE_KEY;


// ------------------------------------------------------------------------------------------------------------------------------
 

// MAINROUTER ENDPOINTS
export const mailList = process.env.MAILING_LIST;
export const lifeBlogs = process.env.LIFE_BLOGS;
export const techBlogs = process.env.TECH_BLOGS;
export const adminDashboard = process.env.ADMIN;
export const userMessages = process.env.MESSAGES;

// MAIL_LIST ENDPOINTS
export const mailSubmit = process.env.MAIL_SUBMIT;

// TECH BLOG ENDPOINTS
export const techBlogHome = process.env.TECH_BLOG_HOME;
export const techBlog = process.env.TECH_BLOG;
export const techBlogSearch = process.env.TECH_BLOG_SEARCH;
export const techBlogCount = process.env.TECH_BLOG_COUNT;
export const techBlogTopics = process.env.TECH_BLOG_TOPICS;

// LIFE BLOG ENDPOINTS
export const lifeBlogHome = process.env.LIFE_BLOG_HOME;
export const lifeBlog = process.env.LIFE_BLOG;
export const lifeBlogSearch = process.env.LIFE_BLOG_SEARCH;
export const lifeBlogCount = process.env.LIFE_BLOG_COUNT;
export const lifeBlogTopics = process.env.LIFE_BLOG_TOPICS;

// ADMIN ENDPOINTS
export const adminSignup = process.env.ADMIN_REGISTER;
export const adminVerifyToken = process.env.ADMIN_VERIFY_TOKEN;
export const adminSignin = process.env.ADMIN_LOGIN;
export const adminCreateBlog = process.env.ADMIN_CREATE_BLOG;
export const adminGetBlog = process.env.ADMIN_GET_BLOG;
export const adminUpdateBlog = process.env.ADMIN_UPDATE_BLOG;
export const adminDeleteBlog = process.env.ADMIN_DELETE_BLOG;
export const adminSearchBlogs = process.env.ADMIN_SEARCH_BLOGS;
export const adminGetBlogById = process.env.ADMIN_GET_BLOG_BY_ID;
export const adminGetMessagePreview = process.env.ADMIN_GET_MESSAGE_PREVIEW;
export const adminGetMessage = process.env.ADMIN_GET_MESSAGE;
export const adminMessageCount = process.env.ADMIN_MESSAGE_COUNT;
export const adminDeleteMessage = process.env.ADMIN_DELETE_MESSAGE;
export const adminMarkMessageAsRead = process.env.ADMIN_MARK_MESSAGE_AS_READ;

// MESSAGES ENDPOINTS
export const messageSubmit = process.env.MESSAGE_SUBMIT;