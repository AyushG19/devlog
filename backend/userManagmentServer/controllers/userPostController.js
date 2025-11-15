const userInteraction = require("../model/interaction");

const getComment = async (req, res) => {
    try {
        const { userId } = req.user;
        const post = parseInt(req.query.post);
        const page = parseInt(req.query.page);


        console.log(post, page);
        const limit = 3;
        const offset = (page - 1) * limit;
        let nextPage = page + 1;

        const comments = await userInteraction.getComment(post, limit, offset, userId);
        console.log(comments.rows)
        if (comments.rowCount < 1) nextPage = undefined;
        res.status(200).json({ comments: comments.rows, nextPage })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal server error" })
    }
}
const postComment = async (req, res) => {
    try {
        const { userId } = req.user;
        const { content, postId } = req.body;

        const result = await userInteraction.postComment(content, userId, postId);
        console.log(result)
        res.status(200).json({ comment: result.rows[0], message: "posted" })
    } catch (error) {
        res.status(500).json({ message: "internal server error" })
    }
}

module.exports = { getComment, postComment }