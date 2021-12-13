const express = require('express');
const router = express.Router();
const Seat = require('../model/seat.model');


router.post('/', async (req,res) => {
    try {
    const seat = await Seat.create(req.body);
     res.send(seat);
    }
    catch(e){
        res.send(e.message);
    }

})
// id is of show;
router.get('/:id' , async (req,res) => {
    try {
      const seats = await Seat.find({show : req.params.id});
      res.send(seats);
    }
    catch(e){
        res.send(e.message);
    }
})


module.exports = router;