const { pool } = require("../config/config")
const queries = {
    createUser: "INSERT INTO user_info (username,password) VALUES ($1,$2) RETURNING *",
    insertValueToUser: "INSERT INTO user_info ($1) VALUES ($2)",
    searchUserByUsername: "SELECT * FROM user_info WHERE username = $1",
};

const user = {
    findUserdataByUsername: async (username) => {
        console.log("user ke andar")
        return await pool.query(queries.searchUserByUsername, [username])
    },
    createUser: async (username, hashedPass) => {
        return await pool.query(queries.createUser, [username, hashedPass])
    },
}
module.exports = user;