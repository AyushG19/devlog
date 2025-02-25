const queries = {
    createUser : "INSERT INTO user_info (username,password) VALUES ($1,$2)",
    insertValueToUser : "INSERT INTO user_info ($1) VALUES ($2)",
    searchUserByUsername : "SELECT * FROM user_info WHERE username = $1",
};

module.exports = queries;