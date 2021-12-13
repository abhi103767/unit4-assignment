const express = require('express');
const router = express.Router();
const User = require('../model/user.model');


router.post('/', async (req,res) => {
    try {
    const user = await User.create(req.body);
     res.send(user);
    }
    catch(e){
        res.send(e.message);
    }

})

//get all for the actor
router.get('/' , async (req,res) => {
    console.log(2);
    try {
      const movies = await Movie.find({}).lean().exec();
      console.log(movies);
      res.send(movies);
    }
    catch(e){
        res.send(e.message);
    }
})

module.exports = router;