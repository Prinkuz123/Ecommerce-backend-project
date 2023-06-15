const userSchema = require("../Model/Userschema");
const productData = require("../Model/Productschema");
const jwt = require("jsonwebtoken");
const productschema = require("../Model/Productschema");

const bcrypt = require("bcrypt");

//-------------ueser register---------------

const userRegister = async (req, res) => {
  
    const userName = req.body.username;
    const Password = req.body.password;

    const user = await userSchema.findOne({ username: userName });

    if (user) {
      return res.json("This user already exists");
    }

    //Hashing password-----
    let hashedPassword = await bcrypt.hash(Password, 10);

    const newUser = new userSchema({
      username: userName,
      password: hashedPassword,
    });
    await newUser.save();

    res.json({
      status: "success",
      message: "User registered successfully, please login to continue",
    });
  
};

//---------------- user login-----------------
const userLogin = async (req, res) => {
 
    let userName = req.body.username;
    const passWord = req.body.password;
    const User = await userSchema.findOne({ username: userName });
    if (!User) {
      return res
        .status(404)
        .send({ status:"failure", message: "invalid password or username" });
    }
    //hashing password
    let Password = await bcrypt.hash(passWord, 10);

    bcrypt.compare(Password, User.password, (err) => {
      if (err) {
        return res
          .status(401)
          .json({status:"failure", message: "Invalid password" });
      }
    });
    const token = jwt.sign({ username: userName }, "user", {
      expiresIn: "24h",
    });
    res.json({ status:"success", 
    message: "user logined successfully", 
    data:token });
  
};

//..........Add product to cart by user.......
const AddproductTocart = async (req, res) => {
  let productId = req.params.id;
  const product = await productData.findById(productId);
  if (!product) {
    return res.json({status:"failure",message:"some error occured "} );
  }

  
    const user = req.body.username;
    const User = await userSchema.findOne({ username: user });

    if (User.cart.includes(productId)) {
      return res.json("product already exist in the cart");
    }

    User.cart.push(productId);
    await User.save();
    res.json("product added sucessfully");
  
 
};
//.................getting all products from cart.................
const gettingProductfromCart = async (req, res) => {
  const productId = req.params.id;
  
    const User = await userSchema.findById(productId).populate("cart");
    if (!User) {
     return res.json({status:"failure",message:"please login"});
    }
    res.json(User.cart);
  
};
//................add products to wishlist.................

const addproductTowishlist = async (req, res) => {
  const Id = req.params.id; //x
  const product = await productschema.findById(Id);
  if (!product) {
   return res.json("something went wrong");
  }
  
    const user = req.body.username;
    const User = await userSchema.findOne({ username: user });
    if (User.wishlist.includes(Id)) {
      return res.json("item already added to the wishlist");
    } else {
      User.wishlist.push(Id);
      //   console.log(User.wishlist)

      await User.save();
      console.log(User);
      res.send("product added to wishlist successfully");
    }
 
};

////----------get all products from wishlit---------------
const getAllproductsFromWishlist = async (req, res) => {
  const id = req.params.id;

  
    const User = await userSchema.findById(id).populate("wishlist");
    if (!User) {
     return  res.json(" wishlist is empty");
    } else {
      res.json(User.wishlist);
    }
  
};

//  -------------deleting product from the wishlist--------------
const deleteFromWishlist = async (req, res) => {
  const id = req.params.id;
  const user = req.body.username;

  
    const User = await userSchema.findOne({ username: user });
    if (!User) {
      res.json("User not found please register");
    }
    const productIndex = User.wishlist.indexOf(id);
    if (productIndex === -1) {
      return res.status(404).json("no product found in wishlist");
    }

    User.wishlist.splice(productIndex, 1);
    await User.save();
    res.json("product removed from the wishlist ");

};

module.exports = {
  userRegister,
  userLogin,
  AddproductTocart,
  gettingProductfromCart,
  addproductTowishlist,
  getAllproductsFromWishlist,
  deleteFromWishlist,
};
