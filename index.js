const express = require("express");
const app = express();
const path = require('path');
var http = require('http');
const fs = require('fs')
const port = process.env.PORT || 3000
var request = require('request');

app.get("*", (req,res) => {
      const ind=path.join(__dirname, 'public', 'index.html');
    res.sendFile(ind);
});
app.use(express.urlencoded({
  extended: true
}))

app.post('/PostData', (req, res) => {
  
    const clientSec = req.body.clientSecret
  
  
request.post({
  headers: {'content-type' : 'application/json'},
  url:     req.body.authenticationBaseURI,
  body:    {
 'client_id': req.body.clientId, //pass Client ID
        'client_secret': req.body.clientSecret, //pass Client Secret
        'grant_type': 'client_credentials',
           'account_id':req.body.MID
},
     json: true
}, function(error, response, body){
  console.log("Access"+body.access_token);
     console.log("response"+response);
});
      
  console.log(clientSec);
  res.send(clientSec);     
  res.end()
})

app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});