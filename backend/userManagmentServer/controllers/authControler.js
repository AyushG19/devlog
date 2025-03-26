const AuthService = require('../services/auth.services');
const user = require('../model/user')
const { config } = require("../config/config")

const refreshExpiredToken = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;  //called short-circuit evaluation
        if (!refreshToken) return res.status(403).send("refresh token expired");

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
        console.log(isUser.rows.length)
        if (isUser.rows.length > 0) {
            console.log("should return 400 ")
            return res.status(400).json({ message: "username alredy exists" });
        }
        console.log("should return 400 ")

        const hashedPassword = await AuthService.generateHashedPass(password);
        console.log("passed pass")
        const result = await user.createUser(username, hashedPassword);
        console.log("signup result; ", result)
        return res.status(200).json({ message: "successfully signed up" })
    } catch (error) {
        return res.status(500).json(error);
    }
}

const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log("Attempting login for:", username);

        const isUser = await user.findUserdataByUsername(username);

        // Add proper null checks
        if (!isUser || !isUser.rows || isUser.rows.length === 0) {
            console.log("User not found");
            return res.status(404).json({
                message: "User not found",
                success: false
            });
        }

        const passwordMatch = await AuthService.checkPass(password, isUser.rows[0].password);
        if (!passwordMatch) {
            console.log("Invalid password");
            return res.status(401).json({
                message: "Invalid credentials",
                success: false
            });
        }

        const userId = isUser.rows[0].user_id;
        const profileInfo = await user.findProfileInfoByUserId(userId);
        const { accessToken, refreshToken } = AuthService.generateTokens("all", { username, userId });

        return res
            .cookie("refreshToken", refreshToken, config.cookie)
            .status(200)
            .json({
                userData: profileInfo.rows[0],
                accessToken,
                success: true
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};

module.exports = {
    refreshExpiredToken,
    createUser,
    loginUser,
}