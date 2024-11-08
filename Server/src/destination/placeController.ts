import { AuthRequest } from './../middlewares/authenticate';
import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import placeModel from "./placeModel";
import { cosineSimilarity, tfIdf } from '../helper/CosineSimilarities';




const createPlace = async (req: Request, res: Response, next: NextFunction) => {
    const { title, category, description, location } = req.body;   

    const file = req.file as Express.Multer.File;
    const coverImageMimeType = file.mimetype.split("/").at(-1);
    const fileName = file.filename;
    const filePath = path.resolve(__dirname, "../../public/data/uploads", fileName);

    try {
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: fileName,
            folder: "place-covers",
            format: coverImageMimeType,
        });

        const _req = req as AuthRequest;

        console.log("UserId",_req.userId);
        // console.log(uploadResult);
        const newPlace = await placeModel.create({
            title,
            category,
            description,
            location,
            agency: _req.userId,
            coverImage: uploadResult.secure_url,
        });

        await fs.promises.unlink(filePath);

        res.status(201).json({ success: true, data: newPlace , message : "Place added successfully." });
    } catch (err) {
        console.error(err);
        return next(createHttpError(500, "Error while uploading the file."));
    }
};

const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
    const { title, category, description, location } = req.body;
    const placeId = req.params.placeId; 

    const place = await placeModel.findOne({ _id: placeId });
    console.log(place)

    if (!place) {
        return next(createHttpError(404, "Place not found"));
    }

    const _req = req as AuthRequest;
    // console.log(_req);
    if (place.agency.toString() !== _req.userId) {
        return next(createHttpError(403, "You cannot update others' places."));
    }

    const file = req.file as Express.Multer.File;
    let completeCoverImage = "";  

    if (file) {
        const filename = file.filename;
        const coverMimeType = file.mimetype.split("/").at(-1);
        const filePath = path.resolve(__dirname, "../../public/data/uploads", filename
             
        );
        
        completeCoverImage=filename;
        const uploadResult = await cloudinary.uploader.upload(filePath, {
            filename_override: filename,
            folder: "place-covers",
            format: coverMimeType,
        });

        completeCoverImage = uploadResult.secure_url;
        await fs.promises.unlink(filePath);
    }

    const updatedPlace = await placeModel.findOneAndUpdate(
        { _id: placeId },
        { title, category, location, description, coverImage: completeCoverImage ? completeCoverImage : place.coverImage },
        { new: true }
    );

    res.json(updatedPlace);
};

const listPlaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const places = await placeModel.find();
        res.json(places);
    } catch (err) {
        return next(createHttpError(500, "Error while fetching places"));
    }
};

const getSinglePlace = async (req: Request, res: Response, next: NextFunction) => {
    const placeId = req.params.placeId;

    try {
        const place = await placeModel.findOne({ _id: placeId });
        if (!place) {
            return next(createHttpError(404, "Place not found"));
        }
        res.json(place);
    } catch (err) {
        return next(createHttpError(500, "Error while fetching the place"));
    }
};

const deletePlace = async (req: Request, res: Response, next: NextFunction) => {
    const placeId = req.params.placeId;
    
    const place = await placeModel.findOne({ _id: placeId });

    if (!place) {
        return next(createHttpError(404, "Place not found"));
    }

    const _req = req as AuthRequest;
    console.log(place.agency);
    if (place.agency.toString() !== _req.userId) {
        return next(createHttpError(403, "You cannot update others' places."));
    }
    const coverFileSplits = place.coverImage.split("/");
    const coverImagePublicId = coverFileSplits.at(-2) + "/" + coverFileSplits.at(-1)?.split(".").at(-2);

    await cloudinary.uploader.destroy(coverImagePublicId);

    await placeModel.deleteOne({ _id: placeId });

    return res.sendStatus(204);
};

export const getSimilaritiesPlaces = async(req:Request,res:Response,next:NextFunction)=>{

    try {        
    const {description} = req.body;
    console.log("description",description)
    if (!description) {
        return res.status(400).json({ error: 'Description is required' });
      }
      const places = await placeModel.find();
      const allDescriptions = places.map(place => place.description);
      const tfidfVectors = tfIdf([...allDescriptions, description]); // Include the input description


    // Calculate cosine similarities
    const similarities = places.map((place, index) => {
      const similarity = cosineSimilarity(
        Object.values(tfidfVectors[index]),
        Object.values(tfidfVectors[places.length]) // The input description vector is the last one
      );
      console.log("similar values",similarity)
      return { place, similarity };
    });

// Sort places by similarity in descending order
    similarities.sort((a, b) => b.similarity - a.similarity);

    // Return the top 5 similar places
    res.status(200)
    return res.json({success:true,message:"fetched successfully.",data:similarities.slice(0, 5).map(({ place,similarity }) => ({place:place,similarityScore:Number(similarity).toFixed(2)}))});
    } catch (err: unknown) {
        console.log("err",err);
        return next(createHttpError(500, "Error while fetching the similarities places."));
        
    }
}

export { createPlace, updatePlace, listPlaces, getSinglePlace, deletePlace };
