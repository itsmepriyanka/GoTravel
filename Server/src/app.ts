import express from "express"
import globalerrorHandler from './middlewares/globalErrorHandler';
import userRouter from "./users/userRouter";
import placeRouter from "./destination/placeRouter";
import { listPlaces } from "./destination/placeController";
import placeModel from "./destination/placeModel";
import morgan from "morgan";

const app = express();



app.use(express.json());
app.use(morgan("combined"));
// app.use(express)
app.get("/",(req,res,next)=>{

    res.json({message:"Welcome to travel api"});
});

app.use("/api/users",userRouter); 
app.use("/api/places",placeRouter);
// Example route in Express
app.get('/api/places', async (req, res) => {
    try {
      const places = await placeModel.find(); // Replace 'Place' with your model
      res.json(places);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch places' });
    }
  });
  



app.use(globalerrorHandler);


export default app ;