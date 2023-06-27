const Repair = require("../models/repair.model")
const catchAsync = require("../utils/catchAsync")

/* Funciones  */
exports.findRepairs = catchAsync(async (req, res) => {
    const time = req.requestTime
    const repairs = await Repair.findAll({
        where: {
            status: "pending",
        }
    })

    return res.json({
        requestTime: time,
        results: repairs.length,
        status: "Success",
        message: "Repair found",
        repairs,
    })
})
exports.findRepair = catchAsync(async (req, res) => {
    const { repair } = req
        return res.json({
            status: "Success",
            message: "repair found",
            repair,
        })
})
exports.createRepairs = catchAsync(async (req, res) => {
    const { date } = req.body
    const { id } = req.sessionUser
        
    const repair = await Repair.create({
        date,
        userId: id,
    })    
        
    return res.status(210).json({
        message: "The repair has been created",
        repair,
    })
})
exports.updateRepairs = catchAsync(async (req, res) => {
    const { repair } = req
        
        await repair.update({ status: "completed" })
        
        return res.status(200).json({
            status: "success",
            message: "the repair has been updated"
        })
})
exports.deleteRepairs = catchAsync(async (req, res) => {
    const { repair } = req
        await repair.update({ status: "cancelled" })
        
        return res.status(200).json({
            status: "success",
            message: "the repair has been updated"
        })
})