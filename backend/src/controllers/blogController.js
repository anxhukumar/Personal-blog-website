import { blogData } from "../models/blogModel.js";
import { convertDateFormat } from "./dateformatController.js";
import { dataSourceKey } from "../config/dotenv.js";
import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';
import * as cheerio from 'cheerio';
import readingTime from 'reading-time';

export const postBlog = async(req, res) => {
    try{
    const dataReceived=req.body;
    
    //Gets the mainContent and extracts plain text from it
    const editorData = dataReceived.mainContent;
    const $ = cheerio.load(editorData);
    const decodedText = $.root().text();
    
    //Calculates the reading time of the plainText
    const stats = readingTime(decodedText);
    
    //Sanitizing the blog data before storing to prevent xss attacks 
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const sanitizedTags = (dataReceived.tags).map(tag => purify.sanitize(tag));
    const blog = {
        ...dataReceived,
        mainContent: purify.sanitize(dataReceived.mainContent),
        title: purify.sanitize(dataReceived.title),
        overview: purify.sanitize(dataReceived.overview),
        tags: sanitizedTags,
        readingTime: stats.text
    }
    
    if (!blog) {
        return res.status(400).json({error: "Invalid input"})
    }
    await blogData.create(blog);
    res.json({msg: "blog posted successfully!"});
    }catch(err) {
        res.status(500).json({error: "An error occurred while positing blog."})
    }
}

export const getTechBlogSnippet = async(req, res) => {
    try{
    
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
    
    let response= await blogData.find({category:"Tech"}).select('title overview datePublished isPublished category');
    response = response.map(blog => {
        const formattedDate = convertDateFormat(blog.datePublished);
        return {
            ...blog.toObject(),
            formattedDate
        }
    });
    res.json(response);
}catch(err) {
    res.status(500).json({error: "An error occurred while getting blog data."});
}
} 
export const getLifeBlogSnippet = async(req, res) => {
    try{
        
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
    
    let response= await blogData.find({category:"Life"}).select('title overview datePublished isPublished category');
    response = response.map(blog => {
        const formattedDate = convertDateFormat(blog.datePublished);
        return {
            ...blog.toObject(),
            formattedDate
        }
    });                                     
    res.json(response);
}catch(err) {
    res.status(500).json({error: "An error occurred while getting blog data."});
}
}

export const getBlogById = async(req, res) => {
    try{
        
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
    
    const id=req.headers.id;
    if (!id) {
        return res.status(400).json({error: "Blog not found."})
    }
    let response = await blogData.findById(id);
    response = response.toObject();
    const formattedDate = convertDateFormat(response.datePublished);
    response.formattedDate=formattedDate;                                        
    res.json(response);
    }catch(err) {
        res.status(500).json({error: "An error occurred while getting blog data."});
    }
}

export const updateBlog = async (req, res) => {
    try{
        const dataReceived=req.body;
    
        //Gets the mainContent and extracts plain text from it
        const editorData = dataReceived.mainContent;
        const $ = cheerio.load(editorData);
        const decodedText = $.root().text();
        
        //Calculates the reading time of the plainText
        const stats = readingTime(decodedText);
        
        //Sanitizing the blog data before storing to prevent xss attacks 
        const window = new JSDOM('').window;
        const purify = DOMPurify(window);
        const sanitizedTags = (dataReceived.tags).map(tag => purify.sanitize(tag));
        const blog = {
            ...dataReceived,
            mainContent: purify.sanitize(dataReceived.mainContent),
            title: purify.sanitize(dataReceived.title),
            overview: purify.sanitize(dataReceived.overview),
            tags: sanitizedTags,
            readingTime: stats.text
        }
        const id=blog._id;
        await blogData.updateOne({
            _id:id
        },(
            blog
        ))
        res.json({msg:"Blog updated successfully"});
    }catch(err) {
        res.status(500).json({error: "An error occurred while updating data."})
    }
}

export const deleteBlog = async (req, res) => {
    try{
    const id=req.params.id;
    if (!id) {
        return res.status(400).json({error: "Id not found."})
    }
    await blogData.deleteOne({
        _id: id
    });
    res.json ({msg: "Blog deleted successfully"})
    }catch(err) {
        res.status(500).json({error: "An error occurred while deleting data."})
    }
}