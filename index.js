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
  const clientId = req.body.clientId
  const clientSec = req.body.clientSecret
  const authUrl = req.body.authenticationBaseURI
  console.log("ClientId is : " +  clientId);
  console.log("ClientSec is : " +  clientSec);
  console.log("AuthURL is : " +  authUrl);
      res.send(clientId);
      res.send(clientSec);
      res.send(authUrl);
  res.end()
})
console.log("Yahan bahar bhi access hopaarha hai clientId" + clientId);
app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});