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


module.exports = router;