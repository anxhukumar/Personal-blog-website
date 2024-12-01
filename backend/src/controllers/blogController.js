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
    
   const limit = parseInt(req.headers.numberofdata);
   const topic = req.headers.topic;
   const getAll= req.headers.getall;
   const criteria = topic ? ({category: "Tech", "tags.0": topic, isPublished: true}):({category: "Tech", isPublished: true})
   let response= await blogData.find(criteria).select('title overview datePublished isPublished category').skip(getAll ? (0):(limit-10)).limit(getAll ? (0):(10));
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
    
    const limit = parseInt(req.headers.numberofdata);
    const topic = req.headers.topic;
    const getAll= req.headers.getall;
    const criteria = topic ? ({category: "Life", "tags.0": topic, isPublished: true}):({category: "Life", isPublished: true})
    let response= await blogData.find(criteria).select('title overview datePublished isPublished category').skip(getAll ? (0):(limit-10)).limit(getAll ? (0):(10));
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

//get published and unpublished blogs (both) by id
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

//get only published blogs by id
export const getPublishedBlogById = async(req, res) => {
    try{
        
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
    
    const id=req.headers.id;
    if (!id) {
        return res.status(400).json({error: "Blog not found."})
    }
    let response = await blogData.findOne({ _id: id, isPublished: true });
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

export const totalTechBlogCount = async (req, res) => {
    try{
    
        const authKey = req.headers.datasourcekey;
        if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
        
        const topic = req.headers.topic;
        const criteria = topic ? ({category: "Tech", "tags.0": topic}):({category: "Tech"});
        const response = await blogData.find(criteria).countDocuments();
    
        res.json({totalBlogCount: response});
        
    }catch(err) {
        res.status(500).json({error: "An error occurred while sending total blog count."})
    }
}

export const totalLifeBlogCount =  async (req, res) => {
    try{
    
        const authKey = req.headers.datasourcekey;
        if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
        
        const topic = req.headers.topic;
        const criteria = topic ? ({category: "Life", "tags.0": topic}):({category: "Life"});
        const response = await blogData.find(criteria).countDocuments();
    
        res.json({totalBlogCount: response});
        
    }catch(err) {
        res.status(500).json({error: "An error occurred while sending total blog count."})
    }
}

export const getTechBlogTopics = async(req, res) => {
    try{
    
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
    
    let response= await blogData.find({category:"Tech", isPublished: true}).select('_id, tags');
   
   const uniqueTags = [];
        const seenTags = new Set();

        response.forEach(doc => {
            const tag = doc.tags[0];
            if (tag && !seenTags.has(tag)) {
                uniqueTags.push({ id: doc._id, topic: tag });
                seenTags.add(tag);
            }
        });

        res.json(uniqueTags);

}catch(err) {
    res.status(500).json({error: "An error occurred while getting blog data."});
}
} 

export const getLifeBlogTopics = async(req, res) => {
    try{
        
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being requested from unauthorized source"})}
    
    let response= await blogData.find({category:"Life", isPublished: true}).select('_id, tags');
    
    const uniqueTags = [];
    const seenTags = new Set();

    response.forEach(doc => {
        const tag = doc.tags[0];
        if (tag && !seenTags.has(tag)) {
            uniqueTags.push({ id: doc._id, topic: tag });
            seenTags.add(tag);
        }
    });

    res.json(uniqueTags);
}catch(err) {
    res.status(500).json({error: "An error occurred while getting blog data."});
}
}