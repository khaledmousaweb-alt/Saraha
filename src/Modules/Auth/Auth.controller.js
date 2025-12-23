import { userModel } from "../../DB/Models/user.model.js";
import bcrypt from "bcrypt";
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken';
import { RolesTypes } from "../../middleWares/auth.middleware.js";
import { sendEmail, subject } from "../../utils/sendEmail.js";
import { email_templet } from "../../utils/sendEmail_templet.js";
const register=async(req,res,next)=>{
    // res.json({message:"Auth Works Well"})

   try {
     const{userName,email,password,confirmPassword,Phone,role}=req.body;
    if(password!=confirmPassword){
        return next(new Error("Password and Confirm Password not match"))
    }

    // check Email

    const usrCheck=await userModel.findOne({email});
    if(usrCheck){
        return next(new Error("user already Exist"))
    }

    //hashing password
    const hashPassword=bcrypt.hashSync(password,10)

    //Encrypt phone Number
    const EncryptPhone=CryptoJS.AES.encrypt(Phone,process.env.ENCTYPT_KEY).toString()
    const user=await userModel.create({
        userName,
        email,
        password:hashPassword,
        Phone:EncryptPhone,
        role
    })

    const emailtoken =jwt.sign({email},process.env.EMAIL_KEY)
    const verify_link=`sarahakhaled.eu-4.evennode.com/auth/activate_email/${emailtoken}`
    await sendEmail(
   {
    to:email,
    subject:subject.register,
    html: email_templet(verify_link)
   }     
    )

    res.json({message:"user Added Successfully",user});
   } catch (error) {
     return next(error)
   }
}




const Login=async(req,res,next)=>{
    // res.json({message:"Auth Works Well"})

   try {
     const{email,password}=req.body;
   

    // check Email

    const user=await userModel.findOne({email});
    if(!user){
        return next(new Error("Invalied email User Not Exist") )
    }
    const matchPassword=bcrypt.compareSync(password,user.password);
    if(!matchPassword){
        next(new Error("Invalied password"))
    }
   

    //generate Token
    
    // const token= jwt.sign({id:user._id},process.env.TOKEN_KEY,{expiresIn:60*60});
    
    //Bearer
    const token= jwt.sign({id:user._id},
        user.role===RolesTypes.User?process.env.TOKEN_KEY_USER:process.env.TOKEN_KEY_ADMIN,
        {expiresIn:60*60});
    
   return res.json({message:"user LogedIn Successfully",token});
   } catch (error) {
      return next(error)
   }
}

export{
    register,
    Login
}