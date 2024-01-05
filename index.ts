import connectDB from './config/dbConfig';
import express from 'express';
import morgan from 'morgan'; 
import galleryRoute from './routes/galleryRoute';

const app = express();
const port = process.env.APP_PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));

// connect to database
connectDB();

// routes
app.use('/familyMoment/api/', galleryRoute );

app.get("/ping", (_, res) => {
 res.send("🏓 pong!");
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});