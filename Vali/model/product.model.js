const mongoose = require('mongoose');


const productSchmea = new mongoose.Schema({
    name : {type : String , required: true},
    price : {type : String, required : true, default: null},
    image_url : [{type : String, required : true}],
},
{
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model('product',productSchmea);