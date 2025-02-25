const express = require("express");
const cors = require("cors");
const queries = require("./db/queries");
const cookieParser = require("cookie-parser");
const validateRequest = require("./middleware/validateRequest");
const userPool = require("./db/user_info");
const AuthService = require("./services/auth.services");
const config = require("./config/config");

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());

app.post('/refresh-token', async (req, res) => {
    try {
        const authHeader = req.cookies.authorization;
        const refreshToken = authHeader && authHeader.split(" ")[1];  //called short-circuit evaluation
        if (!refreshToken) return res.status(403).send("refresh token expired");

        const data = AuthService.verifyRefreshToken(refreshToken);
        const newAccessToken = AuthService.generateTokens("", data.username);    //empty parameter to only regenerate access token
        return res.status(200).json({ newAccessToken });
    } catch (error) {
        return res.status(403).send(`error:${error.name}`);
    }
})

app.post('/signup', validateRequest, async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUser = await userPool.query(queries.searchUserByUsername, [username]);
        if (isUser.rows.length > 0) return res.status(400).send("username alredy exists");

        const hashedPassword = await AuthService.generateHashedPass(password);
        await userPool.query(queries.createUser, [username, hashedPassword]);
        return res.status(200).send("successfully signed up")
    } catch (error) {
        return res.status(500).send("internal server error");
    }
});
app.post('/login', validateRequest, async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUser = await userPool.query(queries.searchUserByUsername, [username]);
        if (isUser.rows.length == 0) return res.status(400).send("user dosen't exist");

        if (await AuthService.checkPass(password, isUser.rows[0].password)) {
            console.log("inside if")
            const { accessToken, refreshToken } = AuthService.generateTokens("all", username);
            return res.cookie("refreshToken", refreshToken, config.cookie).json({ accessToken });
        } else {
            return res.status(400).send("invalid credentials");
        }
    } catch (error) {
        return res.status(500).send("internal server error");
    }
})
app.listen(4000, () => {
    console.log("listening to port 4000");
})