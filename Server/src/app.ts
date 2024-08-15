import express from "express"
import globalerrorHandler from './middlewares/globalErrorHandler';
import userRouter from "./users/userRouter";
import placeRouter from "./destination/placeRouter";

const app = express();

app.use(express.json());
app.get("/",(req,res,next)=>{

    res.json({message:"Welcome to travel api"});
});

app.use("/api/users",userRouter); 
app.use("/api/places",placeRouter);



app.use(globalerrorHandler);


export default app ;