import mongoose from "mongoose";
import { dblink } from "../config/dotenv.js"

export const db=mongoose.connect(dblink);
