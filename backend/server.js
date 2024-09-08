import express from "express";
import { mainRouter } from "./src/routes/mainRouter";
import { serverPort } from "./src/config/dotenv";

const app=express();
const port=serverPort;

app.use("/api/v1", mainRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})