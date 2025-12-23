
import Joi from "joi";
import { Types } from "mongoose";

export const messageschema=Joi.object({
    
    content:Joi.string().min(1).max(500).required(),
    sender:Joi.string().required(),
    reciever:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true;
        }
        return helper.message("Invalied reciver Id")
})

})

export const singleMessageSchema=Joi.object({
    _id:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true;
        }
        return helper.message("Invalied massage ID")
})
})  


export const Flags={
    inbox:"inbox",
    outbox:"outbox"
}

export const AllmessagesSchema=Joi.object({
    flag:Joi.valid(...Object.values(Flags)).required(),

    reciever:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true;
        }
        return helper.message("Invalied reciver Id")

    }),
    sender:Joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true;
        }
        return helper.message("Invalied sender Id")
    })

})

// export {messageschema}