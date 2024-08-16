import mongoose from "mongoose";
import { Place } from "./placeTypes";


 const placeSchema = new mongoose.Schema<Place>({
    title:{
        type:String,
        required:true,
    },
    agency:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User", 
        // required:true,
    },
    coverImage:{
        type:String,
        required:true,
    },
     category:{
        type:String,
        required:true,
     },
     description:{
        type:String,
        required:true,
     },
        
 },{timestamps:true}
);

export default mongoose.model<Place>("Place",placeSchema);