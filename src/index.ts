import express from "express";
import middleware = require("./middleware");

const app = express();
app.use(express.json());
app.use(middleware.middleware);

app.get("/user", (req, res) => {
    res.send({
        name: "Tejas p",
        age: 25,
    });
});

app.post("/user", (req, res) => {
    const user = req.body;
    res.send({
        ...user,
        id: 1,
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});