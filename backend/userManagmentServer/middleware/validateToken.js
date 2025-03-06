const AuthService = require("../services/auth.services")

const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const accessToken = authHeader && authHeader.split(" ")[1];
        console.log("validating with actoken : ", accessToken)
        if (!accessToken) return res.status(401).json({ message: "access token requires" })
        console.log("header: ", authHeader, " ,accesstoken hai : ")
        const result = AuthService.verifyAccessToken(accessToken);
        console.log("result in validate : ", result)
        if (!result.valid) {
            if (result.expired) {
                return res.status(401).json({ message: result.error.message })
            }
            throw result.error
        }

        req.user = result.decoded;
        next();
    } catch (error) {
        res.status(403).json({ error });
    }

}

module.exports = validateToken;