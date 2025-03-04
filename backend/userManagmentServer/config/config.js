require("dotenv").config();
const { Pool } = require('pg');

const config = {
    jwt: {
        refreshTokenSecret: process.env.SECRET_REFRESH_TOKEN,
        accessTokenSecret: process.env.SECRET_ACCESS_TOKEN,
        refreshTokenExpiry: "300s",
        accessTokenExpiry: "10s"
    },
    cookie: {
        maxAge: 300 * 1000,
        httpOnly: false,
        secure: true,
        sameSite: "lax",
    },
}

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: process.env.PORT,
    database: process.env.DATABASE,
});

module.exports = {
    config,
    pool,

};