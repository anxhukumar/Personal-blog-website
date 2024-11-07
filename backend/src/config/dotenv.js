import env from "dotenv";

env.config();

export const serverPort=process.env.PORT;
export const dblink=process.env.DBLINK;
export const jwtPass=process.env.JWT_PASSWORD;
export const newAdminKey=process.env.NEW_ADMIN_SECRET_KEY;
