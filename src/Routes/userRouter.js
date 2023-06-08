const express=require('express')
const route=express.Router()
const user=require('../Controller/userController')
const product=require('../Controller/productController')


route.post("/users/register",user.userRegister)
route.post("/users/login",user.userLogin)
route.get('/users/products',product.getallProduct)
route.get('/users/products/:id',product.getproductByid)
route.get('/users/products/category/:category',product.getprdctBycategory)

module.exports=route