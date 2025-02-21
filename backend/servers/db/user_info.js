const {Pool} = require('pg');

const userPool = new Pool({
    user:"postgres",
    password: "@Ayush1900",
    host : "localhost",
    port : 5432,
    database : "devlog_db"
})
module.exports = userPool;