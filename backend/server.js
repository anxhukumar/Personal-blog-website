import express from "express";
import { mainRouter } from "./src/routes/mainRouter";

const app=express();
const port=3000;

app.use("/api/v1", mainRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})