import mongoose from "mongoose"
import { config } from "./config";




export const connectDB = async ()=>{
try{

    
    mongoose.connection.on('connected',()=>{
        console.log('connected successfully to database');
    });
    
    mongoose.connection.on('error',(err)=>{
        console.log("error in connection database",err)
    });
    await mongoose.connect(config.databaseURL as string);

}catch(err){
    console.error("Fail to connect to database.",err);
    process.exit(1);
}

}
