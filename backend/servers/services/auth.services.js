require("dotenv").config();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config")

class AuthService {
    static generateHashedPass = async (password) => {
        return await bcrypt.hash(password, 10);
    }
    static checkPass = async (password, hashedPass) => {
        return await bcrypt.compare(password, hashedPass);
    }
    static generateTokens = (tokentype, username) => {
        if (tokentype === "all") {
            const accessToken = jwt.sign({ username }, config.jwt.accessTokenSecret, { expiresIn: config.jwt.accessTokenExpiry });
            const refreshToken = jwt.sign({ username }, config.jwt.refreshTokenSecret, { expiresIn: config.jwt.accessTokenExpiry });
            return { accessToken, refreshToken };
        }else{
            const accessToken = jwt.sign({ username }, config.jwt.accessTokenSecret, { expiresIn: config.jwt.accessTokenExpiry });
            return accessToken;
        }


        
    }
    static verifyAccessToken = (token) => {
        return jwt.verify(token, config.accessTokenSecret); //returnd err for expiry/error/any and payload obj if true
    }
    static verifyRefreshToken = (token) => {
        return jwt.verify(token, config.refreshTokenSecret); //returnd err for expiry/error/any and payload obj if true
    }
}
module.exports = AuthService;