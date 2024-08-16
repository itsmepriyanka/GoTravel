import path from "node:path";
import fs from "node:fs";
import { Request, Response, NextFunction } from "express";
import cloudinary from "../config/cloudinary";
import createHttpError from "http-errors";
import placeModel from "./placeModel";
import { AuthRequest } from "../middlewares/authenticate";

const createPlace = async (req: Request, res: Response, next: NextFunction) => {
    const { title, agency, category, description } = req.body;

   

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

        // const _req = req as AuthRequest;

        const newPlace = await placeModel.create({
            title,
            agency,
            category,
            description,
            coverImage: uploadResult.secure_url,
        });

        await fs.promises.unlink(filePath);

        res.status(201).json({ id: newPlace._id });
    } catch (err) {
        console.error(err);
        return next(createHttpError(500, "Error while uploading the file."));
    }
};

const updatePlace = async (req: Request, res: Response, next: NextFunction) => {
    const { title, category, description } = req.body;
    const placeId = req.params.placeId;

    const place = await placeModel.findOne({ _id: placeId });

    if (!place) {
        return next(createHttpError(404, "Place not found"));
    }

    const _req = req as AuthRequest;
    if (place.agency.toString() !== _req.userId) {
        return next(createHttpError(403, "You cannot update others' places."));
    }

    const file = req.file as Express.Multer.File;
    let completeCoverImage = place.coverImage;

    if (file) {
        const filename = file.filename;
        const coverMimeType = file.mimetype.split("/").at(-1);
        const filePath = path.resolve(__dirname, "../../public/data/uploads", filename);

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
        { title, category, description, coverImage: completeCoverImage },
        { new: true }
    );

    res.json(updatedPlace);
};

const listPlaces = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const places = await placeModel.find().populate("agency", "name");
        res.json(places);
    } catch (err) {
        return next(createHttpError(500, "Error while fetching places"));
    }
};

const getSinglePlace = async (req: Request, res: Response, next: NextFunction) => {
    const placeId = req.params.placeId;

    try {
        const place = await placeModel.findOne({ _id: placeId }).populate("agency", "name");
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
    if (place.agency.toString() !== _req.userId) {
        return next(createHttpError(403, "You cannot delete others' places."));
    }

    const coverFileSplits = place.coverImage.split("/");
    const coverImagePublicId = coverFileSplits.at(-2) + "/" + coverFileSplits.at(-1)?.split(".").at(-2);

    await cloudinary.uploader.destroy(coverImagePublicId);

    await placeModel.deleteOne({ _id: placeId });

    return res.sendStatus(204);
};

export { createPlace, updatePlace, listPlaces, getSinglePlace, deletePlace };
