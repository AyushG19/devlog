require("dotenv").config();

const config = {
    jwt: { 
        refreshTokenSecret: process.env.SECRET_REFRESH_TOKEN,
        accessTokenSecret : process.env.SECRET_ACCESS_TOKEN,
        refreshTokenExpiry : "10s",
        accessTokenExpiry : "30s"
     },
    cookie: {
        maxAge: 30 * 1000,
        httpOnly: false,
        secure: true,
        sameSite: "lax",
    },
}

module.exports = config;