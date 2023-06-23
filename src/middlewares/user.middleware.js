const User = require("../models/user.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")

exports.userValidation = catchAsync(async (req, res, next) => {
    const { id } = req.params
        
    const user = await User.findOne({
        where: {
            id,
            status: "available",
        }
    })

    if (!user) next(new AppError('User not found', 400))
    
    req.user = user
    next()
})

