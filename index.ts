import connectDB from './config/dbConfig';
import express from 'express';
import morgan from 'morgan'; 
import path from 'path';
import galleryRoute from './routes/galleryRoute';


const cors = require('cors');
const app = express();
const port = process.env.APP_PORT || 8080;

app.use(express.json());
app.use(morgan('dev'));
app.use(cors());

const corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
}

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
// connect to database
connectDB();

// routes
app.use('/public',express.static(path.join(import.meta.path+"/../public")))
app.use('/familyMoment/api/', galleryRoute );

app.get("/family-hub-backend", (_, res) => {
 res.send("🏓 Family Hub Backend!");
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});