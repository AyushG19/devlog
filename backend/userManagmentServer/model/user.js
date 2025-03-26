const { pool } = require("../config/config")
const queries = {
    createUser: "INSERT INTO user_credentials (username,password) VALUES ($1,$2)",
    searchUserByUsername: "SELECT * FROM user_credentials WHERE username = $1",
    searchProfileInfoByUserId: "SELECT * FROM profile_info WHERE user_id = $1",
    insertIndIntoProfileInfo: "INSERT INTO profile_info () VALUES ($2)",
    insertIntoProfileInfo: "INSERT INTO profile_info ($1) VALUES ($2)"

};

const user = {
    findUserdataByUsername: async (username) => {
        console.log("user ke andar: ", username)
        const data = await pool.query(queries.searchUserByUsername, [username])
        console.log(data);
        return data;
    },
    createUser: async (username, hashedPass) => {
        console.log(typeof username, typeof hashedPass)
        return await pool.query(queries.createUser, [username, hashedPass])
    },
    findProfileInfoByUserId: async (userId) => {
        return await pool.query(queries.searchProfileInfoByUserId, [userId])
    },
    insertIntoProfileInfo: async (dataName, dataValue) => {
        return await pool.query(queries.insertIntoProfileInfo, [dataName, dataValue])
    },
}
module.exports = user;