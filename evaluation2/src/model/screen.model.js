const mongoose = require('mongoose');


const screenSchmea = new mongoose.Schema({
   name : {type : String, required : true},
   theater : {type :  mongoose.Schema.Types.ObjectId,
    ref : 'theater',
    required : true}
},
   {
       versionKey : false,
       timestamps: true,
   }

)


module.exports = mongoose.model('screen',screenSchmea);