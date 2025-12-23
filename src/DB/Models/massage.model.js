import mongoose, { Schema, Types } from "mongoose";
// import { RolesTypes } from "../../middleWares/auth.middleware.js";

const messageSchema=new Schema({
   content:{
    type:String,
    required:[true,"Massage content is required"],
    minLength:[1,"Massage must be at least 1 characters long"],
    maxLength:[500,"Massage must be at most 500 characters long"],
    trim:true
   },
    sender:{  
        type:Types.ObjectId,
        ref:'User',
        required:[true,"Sender Id is required"]
        
    },
    reciever:{
        type:Types.ObjectId,
        ref:'User',
        required:[true,"Receiver Id is required"]
    }

},{timestamps:true})


export const messageModel=mongoose.model('Message',messageSchema);