import express from "express"
import globalerrorHandler from './middlewares/globalErrorHandler';
import createHttpError from "http-errors";
import userRouter from "./users/userRouter";

const app = express();


app.get("/",(req,res,next)=>{

    res.json({message:"Welcome to travel api"});
});

app.use("/api/users",userRouter); 
app.use(globalerrorHandler);


export default app ;