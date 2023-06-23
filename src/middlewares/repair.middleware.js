const Repair = require("../models/repair.model")
const catchAsync = require("../utils/catchAsync")

exports.repairValidation = catchAsync(async (req, res, next) => {
    const { id } = req.params
        
    const repair = await Repair.findOne({
        where: {
            id,
            status: "pending",
        }
    })

    if (!repair) {
        return res.status(404).json({
        message: "The repair with the one not found"
        })
    }

    req.repair = repair
    next()
})