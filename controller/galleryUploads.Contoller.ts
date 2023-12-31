import { Request, Response } from "express";
import Photo, {IPhoto} from "../model/gallery";


export const getPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await Photo.find();
    res.json("message: Photos retrieved successfully");
  } catch (error) {
    const castedError = error as Error;
    console.error(castedError.message);
    res.status(500).send("Server Error");
  }
};

// upload a photo in typescript
export const uploadPhotos = async (req: Request, res: Response): Promise<void> => {
    try {
        const files = req.files as Express.Multer.File[];
        if (!files) {
            res.status(400).json({ error: 'No files provided' });
            return;
        }

        const photos: IPhoto[] = [];

        files.forEach((file) => {
            const { path, mimetype } = file;
            const photo = new Photo({
            path,
            mimetype,
            });
            photos.push(photo);
        });

        await Photo.insertMany(photos);
        res.json({ message: "Photos uploaded successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
};


  