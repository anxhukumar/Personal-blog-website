import { db } from "../config/db";

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true, 
    },
    content: {
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
      type: Date,
      default: Date.now, 
    },
    tags: [String], 
    isPublished: {
      type: Boolean,
      default: false, 
    },
  });

export const blogData=mongoose.model('BlogData', blogSchema);