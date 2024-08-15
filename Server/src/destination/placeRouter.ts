import express from "express"
import createPlace from "./placeController";

const placeRouter = express.Router();

placeRouter.post('/',createPlace);

export default placeRouter;  