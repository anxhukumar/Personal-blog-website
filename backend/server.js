import express from "express";
import cookieParser from 'cookie-parser';
import { mainRouter } from "./src/routes/mainRouter.js";
import { serverPort, frontendUrl } from "./src/config/dotenv.js";
import cors from "cors";

const app=express();
const port=serverPort;

app.set('trust proxy', 1);

app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: frontendUrl,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: ['datasourcekey', 'id', 'numberOfData', 'topic', 'getall', 'Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
    credentials: true
}))


app.use("/api/v1", mainRouter)

app.use((err, req, res, next) => {
    res.status(500).json({error: "An unexpected error occurred. Please try again later."});
})

app.listen(port, () => {
    console.log(`Server running on port ${port}.`)
})