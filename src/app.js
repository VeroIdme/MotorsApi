const AppError = require("./utils/appError")
//!😁😁Importacion de cors para que el servidor pueda aceptar peticiones de diferentes dominios
const cors = require("cors")
//!😁😁Importancion de express
const express = require("express")
const morgan = require("morgan")
require("dotenv").config()
//Guardamos la variable de express en app
const app = express()

//?Middleware para que la app pueda aceptar formato json
app.use(express.json())
app.use(cors())

//!Ejecucion de morgan para errores y requeriemientos segun entornos
/* if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"))
} */

//Importacion de rutas segun usuario
const userRouter = require('./routes/user.routes')
const repairRouter = require('./routes/repair.routes')
const authRouter = require("./routes/auth.routes")
const globalErrorHandler = require("./controllers/error.controller")

//?Middleware para concatenar rutas e ir a los archivos routes 
app.use("/api/v1/users", authRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/repairs", repairRouter)

app.all("*", (req, res, next) => {
    return next(new AppError(`The endpoint ${originalUrl} is incorrect`))
})

app.use(globalErrorHandler)
//Exportacion de app 
module.exports = app