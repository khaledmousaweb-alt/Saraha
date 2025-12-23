import Joi from "joi";
import joi from "joi";
import { Types } from "mongoose";

export const userupdateschema=joi.object({
    
    userName:joi.string().required(),
    email:joi.string().email().required(),
    _id:joi.custom((value,helper)=>{
        if(Types.ObjectId.isValid(value)){
            return true;
        }
        return helper.message("Invalied user ID")
})

})


export const changePasswordschema=joi.object({
    email:joi.string().email().required(),
    oldPassword:joi.string().required(),
    newPassword:joi.string().not(Joi.ref("oldPassword")).required(),
    ConfirmPassword:joi.string().valid(Joi.ref("newPassword")).required()
})