import { Request, Response } from 'express';
import photoModel from '../model/gallery';

export const uploadPhotos = async (req: Request, res: Response): Promise<void> => {
 try {
   if (!req.files) {
     res.status(400).send('No files were uploaded.');
     return;
   }
   
   const photos = (req.files as Express.Multer.File[]).map(file => ({
     name: file.originalname,
     img: {
       data: file.buffer,
       contentType: file.mimetype
     }
   }));
   
   await photoModel.insertMany(photos);
   res.status(200).send({ message: 'Photos uploaded successfully', photos });
 } catch (error: any) {
   res.status(500).send(error.message);
 }
};

// get all photos

export const getPhotos = async (req: Request, res: Response): Promise<void> => {
 try {
   const photos = await photoModel.find({});
   res.status(200).send({ message: 'Photos retrieved successfully', photos });
 } catch (error: any) {
   res.status(500).send(error.message);
 }
};

