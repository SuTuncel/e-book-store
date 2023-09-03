import express from 'express';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

//middleware for parsing req body
app.use(express.json());

//middleware for handling cors policy
app.use(cors());
/*app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));*/



app.get('/', (req, res)=> { 
    console.log(req);

    return res.status(200).send('Welcome to book store');
});

app.use('/books', booksRoute);

mongoose
.connect(process.env.MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology:true })
.then(()=> {
    console.log('App connected to database.');
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
     });
}).catch((error)=> {
        console.log(error);
});