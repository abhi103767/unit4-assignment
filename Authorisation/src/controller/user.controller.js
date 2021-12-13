const express = require("express");
require("dotenv").config();
const productController = require("../models/product.model");
const newToken = (user) => {
    return jwt.sign({user: user},process.env.JWT_ACCESS_KEY);
}

//const router = express.Router();
const {body,validationResult} = require('express-validator');
const User = require("../models/user.model");
const jwt = require('jsonwebtoken');

const register =  async ( req,res) => {
    try {
        let user = await User.findOne({email : req.body.email}).lean().exec();
        if (user){
            return res.status(400).json({
                status : "failed",
                message : "Please provide a different email address"
             })
        }

    user = await User.create(req.body);
    const token = newToken(user);
    res.send({user,token});
         }

   catch(e){
       res.send(e.message);
   }
    
}

const login = async(req,res) => {

    try{
        let user = await User.findOne({email : req.body.email});
    
         if ( !user){
             return res.status(400).json({
                 status : "failed",
                 message: "please Provide  correct email and password",
             })
         }

    //if email is present or not 
   
    // throw error invailed increadcial
    // matching password
  //console.log(req.body.password);
  const match = await user.checkPassword(req.body.password);

  //console.log(1);
  console.log(match);
  if ( !match){
      return res.status(400).json({
          status : "failed",
          message : "Please provide correct password and email"
      })
  }
    // token 

    const token = newToken(user);
    // return token
    return res.send({user,token})
    }catch(e){
        return res.status(500).send(e.message);
    }

}


module.exports = {register,login};

