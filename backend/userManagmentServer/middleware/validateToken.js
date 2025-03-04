const AuthService = require("../services/auth.services")

const validateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization
        const accessToken = authHeader && authHeader.split(" ")[1];
        if (!accessToken) return res.status(401).json({ message: "access token requires" })
        console.log("header: ", authHeader, " ,accesstoken hai : ")
        const result = AuthService.verifyAccessToken(accessToken);
        if (!result.valid) {
            if (result.expired) {
                return res.status(401).json({ message: result.error.message })
            }
            else {
                throw result.error
            }
        }

        req.user = result.decoded;
        next();
    } catch (error) {
        res.status(403).json({ error });
    }

}

module.exports = validateToken;