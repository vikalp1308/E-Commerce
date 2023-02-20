const config = require('../config')
const mysql = require('mysql')
const { promisify } = require('util')
let pool = mysql.createPool(config.dbCredentials);

pool.query = promisify(pool.query)

module.exports = pool
