import express from "express";
import { mainRouter } from "./src/routes/mainRouter.js";
import { serverPort } from "./src/config/dotenv.js";

const app=express();
const port=serverPort;

app.use(express.json());

app.use("/api/v1", mainRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})