const express=require('express')
const route=express.Router()
const user=require('../Controller/userController')
const product=require('../Controller/productController')
const userToken=require('../Middleware/authorizeUser')
const tryCatch=require("../Middleware/tryCatchError")
route.post("/users/register",tryCatch(user.userRegister))
route.post("/users/login",tryCatch(user.userLogin))

route.get('/users/products',userToken,tryCatch(product.getallProduct))
route.get('/users/products/:id',userToken,tryCatch(product.getproductByid))

route.get('/users/products/category/:category',userToken,tryCatch(product.getprdctBycategory))

route.post('/users/cart/:id',userToken,tryCatch(user.AddproductTocart))
route.get('/users/cart/:id',userToken,tryCatch(user.gettingProductfromCart))
route.post('/users/wishlist/:id',userToken,tryCatch(user.addproductTowishlist))
route.get('/users/wishlist/:id',userToken,tryCatch(user.getallproductsFromwishlist))
route.delete('/users/wishlist/:id',userToken,tryCatch(user.deletefromWishlist))

module.exports=route