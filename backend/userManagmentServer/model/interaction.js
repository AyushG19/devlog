const { pool } = require("../config/config")
const queries = {
    findUserByUsername:
        "SELECT * FROM profile_info WHERE username = $1"
    ,
    findPostByUserId:
        "SELECT * FROM message_posts WHERE user_id = $1 ORDER BY message_id DESC OFFSET $2 LIMIT $3"
    ,
    createPost:
        "INSERT INTO message_posts (user_id,content,username,name) VALUES ($1,$2,$3,$4) RETURNING *"
    ,
    fetchFeed:
        `SELECT m.message_id, m.user_id, m.username,
    m.name, m.content, m.like_count, m.comment_count,
    m.created_at, m.updated_at, m.media_url,
    CASE
        WHEN l.user_id IS NOT NULL THEN TRUE
        ELSE FALSE 
    END AS isLiked
    FROM message_posts m 
    LEFT JOIN likes_table l
        ON m.message_id = l.message_id
        AND l.user_id = $1
    ORDER BY m.created_at DESC LIMIT $2 OFFSET $3 `
    ,
    addLike:
        "INSERT INTO likes_table (user_id,message_id) values ($1,$2)"
    ,
    deleteLike:
        "DELETE FROM likes_table WHERE user_id = $1 AND message_id = $2"
}
const userInteraction = {
    findUser: async (username) => {
        console.log("username; ", username)
        return await pool.query(queries.findUserByUsername, [username]);
    },
    findPost: async (userId, offset, limit) => {
        return await pool.query(queries.findPostByUserId, [userId, offset, limit]);
    },
    createPost: async (userId, content, username, name) => {
        console.log(userId, " and ", content)
        return await pool.query(queries.createPost, [userId, content, username, name]);
    },
    fetchFeed: async (userId, limit, offset) => {
        return await pool.query(queries.fetchFeed, [userId, limit, offset])
    },
    insertLike: async (userId, messageId) => {
        return await pool.query(queries.addLike, [userId, messageId])
    },
    deleteLike: async (userId, messageId) => {
        return await pool.query(queries.deleteLike, [userId, messageId])
    }
}


module.exports = userInteraction;