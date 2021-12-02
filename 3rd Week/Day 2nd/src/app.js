const express = require('express');
const app = express();
app.use(express.json());

const productController = require('controller/product.controller');


const connect = require('../configis/db');

app.use('/products',productController)



app.listen('234', async() => {
    await connect();
    console.log("We are listening 234 port");
})



