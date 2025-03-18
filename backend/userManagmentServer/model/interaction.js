const { pool } = require("../config/config")
const queries = {
    findUserByUsername:
        `SELECT p.*, 
        CASE 
            WHEN f.follower_id IS NOT NULL THEN TRUE 
            ELSE FALSE 
        END AS isfollowing
        FROM profile_info p 
        LEFT JOIN follow_table f 
        ON p.user_id = f.following_id 
        AND f.follower_id = $1
        WHERE p.username = $2
        `
    ,
    findSelfByUsername:
        "SELECT * FROM profile_info WHERE username = $1"
    ,
    findPostByUserId:
        `SELECT m.message_id, m.user_id, m.username,
    m.name, m.content, m.like_count, m.comment_count,
    m.created_at, m.updated_at, m.media_url,
    CASE
        WHEN l.user_id IS NOT NULL THEN TRUE
        ELSE FALSE 
    END AS isliked
    FROM message_posts m 
    LEFT JOIN likes_table l
        ON m.message_id = l.message_id
        AND l.user_id = $1
    WHERE m.user_id = $1 
    ORDER BY m.created_at DESC 
    LIMIT $2 OFFSET $3;
    `
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
    ,
    putFollow:
        "INSERT INTO follow_table (follower_id,following_id) VALUES ($1,$2) RETURNING *"
    ,
    deleteFollow:
        "DELETE FROM follow_table WHERE follower_id = $1 AND following_id = $2 RETURNING *"
    ,
    updateFollowerCount:
        "UPDATE profile_info SET followers_count = followers_count + $1 WHERE user_id = $2"
    ,
    updateFollowingCount:
        "UPDATE profile_info SET following_count = following_count + $1 WHERE user_id = $2"
}
const userInteraction = {
    findUser: async (userId, username) => {
        console.log("username; ", username)
        return await pool.query(queries.findUserByUsername, [userId, username]);
    },
    findSelf: async (username) => {
        return await pool.query(queries.findSelfByUsername, [username]);
    }
    ,
    findUserId: async (username) => {
        return await pool.query(queries.findUserIdByUsername, [username])
    },
    findPost: async (userId, offset, limit) => {
        return await pool.query(queries.findPostByUserId, [userId, limit, offset]);
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
    },
    putFollowAndUpdate: async (followerId, followingId) => {
        const client = await pool.connect();
        try {
            await client.query("BEGIN")
            const insertedFollow = await client.query(queries.putFollow, [followerId, followingId]);
            await client.query(queries.updateFollowerCount, [+1, followingId]);
            await client.query(queries.updateFollowingCount, [+1, followerId]);
            await client.query("COMMIT");
            return insertedFollow.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release()
        }
    },
    deleteFollowAndUpdate: async (followerId, followingId) => {
        const client = await pool.connect();
        try {
            await client.query("BEGIN")
            const deletedFollow = await client.query(queries.deleteFollow, [followerId, followingId]);
            await client.query(queries.updateFollowerCount, [-1, followingId]);
            await client.query(queries.updateFollowingCount, [-1, followerId]);
            await client.query("COMMIT");
            return deletedFollow.rows[0];
        } catch (error) {
            await client.query("ROLLBACK");
            throw error;
        } finally {
            client.release()
        }
    }
}


module.exports = userInteraction;