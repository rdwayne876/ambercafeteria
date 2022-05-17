// const mysql = require('mysql')
// require('dotenv').config()

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.APP_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
})

// connection.connect()
// module.exports = connection