const userPostRouter = require("express").Router()

const validateToken = require("../middleware/validateToken");

const { getComment, postComment } = require("../controllers/userPostController.js")

userPostRouter.get("/comment", validateToken, getComment);
userPostRouter.post("/comment", validateToken, postComment);

module.exports = userPostRouter;