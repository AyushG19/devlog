require("dotenv").config();
const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === "production"

const config = {
    jwt: {
        refreshTokenSecret: process.env.SECRET_REFRESH_TOKEN,
        accessTokenSecret: process.env.SECRET_ACCESS_TOKEN,
        refreshTokenExpiry: "600s",
        accessTokenExpiry: "300s"
    },
    cookie: {
        maxAge: 300 * 1000,
        httpOnly: false,
        sameSite: "lax",
    },
}

const pool = new Pool({
    user: process.env.DBUSER,
    password: process.env.DBPASSWORD,
    host: process.env.DBHOST,
    port: process.env.DBPORT,
    database: process.env.DBDATABASE,
    ssl: isProd ? { rejectUnauthorized: false } : false,
});

module.exports = {
    config,
    pool,

};