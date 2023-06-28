const Repair = require("../models/repair.model")
const User = require("../models/user.model")
const catchAsync = require("../utils/catchAsync")

exports.repairValidation = catchAsync(async (req, res, next) => {
    const { id } = req.params
        
    const repair = await Repair.findOne({
        where: {
            id,
            status: "pending",
        },

        include: [
            {
                model: User
            }
        ]

    })

    if (!repair) {
        return res.status(404).json({
        message: "The repair with the one not found"
        })
    }

    req.user = repair.user
    req.repair = repair
    next()
})