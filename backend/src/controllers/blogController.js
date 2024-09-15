import { blogData } from "../models/blogModel.js";
import { convertDateFormat } from "./dateformatController.js";

export const postBlog = async(req, res) => {
    try{
    const blog=req.body;
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
    let response= await blogData.find({category:"Tech"}).select('title overview datePublished');
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
    let response= await blogData.find({category:"Life"}).select('title overview datePublished');
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
    const id=req.query.id;
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
    const blog=req.body;
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
    const id=req.body._id;
    await blogData.deleteOne({
        _id: id
    });
    res.json ({msg: "Blog deleted successfully"})
    }catch(err) {
        res.status(500).json({error: "An error occurred while deleting data."})
    }
}