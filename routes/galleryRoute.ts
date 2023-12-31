import { Express } from "express";
import { getPhotos, uploadPhotos } from "../controller/galleryUploads.Contoller";
import uploads from "../helper/helper";

const galleryRoute = (app: Express) => {
  app.get("/photos", getPhotos);
  app.post("/photos", uploads.array("photos", 10), uploadPhotos);
};

export default galleryRoute;