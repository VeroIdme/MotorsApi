const { Sequelize } = require('sequelize')

const db = new Sequelize({
    dialect: "postgres",
    host: "localhost",
    username: "postgres",
    password: "vroot",
    database: "motorsapp",
    logging: false,
})

module.exports = { db }