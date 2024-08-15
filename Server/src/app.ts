import express from "express"
import globalerrorHandler from './middlewares/globalErrorHandler';

const app = express();


app.get('/',(req,res)=>{
    res.json({message:"Welcome to travel api"});
});


app.use(globalerrorHandler);


export default app ;