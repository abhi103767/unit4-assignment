const express = require('express');
const router = express.Router();
const Show = require('../model/show.model');


router.post('/', async (req,res) => {
    try {
    const show = await Show.create(req.body);
     res.send(show);
    }
    catch(e){
        res.send(e.message);
    }

})
// here id is movie id.
router.get('/:id' , async (req,res) => {
    try {
      const shows = await Show.find({movie : req.params.id});
      res.send(shows);
    }
    catch(e){
        res.send(e.message);
    }
})

module.exports = router;