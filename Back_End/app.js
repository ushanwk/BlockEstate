import express from 'express';

import { PORT } from './config/env.js';


const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to BlockEstate');
});

app.listen(PORT, () => {
   console.log(`BlockEstate listening on port ${PORT}!`);
});