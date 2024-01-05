import multer from 'multer';

import { fileURLToPath } from 'url';

import * as path from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images"); // Specify the directory where uploaded files will be stored
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + "-" + file.originalname); // Generate a unique filename for the uploaded file
  },
});


 // define the file filter
 const fileFilter = (req: any, file: any, cb: any) => {
    if(file.mimetype === "image/jpg" || 
       file.mimetype ==="image/jpeg" || 
       file.mimetype === "image/png"){
        cb(null, true);
    }else{
        cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
 };

 const uploadMultiplePhotos = multer({storage: storage, fileFilter : fileFilter});

export default uploadMultiplePhotos;