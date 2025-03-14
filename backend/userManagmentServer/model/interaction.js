const { pool } = require("../config/config")
const queries = {
    findUserByUsername: "SELECT * FROM profile_info WHERE username = $1",
    findPostByUserId: "SELECT * FROM tweet_table WHERE user_id = $1 OFFSET $2 LIMIT $3",
    createPost: "INSERT INTO tweet_table (user_id,content) VALUES ($1,$2) RETURNING *"
}
const userInteraction = {
    findUser: async (username) => {
        console.log("username; ", username)
        return await pool.query(queries.findUserByUsername, [username]);
    },
    findPost: async (userId, offset, limit) => {
        return await pool.query(queries.findPostByUserId, [userId, offset, limit]);
    },
    createPost: async (content, userId) => {
        console.log(userId, " and ", content)
        return await pool.query(queries.createPost, [userId, content]);
    }
}

module.exports = userInteraction;