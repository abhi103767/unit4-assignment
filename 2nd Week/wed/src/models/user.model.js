const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
    movie_name : {type : String},
    movie_genre: {type : String},
    production_year: {type : Number}

}, {
    versionKey: false,
    timestamps: true
})



module.exports = mongoose.model("user",movieSchema);