import env from "dotenv";

env.config();

export const serverPort=process.env.PORT;
export const dblink=process.env.DBLINK;
