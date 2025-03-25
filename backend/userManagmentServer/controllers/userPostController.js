const userInteraction = require("../model/interaction");

const getComment = (req, res) => {
    try {
        const { userId } = req.user;
        const { post, page } = req.query;
        const limit = 3;
        const offset = (page - 1) * limit;

        const comments = userInteraction.getComments(post, limit, offset, userId);
        res.status(200).json({ comments })
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}
const postComment = (req, res) => {
    try {
        const { userId } = req.user;
        const { content, postId } = req.body;

        const comments = userInteraction.postComment(content, userId, postId);
        res.status(200).json({ comments, message: "posted" })
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = { getComment, postComment }