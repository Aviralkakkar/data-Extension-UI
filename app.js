const express = require("express");
const app = express();
let port = process.env.PORT || 3000;

const importData = require("./public/index.html");

app.get("/", (req,res) => {
    res.send("importData");
});

app.listen(port, () => {
    console.log('Example app is listening on port http://localhost:${port}');
});