const mongoose = require("mongoose");
const User = new mongoose.Schema({
 
username:String,
email:String,
password:String,
cart:Array,
wishlist:Array,
orders:Array

});
const userSchema = mongoose.model("userSchema",User );
module.exports = userSchema;
