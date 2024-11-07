import express from "express";
import { mainRouter } from "./src/routes/mainRouter.js";
import { serverPort } from "./src/config/dotenv.js";

const app=express();
const port=serverPort;

app.use(express.json());

app.use("/api/v1", mainRouter)

app.use((err, req, res, next) => {
    res.status(500).json({error: "An unexpected error occurred. Please try again later."});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})