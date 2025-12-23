import { userModel } from "../DB/Models/user.model.js";
import jwt from "jsonwebtoken";

//Bearer 

export  const RolesTypes={
User:"User",
Admin:"Admin"
}

export const authuntication=async(req,res,next)=>{
    // console.log("middle ware of Auth");

try {
         const {authorization}=req.headers

         //handle if authorization dosenot sent
         if(!authorization){
            return res.json({message:"authorization Token is required"})
         }
         //Bearer
         const[Bearer,token]=authorization.split(" ");
         let Token_signature=undefined;

         switch(Bearer){
            case "Bearer":
                Token_signature=process.env.TOKEN_KEY_USER;
                break;
            
            case "Admin":
                Token_signature=process.env.TOKEN_KEY_ADMIN;
                    break;
                default:
                    break;
         }
         const decoded=jwt.verify(token,Token_signature)
         const user=await userModel.findById(decoded.id);
         if(!user){
            return res.json({message:"user not found"})
         }
         req.user=user
    return next();
} catch (error) {
   return next(error)
}
}

export const authorization_allowers=(roles=[])=>{
  return async(req,res,next)=>{
    try {
        if(!roles.includes(req.user.role)){
          return  res.json({message:"Forbidden Account"});
        }
        return next();
    } catch (error) {
       return next(error)
    }
  }
}
