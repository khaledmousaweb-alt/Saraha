import mongoose, { Schema } from "mongoose";
import { RolesTypes } from "../../middleWares/auth.middleware.js";

const userSchema=new Schema({
    userName:{
        type:String,
        required:[true,"userName is required"],
        minLength:[3,"userName must be at least 3 characters long"],
        maxLength:[20,"userName must be at most 20 characters long"],
        trim:true
    },
    email:{
        type:String,
        required:[true,"email is required"],
        unique:[true,"email must be unique"],
        lowercase:true,
        trim:true,
        match:/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/
    },
    password:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enum:{
            values:['female','male','not specified'],
            message:"Gender Must be either male or female",
            default:"not specified"
        }
    },
      confirmEmail:{
            type:Boolean,
            default:false
        },

        role:{
            type:String,
            enum:Object.values(RolesTypes),
            default:RolesTypes.User,
            // enum:{
            //     values:["user","admin"],
            //     message:"Role must be either user or admin",
            //     default:"user"
            // }
        },
        DOB:String,
        address:String,
        Phone:String,
        Image:String,
},{timestamps:true})


export const userModel=mongoose.model('User',userSchema);