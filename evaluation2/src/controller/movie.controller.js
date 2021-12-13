const express = require('express');
const router = express.Router();
const Movie = require('../model/movie.model');


router.post('/', async (req,res) => {
    try {
    const movie = await Movie.create(req.body);
     res.send(movie);
    }
    catch(e){
        res.send(e.message);
    }

})

//get all for the actor
router.get('/:actor' , async (req,res) => {
    try {
      const movies = await Movie.find({actor : req.params.actor }).lean().exec();
      res.send(movies);
    }
    catch(e){
        res.send(e.message);
    }
})






module.exports = router;