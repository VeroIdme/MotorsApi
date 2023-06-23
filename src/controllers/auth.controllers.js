const User = require("../models/user.model")
const AppError = require("../utils/appError")
const catchAsync = require("../utils/catchAsync")
const bcrypt = require("bcrypt")
const generateJWT = require("../utils/jwt")

exports.createUsers = catchAsync(async (req, res, next) => {
    //1. Traemos los datos del req.body
     const { name, email, password, role } = req.body
    //2. Encriptmamos la contrasena
     const salt = await bcrypt.genSalt(12)
     const encryptedPassword = await bcrypt.hash(password, salt)
 
    //3. Creacion del usuario
     const user = await User.create({
         name: name.toLowerCase(),
         email: email.toLowerCase(),
         password: encryptedPassword,
         role,
     })
     
     //4. Generacion del token
     const token = await generateJWT(user.id)
     
     //5. Enviamos la respuesta
     return res.status(210).json({
         status: "success",
         messagge: "User created",
         token,
         user: {
             id: user.id,
             name: user.name,
             email: user.email,
             role: user.role
         },
     })
 })
exports.login = catchAsync( async (req, res, next) => {
    //1. Traer los datos email y password
        const { email, password } = req.body
    //2. Validar si el email existe
        const user = await User.findOne({
            where: {
                email: email.toLowerCase(),
                status: "available"
            }
        })

        if(!user) next(new AppError("User not found, logged again", 401))
    //3. Validar la contrasena
        if(!(await bcrypt.compare(password, user.password))){
            return next(new AppError("Incorrect password, to enter correct password", 401))
        }

    //4. Generar el token
        const token = await generateJWT(user.id)
    //5. Enviar la respuesta
        return res.status(210).json({
         status: "success",
         messagge: "User logged",
         token,
         user: {
             id: user.id,
             name: user.name,
             email: user.email,
             role: user.role
         },
        })
})
