const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controllers")
const validationMiddleware = require("../middlewares/validation.middleware")

router.post("/",
    validationMiddleware.createUserFields,
    userController.createUsers)

router.post("/login", 
    validationMiddleware.loginUser,
    authController.login)