const express=require('express')
const route=express.Router()
const user=require('../Controller/userController')
const product=require('../Controller/productController')


route.post("/users/register",user.userRegister)
route.post("/users/login",user.userLogin)
route.get('/users/products',product.getallProduct)
route.get('/users/products/:id',product.getproductByid)
route.get('/users/products/category/:category',product.getprdctBycategory)
route.post('/users/cart/:id',user.AddproductTocart)
route.get('/users/cart/:id',user.gettingProductfromCart)
route.post('/users/wishlist/:id',user.addproductTowishlist)
route.get('/users/wishlist/:id',user.getallproductsFromwishlist)
route.delete('/users/wishlist/:id',user.deletefromWishlist)

module.exports=route