const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name : {type : String, required : true},
    email : {type: String, required : true},
    password : {type : String, required : true},
    roles : [{type: String, required : true}],
},{
    versionKey : false,
    timestamps: true
}
);

userSchema.pre("save", function (next){
    if(!this.isModified("password")) return next();
        bcrypt.hash(this.password, 10, (err, hash)=> {
            this.password=hash;
            return next();
        });
   
});



userSchema.methods.checkPassword = function(password){
    return new Promise((resolve,reject)=>{
        console.log(this.password)
        bcrypt.compare(password,this.password, function(err, same) {
            console.log(this.password);
            console.log(password);
            if(err) return reject(err);
            return resolve(same);
        });
    })

}




module.exports = mongoose.model("user",userSchema);



