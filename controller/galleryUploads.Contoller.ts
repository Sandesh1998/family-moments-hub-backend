import { Request, Response } from 'express';
import Gallery from '../model/gallery';
export const uploadPhotos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const familyKey = req.headers["family-key"];

    if (!familyKey) {
      res.status(401).json({ error: "Family key is required." });
      return;
    }

    // Check for files after the family key
    if (!req.files) {
      res.status(400).send("No files were uploaded.");
      return;
    }

    let baseurl = `${req.protocol}://${req.get("host")}`;
    const images = (req.files as Express.Multer.File[]).map(
      (file: Express.Multer.File) => ({
        filename: file.filename,
        path: `${baseurl}/public/images/${file.filename}`,
      })
    );

    // Create a new gallery with the uploaded images and associated family key
    const newGallery = new Gallery({
      images: images,
      familyKey: familyKey,
    });

    const savedGallery = await newGallery.save();

    res.status(201).json(savedGallery);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// get all photos
export const getPhotos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const familyKey = req.headers["family-key"];

    if (!familyKey) {
      res.status(401).json({ error: "Family key is required." });
      return;
    }

    const gallery = await Gallery.find({ familyKey: familyKey });

    if (!gallery) {
      res.status(404).json({ error: "Gallery not found." });
      return;
    }

    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

