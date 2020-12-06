const express = require("express");
const app = express();
const path = require('path');
var http = require('http');
const fs = require('fs')
const port = process.env.PORT || 3000


app.get("*", (req,res) => {
      const ind=path.join(__dirname, 'public', 'index.html');
    res.sendFile(ind);
});
app.use(express.urlencoded({
  extended: true
}))

app.post('/PostData', (req, res) => {
  const clientSec = req.body.clientSecret
  console.log(clientSec);
      res.send(clientSec);
  res.end()
})
app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});