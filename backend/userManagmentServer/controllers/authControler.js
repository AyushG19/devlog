const AuthService = require('../services/auth.services');
const user = require('../model/user')
const { config } = require("../config/config")

const refreshExpiredToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;  //called short-circuit evaluation
        if (!refreshToken) return res.status(803).send("refresh token expired");

        console.log("check 1 in auth controller")
        const data = AuthService.verifyRefreshToken(refreshToken);

        if (!data.valid) {
            return res.status(403).json({ message: data.error.message })
        }

        console.log("data.decoded :", data.decoded.userId)
        const newAccessToken = AuthService.generateTokens("a", data.decoded);    //empty parameter to only regenerate access token
        console.log("new access token is :", newAccessToken)
        return res.status(200).json({ newAccessToken });
    } catch (error) {
        return res.status(700).json({ error });
    }
}

const createUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUser = await user.findUserdataByUsername(username);
        if (isUser.rows.length > 0) return res.status(400).json({ message: "username alredy exists" });

        const hashedPassword = await AuthService.generateHashedPass(password);
        const userData = await user.createUser(username, hashedPassword);
        return res.status(200).json({ message: "successfully signed up", userData })
    } catch (error) {
        return res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    console.log("Inside login")
    try {
        const { username, password } = req.body;
        console.log(username)
        const isUser = await user.findUserdataByUsername(username);
        console.log(isUser);
        if (isUser.rows.length == 0) return res.status(400).json({ message: "user dosen't exist" });

        if (await AuthService.checkPass(password, isUser.rows[0].password)) {
            console.log("inside if")
            const userId = isUser.rows[0].user_id;
            const { accessToken, refreshToken } = AuthService.generateTokens("all", { username, userId });
            console.log("accesstoken", accessToken)
            return res.cookie("refreshToken", refreshToken, config.cookie).json({ userData: isUser.rows[0], accessToken });
        } else {
            return res.status(400).json({ message: "invalid credentials" });
        }
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}

module.exports = {
    refreshExpiredToken,
    createUser,
    loginUser,
}