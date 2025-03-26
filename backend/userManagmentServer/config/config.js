require("dotenv").config();
const { Pool } = require('pg');

const isProd = process.env.NODE_ENV === "production"

const config = {
    jwt: {
        refreshTokenSecret: process.env.SECRET_REFRESH_TOKEN,
        accessTokenSecret: process.env.SECRET_ACCESS_TOKEN,
        refreshTokenExpiry: isProd ? "12h" : "10m",
        accessTokenExpiry: isProd ? "15m" : "5m"
    },
    cookie: {
        maxAge: isProd ? 12 * 60 * 60 * 1000 : 600 * 1000,
        httpOnly: true,
        secure: isProd,
        sameSite: isProd ? "strict" : "lax",
        signed: true,
        path: '/',
    },
    cors: {
        origin: isProd ? process.env.CLIENT_URL : ["http://localhost:5173", "http://localhost:4173", "http://192.168.29.232:5173"],
        credentials: true
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