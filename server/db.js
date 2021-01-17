const mysql = require('mysql')
const keys = require('./keys')

const db = mysql.createPool({
    user: keys.user,
    password: keys.password,
    host: keys.host,
    database: keys.db
})

module.exports = db