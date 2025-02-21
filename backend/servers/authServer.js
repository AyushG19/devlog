const express = require("express");
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const userPool = require('./db/user_info');

const app = express();

app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.post("/signup",async (req, res) => {
    const { username, password } = req.body;
    const hashedPass = await bcrypt.hash(password, 10);
    try {
        await userPool.query("INSERT INTO user_info(username,password) values ($1,$2)",[username,hashedPass]);
    } catch (error) {
        console.log(error)
        return res.status(500).send("internal server error");
    }
    return res.status(200).send("signup successful")
});

app.post("/login",async(req,res)=>{
    const {username,password} = req.body;
    const isUser = await userPool.query("SELECT * FROM user_info WHERE usernmame=$1",[username]);
    if(isUser.rows.length == 0) return res.status(403).send("username not found");
    const db_pass = isUser.rows[0].password;
    const isValid = bcrypt.compare(password,db_pass);
    if(!isValid) return res.status(403).send("password did not match");
    const accessToken = jwt.sign({username},process)
})
app.listen(4000,()=>{
    console.log("listening to port 4000");
})