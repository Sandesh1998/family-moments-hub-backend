import mongoose from "mongoose";

interface Image {
  filename: string;
  path: string;
}

const gallerySchema = new mongoose.Schema({
  images: [{ type: { filename: String, path: String } }],
  familyKey: { type: String, required: true },
});

const Gallery = mongoose.model("Gallery", gallerySchema);

export default Gallery;
