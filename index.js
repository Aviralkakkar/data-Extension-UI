const express = require("express");
const app = express();
const path = require('path');
var http = require('http');
const fs = require('fs');
var errorhandler = require('errorhandler');
//var path        = require('path');
const request = require('request');
const port = process.env.PORT || 3000
app.use(bodyParser.json({type: 'application/json'})); 


app.get("*", (req,res) => {
      const ind=path.join(__dirname, 'public', 'index.html');
    res.sendFile(ind);
});
app.use(express.urlencoded({
  extended: true
}))

if ('development' == app.get('env')) {
    app.use(errorhandler());
  }

app.post('/PostData', (req, res) => {
  const clientId = req.body.clientId
  const clientSec = req.body.clientSecret
  const authUrl = req.body.authenticationBaseURI
  console.log("ClientId is : " +  clientId);
  console.log("ClientSec is : " +  clientSec);
  console.log("AuthURL is : " +  authUrl);
    //  res.send(clientId);
    //  res.send(clientSec);
    //  res.send(authUrl);
  

  var authEndpoint = req.body.authenticationBaseURI ;
  console.log("authEndpoint url is : " +  authUrl);

            const data = JSON.stringify({
                client_id: req.body.clientId, //pass Client ID
                client_secret: req.body.clientSecret, //pass Client Secret
                grant_type: "client_credentials"
            })

            const options = {
                hostname: authEndpoint,
                path: '/v2/token',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                 //   'Content-Length': data.length
                }
            }
            var accessToken = '';
            //var restURL = '';
            const requestForToken = http.request(options, res => {
                console.log(`statusCode: ${res.statusCode}`)
                var jsonString = '';
                res.on('data', d => {
                    jsonString += d;
                    process.stdout.write(d)
                })
                res.on('end', function() {
                    var resData = JSON.parse(jsonString);
                    accessToken += resData.access_token
                 //   restURL += resData.rest_instance_url
                    console.log(`Access Token : ` + accessToken); 
                //    console.log(`Rest URL Endpoint : ` + restURL);
                })
            })
            res.send(accessToken);
            res.end()
});
 
//app.listen(port, () => {
//   console.log('Example app is listening on port http://localhost:${port}');
//});
http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
  });