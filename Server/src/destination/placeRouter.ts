import path from "node:path";
import express from "express";
import multer from "multer";
import authenticate from "../middlewares/authenticate";
import {
  createPlace,
  updatePlace,
  listPlaces,
  getSinglePlace,
  deletePlace,
} from "./placeController";

const placeRouter = express.Router();

// File storage configuration using multer
const upload = multer({
  dest: path.resolve(__dirname, "../../public/data/uploads"),
  limits: { fileSize: 3e7 }, // 30MB limit
});

// Routes for /api/places

// Create a new place
placeRouter.post(
  "/",
//   authenticate,
  upload.single("coverImage"),
  createPlace
);

// Update an existing place
placeRouter.patch(
  "/:placeId",
  authenticate,
  upload.single("coverImage"),
  updatePlace
);

// Get a list of places
placeRouter.get("/", listPlaces);

// Get a single place by ID
placeRouter.get("/:placeId", getSinglePlace);

// Delete a place by ID
placeRouter.delete("/:placeId", authenticate, deletePlace);

export default placeRouter;
