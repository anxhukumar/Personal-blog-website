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
    author: {
      type: String,
      required: true, 
    },
    imageURL: {
      type: String,
    },
    datePublished: {
      type: String,
      default: function () {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' }).toUpperCase(); 
        const year = date.getFullYear();
        return `${day} ${month} ${year}`;
      }, 
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