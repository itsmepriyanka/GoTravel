import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt"
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";



const createUser = async(req:Request, res:Response,next:NextFunction)=>{
    const{name, email,password}=req.body;
    //validation
    if(!name || !email || !password){
        const error= createHttpError(400,"All fields are required")
        return next(error);
    }


    //database call
    try{
        const user = await userModel.findOne({email});

    if(user){
        const error = createHttpError(400,"User already exists with this email");
        return next(error);
    }
    }catch(err){
        return next(createHttpError(500,"Error while getting user"));
    };
    


//password hashing
const hashedPassword = await bcrypt.hash(password,10);
let newUser: User;
try{
     newUser = await userModel.create({
        name,
        email,
        password: hashedPassword,
    })
}catch(err){
    return next(createHttpError(500,"error while creating user"));
}


//token generation JWT
const token = sign({sub: newUser._id},config.jwtSecret as string,{expiresIn:"7d"});


    res.status(201).json({accessToken:token}); 
};

const loginUser = async(req:Request, res:Response,next:NextFunction)=>{
    const{email, password}= req.body;
    if(!email|| !password){
        return next(createHttpError(400,"All felds required"));
    }


    const user = await userModel.findOne({email});
    if(!user){
        return next(createHttpError(400,"User not found"))
    }
    


    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        return next(createHttpError(400,"Username or password incorrect"));
    }

    const token = sign({sub: user._id},config.jwtSecret as string,{expiresIn:"7d"});


    res.json({accesstoken : token});
}


export {createUser, loginUser};