const userDataRouter = require("express").Router();
const { getUser, getPosts, createPost } = require("../controllers/userDataController");
const validateToken = require("../middleware/validateToken")

userDataRouter.get("/profile", validateToken, getUser);
userDataRouter.get("/get-posts", validateToken, getPosts);
userDataRouter.post("/post", validateToken, createPost);

module.exports = userDataRouter;