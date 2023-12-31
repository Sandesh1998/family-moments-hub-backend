import { Request, Response } from "express";
import Photo, {IPhoto} from "../model/gallery";


export const getPhotos = async (req: Request, res: Response) => {
  try {
    const photos = await Photo.find();
    res.json(photos);
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


  