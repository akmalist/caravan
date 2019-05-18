//create a schema
/*jshint esversion:6 */
const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  name: String,
  price: String,
  image: String,
  description: String,
  author: {
    id:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },
    username:String
  },
  comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

//create a module

module.exports = mongoose.model("Car", carSchema);
