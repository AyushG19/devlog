const { pool } = require("../config/config")
const queries = {
    findUserByUsername: "SELECT * FROM user_info WHERE username = $1",
    findPostByUserId: "SELECT * FROM user_posts WHERE username = $1",
    createPost: "INSERT INTO tweet_table (user_id,content) VALUES ($1,$2) RETURNING *"
}
const userInteraction = {
    findUser: async (username) => {
        await pool.query(queries.findUserByUsername, [username]);
    },
    findPost: async (userId) => {
        await pool.query(queries.findPostByUserId, [userId]);
    },
    createPost: async (content, userId) => {
        console.log(userId," and ",content)
        return await pool.query(queries.createPost,[userId,content]);
    }
}

module.exports = userInteraction;