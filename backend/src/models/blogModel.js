import mongoose from "mongoose";
import { db } from "../config/db.js";

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true, 
    },
    overview: {
      type:String,
      required: true
    },
    mainContent: {
      type: String,
      required: true, 
    },
    imageURL: {
      type: String,
    },
    datePublished: {
      type: Date,
      default: Date.now
    },
    tags: [String], 
    isPublished: {
      type: Boolean,
      default: false, 
    },
    category: {
      type: String,
      required: true, 
    }
  });

export const blogData=mongoose.model('BlogData', blogSchema);