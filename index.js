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
       
       console.log("Access"+body.access_token);
       console.log("response" + response);

       var data='<s:Envelope xmlns:s="http://www.w3.org/2003/05/soap-envelope" xmlns:a="http://schemas.xmlsoap.org/ws/2004/08/addressing" xmlns:u="http://docs.oasis-open.org/wss/2004/01/oasis-200401-wss-wssecurity-utility-1.0.xsd"><s:Header><a:Actions:mustUnderstand="1">Retrieve</a:Action><a:MessageID>urn:uuid:7e0cca04-57bd-4481-864c-6ea8039d2ea0</a:MessageID><a:ReplyTo>       <a:Address>http://schemas.xmlsoap.org/ws/2004/08/addressing/role/anonymous</a:Address></a:ReplyTo><a:To s:mustUnderstand="1">https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx</a:To>      <fueloauth xmlns="http://exacttarget.com">'+body.access_token+'</fueloauth></s:Header><s:Body xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema">     <RetrieveRequestMsg xmlns="http://exacttarget.com/wsdl/partnerAPI"> <RetrieveRequest><ObjectType>DataExtension</ObjectType> <Properties>CustomerKey</Properties><Properties>Name</Properties><Properties>DataExtension.ObjectID</Properties> <Properties>IsSendable</Properties>  <Properties>CategoryID</Properties>  	<Filter xsi:type="SimpleFilterPart"> <Property>CategoryID</Property><SimpleOperator>equals</SimpleOperator><Value>29130</Value></Filter>    </RetrieveRequest> </RetrieveRequestMsg> </s:Body></s:Envelope>';
				data=JSON.stringify(data);
				request.post({
				headers: {
					'content-type': 'text/xml',
					'Authorization':'Bearer '+body.access_token,
				},
				url: 'https://mc6vgk-sxj9p08pqwxqz9hw9-4my.soap.marketingcloudapis.com/Service.asmx',
				body:data,
				json:true
				},function(error2,response2,body2){
					
					console.log('\nSOAP Body'+(body2));
					console.log('\nSOAP Error'+(error2));
					console.log('\nSOAP Response'+(response2));
					console.log('\nSOAP Body'+JSON.stringify(body2));
					console.log('\nSOAP Error'+JSON.stringify(error2));
					console.log('\nSOAP Response'+JSON.stringify(response2));
					
				})
			
				const ind2 = path.join(__dirname, 'public', 'SFMC-DE.html');
				res.sendFile(ind2);
				console.log("Access" + body.access_token);
				console.log("response" + response);
				console.log(clientSec);
				//  res.send(clientSec);   
      

    //   if(accTok == null && accTok == "undefined" )
    //   {
         
    //    alert ( "Oops, something went wrong!" )

       // swal ( "Oops" ,  "Authentication Failed!" ,  "error" )
    //   }
    //   else
    //   {
      //  const ind2=path.join(__dirname, 'public', 'SFMC-DE.html');
      // res.sendFile(ind2);
    //   }




      // module.exports = accTok ;

      // console.log("yeh export module hai : " + module.exports)

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
 //   res.redirect('/');

})


app.listen(port, () => {
   console.log('Example app is listening on port http://localhost:${port}');
});


