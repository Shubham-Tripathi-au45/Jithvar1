const express = require("express")
const authNavRouter = express.Router()
const {authMiddleware} = require("../middlewares/auth")
authNavRouter.use(authMiddleware)
