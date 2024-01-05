import mongoose, { Schema, Document } from 'mongoose';

interface IPhoto extends Document {
 img: {
   data: Buffer;
   contentType: string;
 };
}

const photoSchema: Schema = new Schema({
 img: {
   data: Buffer,
   contentType: String
 }
});

export default mongoose.model<IPhoto>('Photo', photoSchema);