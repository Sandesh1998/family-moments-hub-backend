import express from 'express'; 
import { uploadPhotos, getPhotos } from "../controller/galleryUploads.Contoller";
import uploadMultiplePhotos from "../helper/helper";

const galleryRoute = express.Router();

galleryRoute.post('/upload', uploadMultiplePhotos.array('photos', 10), uploadPhotos);
galleryRoute.get('/photos', getPhotos);

export default galleryRoute;