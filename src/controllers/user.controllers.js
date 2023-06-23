const User = require("../models/user.model")
const catchAsync = require("../utils/catchAsync")
const bcrypt = require("bcrypt")
const generateJWT = require("../utils/jwt")

/* Funciones  */
exports.findUsers = catchAsync(async (req, res) => {
    const time = req.requestTime
    const users = await User.findAll({
        where: {
            status: "available",
        }
    })

    return res.json({
        requestTime: time,
        results: users.length,
        status: "Success",
        message: "users found",
        users,
    })
})
exports.findUser = catchAsync(async (req, res, next) => {
    const { user } = req
        
        return res.json({
            status: "Success",
            message: "User found",
            user,
        })
})
exports.updateUsers = catchAsync(async (req, res) => {
    const { user } = req
        
    const { name, email } = req.body
        
    await user.update({ name, email })
        
        return res.status(200).json({
            status: "success",
            message: "the user has been updated"
        })
})
exports.deleteUsers = catchAsync(async (req, res) => {
    const { user } = req
        
        await user.update({ status: "disabled" })
        
        return res.status(200).json({
            status: "success",
            message: "the user has been deleted"
        })
})