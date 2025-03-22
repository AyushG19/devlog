const userDataRouter = require("express").Router();
const {
    getUser,
    getSelf,
    getPosts,
    createPost,
    getFeed,
    insertLike,
    deleteLike,
    putFollow,
    deleteFollow,
    getToFollowSuggestion,
} = require("../controllers/userDataController");
const validateToken = require("../middleware/validateToken");

userDataRouter.get("/profile", validateToken, getUser);
userDataRouter.get("/self-profile", validateToken, getSelf);

userDataRouter.get("/get-posts", validateToken, getPosts);
userDataRouter.get("/get-feed", validateToken, getFeed);

userDataRouter.post("/post", validateToken, createPost);

userDataRouter.post("/like", validateToken, insertLike);
userDataRouter.post("/unlike", validateToken, deleteLike);

userDataRouter.put("/follow", validateToken, putFollow);
userDataRouter.delete("/follow", validateToken, deleteFollow);

userDataRouter.get("/get-people-suggestion", validateToken, getToFollowSuggestion)
module.exports = userDataRouter;