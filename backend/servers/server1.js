const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    return res.json("nice")
});

app.listen(3000, () => {
    console.log("listening to port 3000")
})