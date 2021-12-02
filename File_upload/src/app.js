const express = require('express');
const app = express();
app.use(express.json());

const connect = require('../configis/db');
const productController = require('../controller/product.controller');


app.use('/products',productController);


app.listen('234',async () => {
    await connect();
    console.log("we are listeing at 1234");
});