import { blogData } from "../models/blogModel.js";

export const postBlog = async(req, res) => {
    const blog=req.body;
    await blogData.create(blog);
    res.json({msg: "blog posted successfully!"});
}

export const getTechBlogSnippet = async(req, res) => {
    const response= await blogData.find({category:"Tech"}).select('title overview datePublished');
    res.json(response);
} 
export const getLifeBlogSnippet = async(req, res) => {
    const response= await blogData.find({category:"Life"}).select('title overview datePublished');
    res.json(response);
}

export const getBlogById = async(req, res) => {
    const id=req.query.id;
    const response= await blogData.findById(id);
    res.json(response);
}

export const updateBlog = async (req, res) => {
    const blog=req.body;
    const id=blog.id;
    await blogData.updateOne({
        id:id
    },(
        blog
    ))
    res.json({msg:"Blog updated successfully"});
}

export const deleteBlog = async (req, res) => {
    const id=req.id;
    await blogData.deleteOne({
        id: id
    });
    res.json ({msg: "Blog deleted successfully"})
}