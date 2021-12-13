const mongoose = require('mongoose');


const theaterSchmea = new mongoose.Schema({
   name : {type : String, required : true},
   location : {type : String , required : true}
},
   {
       versionKey : false,
       timestamps: true,
   }

)

console.log(1);

module.exports = mongoose.model('theater',theaterSchmea);