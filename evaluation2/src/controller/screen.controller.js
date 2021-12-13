const express = require('express');
const router = express.Router();
const Screen = require('../model/screen.model');


router.post('/', async (req,res) => {
    try {
    const screen = await Screen.create(req.body);
     res.send(screen);
    }
    catch(e){
        res.send(e.message);
    }

})


module.exports = router;