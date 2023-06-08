const mongoose = require("mongoose");

const data = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  category: String,
});
const productschema = mongoose.model("productschema", data);
module.exports=productschema