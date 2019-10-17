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

// Routes
app.get('/', (req, res) => {
    console.log("Request recieved from: " + (req.header['x-forwarded-for'] || req.connection.remoteAddress));
    res.send("Hi " + (req.header['x-forwarded-for'] || req.connection.remoteAddress));
});

app.get('/movies', (req, res) => {
    //Get movies
    res.send("Getting movies");
});

app.post('/add', (req, res) => {
    //Add movie
    res.send("Adding movies");
});

app.post('/mod', (req, res) => {
    //Modify movie
    res.send("Modifying movies");
});

app.post('del', (req, res) => {
    //Delete movie
    res.send("Deleting movies");
});

// Start server
app.listen(port, () => {
    console.log(`Listening to htp://localhost:${port}/`);
});