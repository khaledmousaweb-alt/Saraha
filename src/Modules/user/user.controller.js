import jwt from "jsonwebtoken";
import { userModel } from "../../DB/Models/user.model.js";
import CryptoJS from "crypto-js";
import bycrypt from "bcrypt"; 

const getUser = async (req, res, next) => {
  // res.json({message:"user works Well"})

  const { user } = req;
  user.Phone = CryptoJS.AES.decrypt(
    user.Phone,
    process.env.ENCTYPT_KEY
  ).toString(CryptoJS.enc.Utf8);
  return res.json({
    message: "Success",
    result: {
      id: user._id,
      userName: user.userName,
      email: user.email,
      Phone: user.Phone,
      role: user.role,
    },
  });
};

export const updateuser = async (req, res, next) => {
  try {
    const { _id } = req.query;
    const { userName, email } = req.body;
    const user = await userModel.findByIdAndUpdate(
      _id,
      { ...req.body },
      { new: true }
    );
    if (user) {
      return res.json({ message: "user updated successfully", data: user });
    }
    return next(new Error("Invalied user ID"));
  } catch (error) {
    return next(error);
  }
};

export const changePassword = async (req, res, next) => {
  try {
    const { email,oldPassword,newPassword } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new Error("Invalied email"));
    } 
    const old=user.password
    const checkpassword=bycrypt.compareSync(oldPassword,user.password)
    if(!checkpassword){
      return next (new Error("Invalied old password"))
    } 

    const hashnewpassword=bycrypt.hashSync(newPassword,parseInt(process.env.SALTROUND))
    user.password=hashnewpassword
    await user.save()
    return res.json({message:"password changed successfully", old:old,user })

  }
 catch (error) {    return next(error);
  }
};

export { getUser };
