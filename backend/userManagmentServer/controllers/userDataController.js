const userInteraction = require("../model/interaction");
const user = require("../model/user")

const getUser = async (req, res) => {
    try {
        const { userId } = req.user;
        const username = req.query.username;
        const userData = await userInteraction.findUser(userId, username);
        if (!userData) throw error;
        return res.status(200).json({ userData: userData.rows });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
const getSelf = async (req, res) => {
    try {
        const username = req.user?.username;
        const userData = await userInteraction.findSelf(username);
        if (!userData) throw error;
        return res.status(200).json({ userData: userData.rows });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
const getPosts = async (req, res) => {
    try {
        const username = req.query.username;
        const userIdResponse = await user.findUserdataByUsername(username);
        const userId = userIdResponse.rows[0].user_id;
        const page = parseInt(req.query.page);
        const limit = 5;
        const nextPage = page + 1

        const offset = (page - 1) * limit;
        const userPosts = await userInteraction.findPost(userId, offset, limit);
        if (!userPosts) throw error;
        return res.status(200).json({ userPosts: userPosts.rows, nextPage });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
const getFeed = async (req, res) => {
    try {
        const { userId } = req.user;
        const page = parseInt(req.query.page);
        const limit = 1;
        const nextPage = page + 1
        const offset = (page - 1) * limit;

        const userPosts = await userInteraction.fetchFeed(userId, limit, offset);
        if (!userPosts) throw error;
        return res.status(200).json({ userPosts: userPosts.rows, nextPage });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
const createPost = async (req, res) => {
    try {
        const { userId, username } = req.user;
        const { content, name } = req.body;
        console.log(content)
        const addedPost = await userInteraction.createPost(userId, content, username, name);
        res.status(200).json({ message: "posted", addedPost })
    } catch (error) {
        res.status(500).json({ error: "internal server error" })
    }
}
const insertLike = async (req, res) => {
    try {
        const { userId } = req.user;
        const { messageId } = req.body;
        const result = await userInteraction.insertLike(userId, messageId);
        res.status(200).json({ likedPost: result.rows, message: "post added" })
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}
const deleteLike = async (req, res) => {
    try {
        const { userId } = req.user;
        const { messageId } = req.body;
        const result = await userInteraction.deleteLike(userId, messageId);
        res.status(200).json({ deletedPost: result.rows, message: "like deleted" })
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}
const putFollow = async (req, res) => {
    try {
        const { userId } = req.user;
        const toUser = req.query.user;

        const result = await userInteraction.putFollowAndUpdate(userId, toUser);
        res.status(200).json({ followed: result.rows, message: "successfully followed" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "yo internal server error" })
    }
}
const deleteFollow = async (req, res) => {
    try {
        const { userId } = req.user;
        const toUser = req.query.user;
        console.log(userId, toUser, " at delete follow")
        const result = await userInteraction.deleteFollowAndUpdate(userId, toUser);
        res.status(200).json({ unFollowed: result.rows, message: "successfully un-followed" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "haha internal server error" })
    }
}

module.exports = { getUser, getSelf, getPosts, createPost, getFeed, insertLike, deleteLike, putFollow, deleteFollow };