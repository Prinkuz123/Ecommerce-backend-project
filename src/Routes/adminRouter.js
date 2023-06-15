const express=require('express')

const admin=require('../Controller/adminController')
const product=require('../Controller/productController')
const adminToken=require('../Middleware/authorizeAdmin')
const tryCatch=require("../Middleware/tryCatchError")
const route=express.Router()
route.post("/admin/login",tryCatch(admin.adminLogin))

route.post('/admin/products',tryCatch(adminToken,product.addProduct))

route.get('/admin/users',adminToken,tryCatch(admin.getallUsers))
route.get('/admin/users/:id',adminToken,admin.getusersByid)

route.get('/admin/products',adminToken,tryCatch(product.getallProduct))
route.get('/admin/products/:id',adminToken,tryCatch(product.getproductByid))
route.get("/admin/products/category/:category",adminToken,tryCatch(product.getprdctBycategory))

route.put('/admin/products/:id',adminToken,tryCatch(product.updateProduct))

route.delete('/admin/products/:id',adminToken,tryCatch(product.deleteProduct))

module.exports=route











