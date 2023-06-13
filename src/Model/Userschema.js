const mongoose = require("mongoose");
const User = new mongoose.Schema({
 
username:{type:String,required:true},
email:{type:String},
password:String,
cart:[{type:mongoose.Schema.Types.ObjectId,
    ref:"productschema",
}],
wishlist:[{type:mongoose.Schema.Types.ObjectId,
    ref:"productschema"
}],
orders:[{
    products:[{type:Number,default:0}],orderId:[{type:String,default:""}],totalAmount:{type:Number,default:0}
}]

});
const userSchema = mongoose.model("userSchema",User );
module.exports = userSchema;
