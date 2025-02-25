require("dotenv").config();

const { Pool } = require('pg');

const userPool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
})
module.exports = userPool;