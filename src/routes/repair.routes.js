const express = require("express")
const repairController = require("../controllers/repair.controllers")
const router = express.Router()

/* CRUD con router */

router.route("/")
    .get(repairController.findRepairs)
    .post(repairController.createRepairs)
router.route("/:id")
    .get(repairController.findRepair)
    .patch(repairController.updateRepairs)
    .delete(repairController.deleteRepairs)

module.exports = router