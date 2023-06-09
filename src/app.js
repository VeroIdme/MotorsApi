const cors = require("cors")
const express = require("express")

const app = express()

const userRouter = require('./routes/user.routes')
const repairRouter = require('./routes/repair.routes')

app.use(express.json())

app.use("/api/v1/products", userRouter)
app.use("/api/v1/products", repairRouter)


module.exports = app