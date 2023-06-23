//!😁😁Importacion y configuracion de dotenv para las variables de entorno
require("dotenv").config()
//!😁😁Importacion de app
const express = require("express")
//!😁😁Importacion de la db
const { db } = require("./database/config")

const app = express()

//Autenticando y sincronizando base de datos
db.authenticate()
    .then(() => console.log("Database authenticated"))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log("Database synced"))
    .catch(err => console.log(err))


//?El metodo listen, trayendo variables de entorno el PORT
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
