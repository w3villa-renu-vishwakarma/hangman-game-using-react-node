const express = require('express');
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 4000;

app.use(cors());

const words = ["lion" , 'tiger', 'goat', 'sheep', 'buffalo', 'cow', 'dog', 'cat', 'mouse', 'deer', 'rabbit',
               'bear', 'elephant', 'monkey', 'donkey', 'giraffe', 'fox', 'horse']

app.get('/api/word', (req,res) => {
    const randomIndex = Math.floor(Math.random()* words.length);
    const word = words[randomIndex];
    res.json({ word });
})               

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})