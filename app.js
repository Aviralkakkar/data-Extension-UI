const express = require("express");
const app = express();
//let port = process.env.PORT || 3000;


const importData = require("./public/index.html");

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json({type: 'application/json'})); 
//app.use(bodyParser.urlencoded({ extended: true }));

//app.use(express.methodOverride());
//app.use(express.favicon());

app.use(express.static(path.join(__dirname, 'public')));

app.get("/", (req,res) => {
    res.send("importData");
});

app.listen(port, () => {
    console.log('Example app is listening on port http://localhost:${port}');
});