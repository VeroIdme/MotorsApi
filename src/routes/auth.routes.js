const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.controllers")
const validationMiddleware = require("../middlewares/validation.middleware")

router.route("/").post(
    validationMiddleware.createUserFields,
    authController.createUsers)

router.route("/login").post( 
    validationMiddleware.loginUser,
    authController.login)

module.exports = router