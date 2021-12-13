const express = require("express");
const mongoose = require("mongoose");
const connect  = require('./configis/db');
const userController = require('./controller/user.controller');
const movieController = require('./controller/movie.controller');
const theaterController = require("./controller/threater.controller");
const screenController = require("./controller/screen.controller");
const showController = require("./controller/show.controller");
const seatController = require("./controller/seat.controller");

const app = express();
app.use(express.json());

app.use('/users',userController);
app.use('/movies',movieController);
app.use('/theaters', theaterController);
app.use('/screens',screenController);
app.use('/shows',showController);
app.use('/seats', seatController);



app.listen('124', async () => {
    await connect();
    console.log("we are listening 1234");
});



