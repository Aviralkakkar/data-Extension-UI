'use strict';

const express = require("express");
const app = express();
const path = require('path');
var http = require('http');
const fs = require('fs');
const port = process.env.PORT || 3000
var request = require('request');
const session = require('express-session') 
//var jade = require('jade');
//var http = require("http");
//var routes = require('./routes');

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
       const ind2=path.join(__dirname, 'public', 'SFMC-DE.html');
       res.sendFile(ind2);
       console.log("Access"+body.access_token);
       console.log("response" + response);

       module.exports = accTok ;

                      // Session Setup 
         //           app.use(session({ 
                      
                      // It holds the secret key for session 
         //             secret: body.access_token, 
                      

                      // Forces the session to be saved 
                      // back to the session store 
         //             resave: true, 

                      // Forces a session that is "uninitialized" 
                      // to be saved to the store 
         //             saveUninitialized: true
         //           })) 

         //           app.get("/", function(req, res){ 
       
         //             // req.session.key = value 
         //             req.session.name = 'Access Token'
         //             return res.send("Session Set") 
         //         }) 


         //           app.get("/session", function(req, res){ 
         //           var sec = secret
         //           console.log(sec);
        //            var name = req.session.name 
         //           return res.send(name) 
                   
                    /*  To destroy session you can use 
                        this function  
                     req.session.destroy(function(error){ 
                        console.log("Session Destroyed") 
                    }) 
                    */
        //        }) 
                  
        


      });
  //    app.get('/', routes.activity );
  //    app.post('/login', routes.login );
  // console.log("yeh account token hai : " + accTok);
  // res.send(accTok);   

})


app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});


