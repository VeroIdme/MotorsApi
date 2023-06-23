 const AppError = require("../utils/appError")
 require("dotenv").config()

 //Creacion de un manejador de errores segun codigo
const handlerError23505 = () => new AppError('Duplicate value', 400)

 //!La respuesta que se enviara a backend
 const sendErrorDev = (err, res) => {
    return res.status(err.statusCode).json({
        statusCode: err.statusCode,
        status: err.status,
        messagge: err.messagge,
        stack: err.stack
    })
 }

 //!Enviamos el error para el lado del frontend o produccion
 const sendErrorProd = (err, res) => {
    if(err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            messagge: err.messagge,
        })
    } else {
        return res.status(500).json({
            status: "Fail",
            messagge: "Internal Server Error",
        })
    }
 }
 
 const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    err.status = err.status || "Fail"

    if(process.env.NODE_ENV === "development"){
        sendErrorDev(err, res)
    }
    if(process.env.NODE_ENV === "production"){
        const error = err

        if(error.parent.code === "23505") handlerError23505()
        
        sendErrorProd(err, res)
    }
 }

 module.exports = globalErrorHandler