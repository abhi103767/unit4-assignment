const express = require('express');
const router = express.Router();
const authorisation = require('../middlewares/authorisation');
const authorise = require('../middlewares/authorise');
const Product = require('../models/product.model');


router.post('/',authorisation,authorise(['admin','customer','seller']),  async( req, res) => {
  try {
    let product = await Product.create(req.body);
     res.send(product); 
  }
  catch(e){
      res.send(e.message);
  }
})

module.exports = router;

