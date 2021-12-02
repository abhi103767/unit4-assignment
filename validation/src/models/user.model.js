const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    first_name : {type: String, required: true},
    last_name : {type : String , required : true},
    email : {type: String, required : true},
    gender : {type : String, required : true},
    ip_address : {type : String},
    age : {type : Number,required : true},
},
{
    versionKey: false,
   timestamps : true, 
});
module.exports = mongoose.model("user",userSchema);

