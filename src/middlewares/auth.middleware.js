require("dotenv").config()
const User = require("../models/user.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const { promisify } = require("util")
const jwt = require("jsonwebtoken")


exports.protect = catchAsync(async (req, res, next) => {
    //?1. Traemos el token
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(" ")[1]
    }
    //?2. Enviamos un error si no existe el token
    if(!token) next(new AppError("You are not loggin, please logged"), 401)

    //?3. Decodificamos el token
    const decoded = await promisify(jwt.verify)(
        token,
        process.env.SECRET_JWT_SEED
    )

    //?4. Buscamos el usuario segun el id decodificado
    const user = await User.findOne({
        where:{
            id: decoded.id,
            status: "available"
        }
    })

    if(!user) next(new AppError('The owner of this token it not longer available'))

   /*  //?5. En caso de cambio de contrasena, que se cirre sesion y vuelva a loguearse
    if(user.passwordChangeAt){
        const changeTimeStamp = parseInt(user.passwordChangeAt.getTime()/1000,10)
        if(decoded.iot < changeTimeStamp) next(new AppError('Your password changed, loggin again', 401))
    }
 */

    req.sessionUser = user
    
    next()
})
exports.roles = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.sessionUser.role)) next(new AppError("You dont have to permition for to perfom this action", 403))
        next()
    }
}
exports.protectAccountOwner = catchAsync(async (req, res, next) => { 
    const { user, sessionUser } = req

    if(user.id !== sessionUser.id) next(new AppError("You cannot to perfom this action ", 403))

    next()
})

