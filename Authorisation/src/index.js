const express  = require('express');
const app = express();
const connect = require('./configis/db');
const productController = require('./controller/product.controller');
app.use(express.json());
const {register,login} = require("./controller/user.controller");

app.post('/register', register);
app.post('/login', login);
app.use('/products', productController);

app.listen('134', async () => {
    await connect();
    console.log("we are listening 1434");
})

