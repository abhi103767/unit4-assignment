const mongoose = require('mongoose');

const productSchmea = new mongoose.Schema({
    name : {type : String , required: true},
    price : {type : String, required : true, default: null},
    user : {
        type :  mongoose.Schema.Types.ObjectId,
        ref : 'user',
        required : true,
        
    },
    image_url : [{type : String, required : true}],
},
{
    versionKey: false,
    timestamps: true,
})

module.exports = mongoose.model('product',productSchmea);
