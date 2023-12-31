const routes = require('express').Router();

const galleryRoute = require('./controller/galleryUploads.Contoller');

routes.get("/photos", galleryRoute.getPhotos);
routes.post("/photos", galleryRoute.uploadPhotos);


module.exports = routes;