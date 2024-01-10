import mongoose from 'mongoose';

interface Image{
  filename: string;
  path: string;
}

const gallerySchema = new mongoose.Schema({
  title: String,
  images: [{ type: { filename: String, path: String }}],
});

const Gallery = mongoose.model('Gallery', gallerySchema);

export default Gallery;