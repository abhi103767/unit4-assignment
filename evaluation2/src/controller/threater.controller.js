const express = require('express');
const router = express.Router();
const Theater = require('../model/theatre.model');


router.post('/', async (req,res) => {
    try {
        console.log(1);
    const theater = await Theater.create(req.body);
     res.send(theater);

    }
    catch(e){
        res.send(e.message);
    }

})


module.exports =  router;