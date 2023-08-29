const express= require("express")
const { postSignup } = require("../controller/signUp")
const { loginPage, forgotPassword } = require("../controller/login")
const userRouter= express.Router()


//routes
userRouter.post("/signup",postSignup)
userRouter.post("/login",loginPage)
userRouter.post("/forgotpassword",forgotPassword)

//exporting
module.exports= userRouter

