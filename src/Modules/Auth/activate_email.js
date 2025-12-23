import jwt from "jsonwebtoken"
import { userModel } from "../../DB/Models/user.model.js";

 export const activate_email = async (req,res,next)=>{
    try{
    const {token}=req.params;
    const {email}=jwt.verify(token,process.env.EMAIL_KEY)
    const user=await userModel.findOne({email})
    if(user){
        user.confirmEmail=true;
        await user.save();
        res.json({msg:"user ativeated"})
    }
    else {res.json({msg:"usre not founded"})}
}
catch(error
){
    res.json({msg:'errror',error})
}
}