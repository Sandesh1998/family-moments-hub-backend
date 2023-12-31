import * as multer from 'multer';
import { fileURLToPath } from 'url';

import * as path from 'path';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../public/uploads'));
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
  }
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

 const uploads = multer({storage: storage, fileFilter : fileFilter});

export default uploads;