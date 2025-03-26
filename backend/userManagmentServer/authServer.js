require('dotenv').config({ path: `.env.${process.env.NODE_ENV || "development"}` })
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/userAuth.js");
const userDataRouter = require("./routes/userData.js");
const userPostRouter = require("./routes/userPostRouter.js")


const app = express();
console.log(process.env.DBUSER)

app.use(cors({
    origin: ["http://localhost:5173", "http://192.168.29.232:5173"],
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userDataRouter)
app.use("/api/post", userPostRouter)


app.listen(4000, () => {
    console.log("listening to port 4000");
})