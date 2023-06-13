const userSchema = require("../Model/Userschema");
const productData = require("../Model/Productschema");
const productschema = require("../Model/Productschema");

//uesrregister
const userRegister = async (req, res) => {
  try {
    let Username = req.body.username;

    const User = await userSchema.findOne({ username: Username });

    if (User) {
      res.send("this user already exist");
    }

    const newUser = new userSchema(req.body);
    await newUser.save();

    res.send("USer registered successfully,please login to continue");
  } catch (er) {
    console.log("error", er);
  }
};

// user login
const userLogin = async (req, res) => {
  try {
    let Username = req.body.username;
    const Password = req.body.password;
    const User = await userSchema.findOne({ username: Username });
    if (!User) {
      res.send("User not found");
    } else {
      if (Password == User.password) {
        res.send("user login successful");
      } else {
        res.send("password mismatch");
      }
    }
  } catch (er) {
    console.log("Error", er);
  }
};

//..........Add product to cart by user.......
const AddproductTocart = async (req, res) => {
  let productId = req.params.id;
  const product = await productData.findById(productId);
  if (!product) {
    res.send("some error occured while adding to cart ");
  }

  try {
    const user = req.body.username;
    const User = await userSchema.findOne({ username: user });
    if (User.cart.includes(productId)) {
      res.send("product already exist in the cart");
    } else {
      User.cart.push(productId);
      await User.save();
      res.send("product added sucessfully");
    }
  } catch (er) {
    console.log("error", er);
  }
};
//.................getting all products from cart.................
const gettingProductfromCart = async (req, res) => {
  const productId = req.params.id;
  try {
    const User = await userSchema.findById(productId).populate("cart");
    if (!User) {
      res.send("please login");
    }
    res.send(User.cart);
  } catch (er) {
    console.log("error", er);
  }
};
//................add products to wishlist.................

const addproductTowishlist = async (req, res) => {
  const Id = req.params.id;
  const product = await productschema.findById(Id);
  if (!product) {
    res.send("something went wrong");
  }
  try {
    const user = req.body.username;
    const User = await userSchema.findOne({ username: user });
    // console.log(User)
    // console.log(User.wishlist)
    if (User.wishlist.includes(Id)) {
      res.send("item already added to the wishlist");
    } else {
      User.wishlist.push(Id); 
    //   console.log(User.wishlist)

        await User.save();
        console.log(User)
      res.send("product added to wishlist successfully");
    }
  } 
  catch (er) {
    console.log("error", er);
  }
};

////----------get all products from wishlit---------------
const getallproductsFromwishlist=async(req,res)=>{
const id=req.params.id

try{
    const User=await userSchema.findById(id).populate("wishlist")
    if(!User){
        res.send(" wishlist is empty")
    }
    else{
        res.send(User.wishlist)
    }
    
}
catch(er){
    console.log("error",er)
}
}

//  -------------deleting product from the wishlist--------------
const deletefromWishlist=async(req,res)=>{
    const id=req.params.id
    const user=req.body.username

    try{
        const User=await userSchema.findOne({username:user})
        if(!User){
            res.send("User not found please register")
        }
        const productIndex=User.wishlist.indexOf(id)
        if(productIndex===-1){
            return res.status(404).json("no product found in wishlist")
        }
        
            User.wishlist.splice(productIndex,1)
            await User.save()
            res.send("product removed from the wishlist ")
        


    }
    catch(er){
        console.log("error",er)
    }
   
}

module.exports = {
  userRegister,
  userLogin,
  AddproductTocart,
  gettingProductfromCart,
  addproductTowishlist,
  getallproductsFromwishlist,
  deletefromWishlist
};
