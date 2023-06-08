const express=require('express')

const admin=require('../Controller/adminController')
const product=require('../Controller/productController')

const route=express.Router()
route.post("/admin/login",admin.adminLogin)
route.post('/admin/products',product.addProduct)
route.get('/admin/users',admin.getallUsers)
route.get('/admin/users/:id',admin.getusersByid)
route.get('/admin/products',product.getallProduct)
route.get('/admin/products/:id',product.getproductByid)
route.get("/admin/products/category/:category",product.getprdctBycategory)
route.put('/admin/products/:id',product.updateProduct)
route.delete('/admin/products/:id',product.deleteProduct)

module.exports=route











