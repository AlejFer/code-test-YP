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
    let gen = req.query.gen;
    res.send("Getting movies: " + gen);
});

app.post('/add', (req, res) => {
    //Add movie
    let movie = req.body.movie;
    res.send("Adding movie: " + JSON.stringify(movie));
});

app.post('/mod', (req, res) => {
    //Modify movie
    let movie = req.body.movie;
    res.send("Modifying movie: " + JSON.stringify(movie));
});

app.post('/del', (req, res) => {
    //Delete movie
    let id = req.body.id;
    let movie = req.body.movie;
    res.send("Deleting movie: " + movie);
});

// Start server
app.listen(port, () => {
    console.log(`Listening to htp://localhost:${port}/`);
});