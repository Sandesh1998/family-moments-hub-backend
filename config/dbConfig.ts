import mongoose from 'mongoose';

export default function connectDB() {

 const mongoURI = process.env.MONGODB_URI ??  'mongodb://localhost:27017/familyMomentHub';

 try {
  mongoose.connect(mongoURI);
 } catch (error) {
  const castedError = error as Error;
  console.error(castedError.message);
  process.exit(1);
 }

 mongoose.connection.once("open", (_) => {
  console.log(`Database connected Successfully  🚀🚀🚀`);
 });

 mongoose.connection.on("error", (err) => {
   console.error(`Database connection error: ${err}`);
 });

}