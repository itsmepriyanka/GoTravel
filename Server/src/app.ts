import express from "express"
import globalerrorHandler from './middlewares/globalErrorHandler';
import userRouter from "./users/userRouter";

const app = express();

app.use(express.json());
app.get("/",(req,res,next)=>{

    res.json({message:"Welcome to travel api"});
});

app.use("/api/users",userRouter); 
app.use(globalerrorHandler);


export default app ;