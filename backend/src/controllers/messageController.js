import { messagesData} from "../models/messagesModel.js";
import { convertDateFormat_II } from "./dateformatController.js";
import {z} from "zod";
import { dataSourceKey } from "../config/dotenv.js";
import DOMPurify from "dompurify";
import { JSDOM } from 'jsdom';

const zodSchema = z.object({
    email: z.string().email().min(1, "Email is required").max(60, "Email cannot exceed 60 characters"),
    message: z.string().min(1, "Message is required").max(250, "Message cannot exceed 250 characters")
})

    export const postMessage = async (req, res) => {
    try{
    const authKey = req.headers.datasourcekey;
    if (authKey != dataSourceKey) {return res.json({msg: "Data being sent from unauthorized source"})}
    const dataReceived = req.body;
    
    //Sanitizing the message data before storing to prevent xss attacks 
    const window = new JSDOM('').window;
    const purify = DOMPurify(window);
    const message = {
        ...dataReceived,
        message: purify.sanitize(dataReceived.message, {
            ALLOWED_TAGS: [],
            ALLOWED_ATTR: []
          })
    }
    
    let response = zodSchema.safeParse(message);
    if (response.success) {
        await messagesData.create(message);
        res.json({msg: "successful"})
    }else {
        res.status(400).json({msg: "Invalid input"})
    }
    }catch(err) {
       console.log(err);
       
       res.status(500).json({msg: "An error occurred while posting message."});
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
        const messageArray = await messagesData.find().select('message read').sort({date: -1});
       let response = [];
        //pick each object of the array and then slice them individually and push them into a new array
        messageArray.forEach((message) => {
            message.toObject();
            let id = message._id;
            let data = message.message;
            let read = message.read;
            data = data.slice(0,10)
            const a = {preview: `${data}....`, id, read};
            response.push(a);
        })
        res.json(response); 
        }catch(err) {
            res.status(500).json({error: "An error occurred while getting message preview."})
        }
    }

    export const deleteMsg = async(req, res) => {
        try{
            const id = req.query.id;
            if (!id) {
                return res.status(400).json({error: "Id not found."})
            }
            const deleteMsg = await messagesData.findByIdAndDelete(id);
            
            res.json({msg: "Deleted successfully"})
        }catch{
            res.json({msg: "An error occured while deleting message."})
        }
    };

    export const updateReadValue = async(req, res) => {
        try{
            const id = req.body.id;
            if (!id) {
                return res.status(400).json({error: "Id not found."})
            }
            const updateRead = await messagesData.findByIdAndUpdate(id, { $set: { read: true } }, { new: true });

            res.json({msg: "Marked as read"})
        }catch(error){
            res.json({msg: "An error occured while updating the read status."});
            console.log(error)
        }
    }