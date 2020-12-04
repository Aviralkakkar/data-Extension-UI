
const express = require("express");
const app = express();
var http = require('http');
var fs = require('fs');

let port = process.env.PORT || 3000;

fs.readFile('./public/index.html', function (err, html) {

  if (err) throw err;    

  http.createServer(function(request, response) {  
      response.writeHeader(200, {"Content-Type": "text/html"});  
      response.write(html);  
      response.end();  
  }).listen(port);
});

//app.get("/", (req,res) => {
 //   res.send("Hello World");
//});

//app.listen(port, () => {
//    console.log('Example app is listening on port http://localhost:${port}');
//});