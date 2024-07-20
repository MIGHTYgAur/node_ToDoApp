import { User } from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { setCookie } from "../utilities/features.js";
import errorHandler from "../middleware/error.js";


export const Register = async (req,res,next)=>{
    try {
    const {name,email,password} = req.body;

    let user = await User.findOne({email});

    if(user) return next(new errorHandler("user already exists",404));

    const hashpassword = await bcrypt.hash(password,10);
    user = User.create({
        name,
        email,
        password: hashpassword,
    });
    setCookie(user,res,"Registeration successful",201);
   } 
   
   catch (error) {
    next(error);
   } 
};
export const login = async(req,res,next)=>{
    try {
    const {email ,password} = req.body;

    let user = await User.findOne({email}).select("+password");

    if(!user) return next(new errorHandler("invalid password or email",404));     
    
    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch) return next(new errorHandler("invalid password",404))

    setCookie(user,res,`Welcome back ${user.name}`,200);
    } 
    catch (error) {
       next(error); 
    }
}
export const logout = (req,res)=>{
    res
    .status(200)
    .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax":"none",
        secure: process.env.NODE_ENV === "Development" ? false:true,

    })
    .json({
        success:"true",
        message:"logged out"
    });

}
export const getMyDetails = (req,res)=>{        
    res.status(200).json({
        success:"true",
        user: req.user,
    });

}

export const updateUser = (req,res)=> {

}
export const deleteUser = (req,res)=>{
   
}

