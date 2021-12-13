const mongoose = require("mongoose");

const showSchmea = new mongoose.Schema(
  {
     timing: { type: String, required: true },
    movie: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "movie",
      required: true,
    },
    totalSeats : { type : Number, required: true},
    screen : {type :  mongoose.Schema.Types.ObjectId,
        ref : 'screen',
        required : true}

  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("show", showSchmea);
