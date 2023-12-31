import mongoose, { Document, Schema } from 'mongoose';

export interface IPhoto extends Document {
  filename: string;
  path: string;
}

const photoSchema = new Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true },
});

const Photo = mongoose.model<IPhoto>('Photo', photoSchema);

export default Photo;