import { Request, Response } from 'express';
import Gallery from '../model/gallery';

export const uploadPhotos = async (req: Request, res: Response): Promise<void> => {
 try {
   if (!req.files) {
     res.status(400).send('No files were uploaded.');
     return;
   }

   let baseurl = `${req.protocol}://${req.get('host')}`;
   console.log("first", baseurl)
   const images = (req.files as Express.Multer.File[]).map((file: Express.Multer.File) => ({
    filename: file.filename,
    path: `${baseurl}/public/images/${file.filename}`,
  }));
  console.log("first", req.files)

  // Create a new gallery with the uploaded images
  const newGallery = new Gallery({
    images: images,
  });

  const savedGallery = await newGallery.save();

  res.status(201).json(savedGallery);
} catch (error) {
  res.status(500).json({ error: 'Internal Server Error' });
}
};

// get all photos
export const getPhotos = async (req: Request, res: Response): Promise<void> => {
  try {
    const gallery = await Gallery.find();
    res.status(200).json({msg: 'All photos', gallery});
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

