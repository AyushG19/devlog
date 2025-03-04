require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { config } = require("../config/config");
const { valid } = require("joi");

class AuthService {
    static generateHashedPass = async (password) => {
        return await bcrypt.hash(password, 10);
    }
    static checkPass = async (password, hashedPass) => {
        return await bcrypt.compare(password, hashedPass);
    }
    static generateTokens = (tokentype, payLoad) => {
        if (tokentype === "all") {
            console.log("creating tokens with ", payLoad);
            const accessToken = jwt.sign(payLoad, config.jwt.accessTokenSecret, { expiresIn: config.jwt.accessTokenExpiry });
            const refreshToken = jwt.sign(payLoad, config.jwt.refreshTokenSecret, { expiresIn: config.jwt.refreshTokenExpiry });
            console.log("tokens", accessToken, refreshToken)
            return { accessToken, refreshToken };
        }
        console.log("new: ", payLoad)
        const accessToken = jwt.sign({ userId: payLoad.userId }, config.jwt.accessTokenSecret, { expiresIn: config.jwt.accessTokenExpiry });
        console.log("new cretd acccss")
        return (accessToken);
    }
    static verifyAccessToken = (token) => {
        try {
            const decoded = jwt.verify(token, config.jwt.accessTokenSecret); //returnd err for expiry/error/any and payload obj if true
            return { valid: true, expired: false, decoded };
        } catch (error) {
            return { valid: false, expired: error.name === "TokenExpiredError", error }
        }
    }
    static verifyRefreshToken = (token) => {
        try {
            console.log("ref token sent: ", token)
            const decoded = jwt.verify(token, config.jwt.refreshTokenSecret); //returnd err for expiry/error/any and payload obj if true
            return { valid: true, expired: false, decoded };
        } catch (error) {
            return { valid: false, expired: error.name === "TokenExpiredError", error }
        }
    }
}
module.exports = AuthService;