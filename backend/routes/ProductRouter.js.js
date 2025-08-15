const express = require('express');
const ensureAuth = require('../middlewares/UserAuth');
const { addProduct, getProduct, deleteProduct, updateProduct } = require('../controllers/ProductController');
let productRouter = express.Router()

productRouter.post("/add",ensureAuth,addProduct)
productRouter.get("/get-list",ensureAuth,getProduct)
productRouter.delete("/delete/:id",ensureAuth,deleteProduct)
productRouter.put("/update/:id",ensureAuth,updateProduct)

module.exports=productRouter
