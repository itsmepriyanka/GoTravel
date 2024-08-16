// import mongoose from "mongoose";
import { User } from "../users/userTypes";

export interface Place{
    id:string;
    title:string;
    agency:  User;
    category: string;
    description:string;
    coverImage: string;
    createdAt: Date;
    updatedAt: Date;

}