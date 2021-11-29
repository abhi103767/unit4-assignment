const express = require('express');
const app = express();
const users = require('./data.json');

const authorise = (permission) => {


   

    return (req,res,next) => {
        console.log(permission);
        next();
    }
   
   
}


app.post('/users',authorise('title'),(req,res) => {
    console.log('you are in  get the package json');
    res.send(users);
})

app.listen('12345',() => {
    console.log("port is running on 2345");
});