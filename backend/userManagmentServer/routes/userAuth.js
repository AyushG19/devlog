const authRoutes = require("express").Router();
const validateReq = require("../middleware/validateRequest")
const { refreshExpiredToken, createUser, loginUser, } = require("../controllers/authControler");

authRoutes.post("/login", validateReq, loginUser);
authRoutes.post("/signup", validateReq, createUser);
authRoutes.post("/refresh-token", refreshExpiredToken);

module.exports = authRoutes;