const express = require("express")
const userController = require("../controllers/user.controllers")
const userMiddleware = require("../middlewares/user.middleware")
const router = express.Router()

/* CRUD con router */

router.route("/")
    .get(userController.findUsers)
router.route("/:id")
    .get(userMiddleware.userValidation, userController.findUser)
    .patch(userMiddleware.userValidation, userController.updateUsers)
    .delete(userMiddleware.userValidation, userController.deleteUsers)

module.exports = router