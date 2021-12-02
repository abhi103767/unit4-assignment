const express = require('express');
const { access } = require('fs');
const Product = require('../../src/product.model');
const router = express.Router(); 
const sendMail = require('../utilities/sendmail');



router.post('/', async (req,res) => {
    try {
     const product = await Product.create(req.body);
       sendMail("a@a.com","b@b.com","dkja","ksdjf","ksfja");
     res.send(product);
    }
    catch(e){
      res.send(e.message);
    }
})

router.get('/', async (req,res) => {
    const page = +req.query.page || 1;
    const size = +req.query.size || 2;
    const skip = (page - 1) * size;
    const total_pages =  Math.ceil(await Product.find().count()/size);
    console.log(page,size);
    try {
        const products = await Product.find().skip(skip).limit(size).lean().exec();
        res.send({products,total_pages});
    }
    catch(e){
        res.send(e.message);
    }
})

module.exports = router;