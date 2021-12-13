const jwt = require("jsonwebtoken");
require("dotenv").config;

const verifyToken = (token) => {
    return jwt.verify(token,process.env.JWT_ACCESS_KEY);
}

module.exports = (req,res,next) => {


    // if we recieved the bearer token in the header 
    // if we not recieved the bearer token then we will be throw an error.
    const bearerToken = req?.headers?.authorization;
    console.log(bearerToken); 

    if ( !bearerToken || !bearerToken.startsWith("Bearer ")){
        return res.status(400).json({
            status : "failed",
            message : "Please provide a different email address",
        });
    };
    const token = bearerToken.split(' ')[1];
    const user = verifyToken(token);
   // console.log(user);

   if ( !user ){
    return res.status(400).json({
        status : "failed",
        message : "Please provide a different email address"
    });
   }
   console.log(req);

    // else we try to get the user from the token.
    // if no user found then we will throw an error.

    req.user = user;;
    // else we attach to the req.
    
    return next();

}

