const express = require("express")
const repairController = require("../controllers/repair.controllers")
const repairMiddleware = require("../middlewares/repair.middleware")
const validationMiddleware = require("../middlewares/validation.middleware")
const router = express.Router()
const authMiddleware = require('../middlewares/auth.middleware')

/* CRUD con router */

router.use(authMiddleware.protect)

router.post("/",
    validationMiddleware.createRepairFields,
    repairController.createRepairs)

router.use(authMiddleware.roles("employee"))

router.route("/").get(repairController.findRepairs)
        
router.route("/:id")
    .get(repairMiddleware.repairValidation, repairController.findRepair)
    .patch(repairMiddleware.repairValidation, repairController.updateRepairs)
    .delete(repairMiddleware.repairValidation, repairController.deleteRepairs)

module.exports = router