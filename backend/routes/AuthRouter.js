const express = require('express');
const { singupValidation, loginValidation } = require('../middlewares/AuthValidation');
const { singup, login, getUser } = require('../controllers/AuthController');
const ensureAuth = require('../middlewares/UserAuth');
let userRoutes = express.Router()

userRoutes.post("/signup",singupValidation,singup)
userRoutes.post("/login",loginValidation,login)
userRoutes.get("/getuser",ensureAuth,getUser)

module.exports=userRoutes;