const userDataRouter = require("express").Router();
const { getUser, getPosts, createPost, getFeed, insertLike, deleteLike } = require("../controllers/userDataController");
const validateToken = require("../middleware/validateToken")

userDataRouter.get("/profile", validateToken, getUser);
userDataRouter.get("/get-posts", validateToken, getPosts);
userDataRouter.get("/get-feed", validateToken, getFeed);
userDataRouter.post("/post", validateToken, createPost);
userDataRouter.post("/like", validateToken, insertLike);
userDataRouter.post("/unlike", validateToken, deleteLike);


module.exports = userDataRouter;