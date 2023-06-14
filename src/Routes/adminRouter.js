const express=require('express')

const admin=require('../Controller/adminController')
const product=require('../Controller/productController')
const adminToken=require('../Middleware/authorizeAdmin')

const route=express.Router()
route.post("/admin/login",admin.adminLogin)
route.post('/admin/products',adminToken,product.addProduct)
route.get('/admin/users',adminToken,admin.getallUsers)
route.get('/admin/users/:id',adminToken,admin.getusersByid)
route.get('/admin/products',adminToken,product.getallProduct)
route.get('/admin/products/:id',adminToken,product.getproductByid)
route.get("/admin/products/category/:category",adminToken,product.getprdctBycategory)
route.put('/admin/products/:id',adminToken,product.updateProduct)
route.delete('/admin/products/:id',adminToken,product.deleteProduct)

module.exports=route











