const express  = require('express');
const app = express();
const connect = require('./configis/db');

app.use(express.json());
const userController = require("./controller/user.controller");



app.use('/users',userController);

app.listen('134', async () => {
    await connect();
    console.log("we are listening 1434");
})

