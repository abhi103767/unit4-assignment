const express = require("express");
const router = express.Router();
const {body,validationResult} = require('express-validator');
const User = require("../models/user.model");
const mongoose = require("mongoose");


router.post('/',body("first_name").notEmpty().withMessage('first name is required'),
body("last_name").notEmpty().withMessage("last name is required"),
body("age").custom((value) => {
    console.log(value); 
    if ( value  < 0 || value > 100 ){
        throw new Error ("age can not be negative or greater 99"); 
    }
    return true;
}),
body("email").custom((value) => {
    const domains = ["gmail.com","yahoo.com"];
   const isEmail = 	/^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,20}$/.test(value);
    if ( !isEmail ){
        throw new Error ("Provide proper Email");
    }
    
    let Email = value.trim().split('@');
    console.log(Email);
    console.log(isEmail)
    const userByEmail = User.findOne({email :  value}).lean().exec()

    if ( userByEmail){
        throw new Error ("this is existing email");
    }

}) ,async(req,res) => {
     console.log(body('first_name'));

    try {
        const errors = validationResult(req);
        if ( !errors.isEmpty()){
          return res.status(400).send({
            errors : errors.array()
          });

        }
          const user = await User.create(req.body);
          res.send(user);
    }
   catch(e){
       res.send(e.message);
   }

})

module.exports = router;