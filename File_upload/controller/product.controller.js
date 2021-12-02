const express = require('express');
const upload = require('../middleware/upload');
const Product = require('../model/product.model');

const router = express.Router();

router.post('/single',upload.any("image_url"),async (req,res) => {
  console.log(req.files);
try {
  const filePaths = req.files.map(file => file.path);
  const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
    image_url : filePaths
  });
  res.send(product);
}
catch(e){
  res.send(e.message);
}
})


// router.post('/multiple',upload.any("image_url"),async (req,res) => {
// try {
//   const filePaths = req.files.map(file => file.path);
//   const product = await Product.create({
//       name: req.body.name,
//       price: req.body.price,
//     image_url : filePaths
//   });
//   res.send(product);
// }
// catch(e){
//   res.send(e.message);
// }
// })


router.post('/multiple', upload.any("image_url"),async (req,res) => {
  try {
  const filePaths = req.files.map(file => file.path);
  console.log(filePaths);
  const product = await Product.create({
    name: req.body.name,
    price: req.body.price,
  image_url : filePaths
});
res.send(product);
  }catch(e){
    res.send(e.message);
  }
})

module.exports = router;