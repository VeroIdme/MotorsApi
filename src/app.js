//!😁😁Importacion de cors para que el servidor pueda aceptar peticiones de diferentes dominios
const cors = require("cors")
//!😁😁Importancion de express
const express = require("express")

//Guardamos la variable de express en app
const app = express()

//?Middleware para que la app pueda aceptar formato json
app.use(express.json())
app.use(cors())
//Importacion de rutas segun usuario
const userRouter = require('./routes/user.routes')
const repairRouter = require('./routes/repair.routes')

//?Middleware para concatenar rutas e ir a los archivos routes 
app.use("/api/v1/users", userRouter)
app.use("/api/v1/repairs", repairRouter)

//Exportacion de app 
module.exports = app