import express from 'express';
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import { PORT } from './config/env.js';
import authRouter from './routes/auth.rotes.js'
import cookieParser from "cookie-parser";



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/auth/', authRouter);


app.use(errorMiddleware);

app.get('/', (req, res) => {
    res.send('Welcome to BlockEstate api');
});

app.listen(PORT, async () => {
   console.log(`BlockEstate listening on port ${PORT}!`);
   await connectToDatabase();
});