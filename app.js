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
    console.log(`Request recieved from: ${(req.header['x-forwarded-for'] || req.connection.remoteAddress)}`);
    res.send(`Hi ${(req.header['x-forwarded-for'] || req.connection.remoteAddress)}`);
});

app.get('/movies', (req, res) => {
    //Get movies
    let gen = req.query.gen;
    mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send(`Error: ${err}`);
        }

        console.log("We have succesfully connected");

        let ypdb = db.db('yudonpayMovies');
        try {
            ypdb.collection('movies').find({ genre: gen }).toArray((er, data) => {
                if (err) {
                    console.log(`Error: ${er}`);
                    res.send(`Error: ${er}`);
                }
                res.send(data);
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            res.send(`Error: ${error}`);
        }
        db.close();
    });
});

app.post('/add', (req, res) => {
    //Add movie
    let movie = req.body.movie;
    if (req.body.movie.hasOwnProperty('name') && req.body.movie.hasOwnProperty('director') &&
        req.body.movie.hasOwnProperty('yearRelease') && req.body.movie.hasOwnProperty('genre')) {
        movie = req.body.movie;
    } else {
        res.send("Error: Movie mising data");
    }
    mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send(`Error: ${err}`);
        }

        console.log("We have succesfully connected");

        let ypdb = db.db('yudonpayMovies');
        ypdb.collection('movies').insertOne(movie, (er, data) => {
            if (err) {
                console.log(`Error: ${er}`);
                res.send(`Error: ${er}`);
            }
            res.send(`Movie created: ${data}`);
        });
        db.close();
    });
});

app.post('/mod', (req, res) => {
    //Modify movie
    let old_movie = req.body.old;
    let new_movie = req.body.new;
    mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send(`Error: ${err}`);
        }

        console.log("We have succesfully connected");

        let ypdb = db.db('yudonpayMovies');
        let query = { name: old_movie.name, yearRelease: old_movie.yearRelease };
        let update = {
            $set: {
                name: new_movie.name,
                director: new_movie.director,
                yearRelease: new_movie.yearRelease,
                genre: new_movie.genre
            }
        };
        ypdb.collection('movies').updateOne(query, update, (er, data) => {
            if (err) {
                console.log(`Error: ${er}`);
                res.send(`Error: ${er}`);
            }
            res.send(`Movie Modified: ${data}`);
        });
        db.close();
    });
});

app.post('/del', (req, res) => {
    //Delete movie
    let name = req.body.name;
    let year = req.body.year;
    mongodb.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, db) => {
        if (err) {
            console.log(`Error: ${err}`);
            res.send(`Error: ${err}`);
        }

        console.log("We have succesfully connected");

        let ypdb = db.db('yudonpayMovies');
        let query = { name: name, yearRelease: year };
        ypdb.collection('movies').deleteOne(query, (er, data) => {
            if (err) {
                console.log(`Error: ${er}`);
                res.send(`Error: ${er}`);
            }
            res.send(`Movie Deleted: ${data}`);
        });
        db.close();
    });
});

// Start server
app.listen(port, () => {
    console.log(`Listening to htp://localhost:${port}/`);
});