const userInteraction = require("../model/interaction");

const getUser = async (req, res) => {
    try {
        const { username } = req.user;
        const userData = await userInteraction.findUser(username);
        if (!userData) throw error;
        return res.status(200).json({ userData: userData.rows });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
const getPosts = async (req, res) => {
    try {
        const { userId } = req.user;
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


module.exports = { getUser, getPosts, createPost, getFeed, insertLike, deleteLike };