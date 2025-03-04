const userInteraction = require("../model/interaction");

const getUser = async (req, res) => {
    try {
        const { username } = req.user;
        const userData = await userInteraction.findUser(username);
        if (!userData) throw error;
        return res.status(200).json({ userData });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
const getPosts = async (req, res) => {
    try {
        const { userId } = req.user;
        const userPosts = await userInteraction.findPost(userId);
        if (!userPosts) throw error;
        return res.status(200).json({ userPosts });
    } catch (error) {
        return res.status(500).json({ message: "internal server error" });
    }
}
const createPost = async (req, res) => {
    try {
        const { userId } = req.user;
        const { content } = req.body;
        console.log(content)
        const addedPost = await userInteraction.createPost(content, userId);
        res.status(200).json({message:"posted",addedPost})
    } catch (error) {
        res.status(500).json({error:"internal server error"})
    }
}

module.exports = { getUser, getPosts, createPost };