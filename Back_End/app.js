import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to BlockEstate');
});

app.listen(3000, () => {
   console.log('BlockEstate listening on port 3000!');
});