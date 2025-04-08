import express from 'express';
import { PORT } from './config/env.js';
import connectToDatabase from "./database/mongodb.js";

import authRouter from './routes/auth.rotes.js'


const app = express();

app.use('/api/auth/', authRouter);

app.get('/', (req, res) => {
    res.send('Welcome to BlockEstate api');
});

app.listen(PORT, async () => {
   console.log(`BlockEstate listening on port ${PORT}!`);
   await connectToDatabase();
});