import multer from 'multer';
import { Request, Response, NextFunction } from 'express';

const upload = multer({ dest: 'uploads/' });

const uploadMultiplePhotos = (req: Request, res: Response, next: NextFunction): void => {
 upload.array('photos')(req, res, function (err: any) {
  if (err) {
    return res.status(500).send(err);
  }
  next();
 });
};

export default uploadMultiplePhotos;