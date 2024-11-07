import { blogData } from "../models/blogModel.js";

export const searchTechBlog = async (req, res) => {
    const searchTerm = req.query.q;
    try{
        const response = await blogData.find({
            category: "Tech",
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { overview: { $regex: searchTerm, $options: 'i' } },
                { mainContent: { $regex: searchTerm, $options: 'i' } }
              ]
        }).select(`title`);
        res.json(response);
    }catch(err) {
        res.status(500).json({ error: 'An error occurred while searching' });
    }
}

export const searchLifeBlog = async (req, res) => {
    const searchTerm = req.query.q;
    try{
        const response = await blogData.find({
            category: "Life",
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { overview: { $regex: searchTerm, $options: 'i' } },
                { mainContent: { $regex: searchTerm, $options: 'i' } }
              ]
        }).select(`title`);
        res.json(response);
    }catch(err) {
        res.status(500).json({ error: 'An error occurred while searching' });
    }
}

export const searchAnyBlog = async (req, res) => {
    const searchTerm = req.query.q;
    try{
        const response = await blogData.find({
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },
                { overview: { $regex: searchTerm, $options: 'i' } },
                { mainContent: { $regex: searchTerm, $options: 'i' } }
              ]
        }).select(`title`);
        res.json(response);
    }catch(err) {
        res.status(500).json({ error: 'An error occurred while searching' });
    }
}