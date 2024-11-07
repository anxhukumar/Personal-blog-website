import { messagesData} from "../models/messagesModel.js";
import { convertDateFormat_II } from "./dateformatController.js";
import {z} from "zod";

const zodSchema = z.object({
    email: z.string().email().min(1, "Email is required"),
    message: z.string().min(1, "Message is required")
})

    export const postMessage = async (req, res) => {
    try{
    const message = req.body;
    let response = zodSchema.safeParse(message);
    if (response.success) {
        await messagesData.create(message);
        res.json({msg: "Message posted successfully"})
    }else {
        res.status(400).json({error: "Invalid input."})
    }
    }catch(err) {
        res.status(500).json({error: "An error occurred while posting message."});
    }
}

    export const getMessageById = async (req, res) => {
    try{
    const id = req.query.id;
    if (!id) {
        return res.status(400).json({error: "Message not found."})
    }
    let response = await messagesData.findById(id);
    response = response.toObject();
    const formattedDate = convertDateFormat_II(response.date);//
    response.formattedDate=formattedDate;                                        
    res.json(response);
    }catch(err) {
        res.status(500).json({error: "An error occurred while getting message."})
    }
    } 

    export const countIfRead = async (req, res) => {
        try{
        let unreadMessages = await messagesData.find({read: false});
        let totalMessages = await messagesData.find();
        const total = totalMessages.length;
        const unread = unreadMessages.length;
        res.json({
            totalCount: total,
            unreadCount: unread
        });
        }catch(err) {
            res.status(500).json({error: "An error occurred while getting message count."})
        }
    }

    export const messagePreview = async (req, res) => {
        try{
        const messageArray = await messagesData.find().select('message').sort({date: -1});
        let response = [];
        //pick each object of the array and then slice them individually and push them into a new array
        messageArray.forEach((message) => {
            message.toObject();
            let data = message.message;
            data = data.slice(0,10)
            const a = {preview: `${data}....`};
            response.push(a);
        })
        res.json(response);
        }catch(err) {
            res.status(500).json({error: "An error occurred while getting message preview."})
        }
    }