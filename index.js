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
  console.log("clientSecret : "+req.body.clientSecret);
  console.log("clientId : "+req.body.clientSecret);
  console.log("authUrl : "+req.body.authenticationBaseURI);
  
  var accTok='';
      
request.post({
    headers: {'content-type' : 'application/json'},
    url:     'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.auth.marketingcloudapis.com/v2/token',
    body:    {
          'client_id': req.body.clientId, //pass Client ID
          'client_secret': req.body.clientSecret, //pass Client Secret
          'grant_type': 'client_credentials',
             'account_id':req.body.MID
},
     json: true
}, function(error, response, body){
      accTok+=body.access_token;
        const ind2=path.join(__dirname, 'public', 'SFMC-DE.html?accessToken='+accTok);
  res.sendFile(ind2);
  console.log("Access"+body.access_token);
     console.log("response"+response);
});
      
  console.log(clientSec);
//  res.send(clientSec);   

})

app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});