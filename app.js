const port = 9090;
const url = "mongodb://localhost:27017";
// Add Dependencies
const express = require('express');
const bodyParse = require('body-parser');
const mongodb = require('mongodb');

//Init
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());

app.get('/', (req, res) => {
    console.log("Request recieved from: " + (req.header['x-forwarded-for'] || req.connection.remoteAddress));
    res.send("Hi " + (req.header['x-forwarded-for'] || req.connection.remoteAddress));
});

app.listen(port, () => {
    console.log(`Listening to htp://localhost:${port}/`);
});