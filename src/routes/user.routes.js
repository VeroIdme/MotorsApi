const express = require("express")
const userController = require("../controllers/user.controllers")
const userMiddleware = require("../middlewares/user.middleware")
const authMiddleware = require("../middlewares/auth.middleware")
const router = express.Router()

/* CRUD con router */

router.route("/")
    .get(userController.findUsers)
router.route("/:id")
    .get(userMiddleware.userValidation, userController.findUser)
    .patch(
            authMiddleware.roles("client"), 
            userMiddleware.userValidation,
            userController.updateUsers)
    .delete(
            authMiddleware.roles("client"),
            userMiddleware.userValidation, 
            userController.deleteUsers)

module.exports = router