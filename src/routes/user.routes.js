const express = require("express")
const userController = require("../controllers/user.controllers")
const router = express.Router()

/* CRUD con router */

router.route("/")
    .get(userController.findUsers)
    .post(userController.createUsers)
router.route("/:id")
    .get(userController.findUser)
    .patch(userController.updateUsers)
    .delete(userController.deleteUsers)

module.exports = router