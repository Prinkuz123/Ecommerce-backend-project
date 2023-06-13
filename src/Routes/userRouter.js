const express=require('express')
const route=express.Router()
const user=require('../Controller/userController')
const product=require('../Controller/productController')
const userToken=require('../Middleware/authorizeUser')

route.post("/users/register",user.userRegister)
route.post("/users/login",userToken,user.userLogin)
route.get('/users/products',userToken,product.getallProduct)
route.get('/users/products/:id',userToken,product.getproductByid)
route.get('/users/products/category/:category',userToken,product.getprdctBycategory)
route.post('/users/cart/:id',userToken,user.AddproductTocart)
route.get('/users/cart/:id',userToken,user.gettingProductfromCart)
route.post('/users/wishlist/:id',userToken,user.addproductTowishlist)
route.get('/users/wishlist/:id',userToken,user.getallproductsFromwishlist)
route.delete('/users/wishlist/:id',userToken,user.deletefromWishlist)

module.exports=route