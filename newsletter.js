//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

//for getting static files like css or images
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended : true}));

app.get("/",function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.firstName;
  var lastName = req.body.lastName;
  var email = req.body.email;

    console.log(firstName);
    console.log(lastName);
    console.log(email);

    var data = {
      members : [
        {
        email_address : email,
        status : 'subscribed',
        merge_fields : {
            FNAME : firstName,
            LNAME : lastName
          }
      }
      ]
    };
    var jsonData = JSON.stringify(data);

    var options = {
      url:'https://us13.api.mailchimp.com/3.0/lists/e450ebcd2f',
      method : 'POST',
      headers : {
        'Authorization' : 'saifsadi b5167b26b79cd1173d23e3935116fc47-us13'
      },
      body : jsonData
    };

    request(options, function(err, response, body){
      if(err){
        console.log(err);
      } else {
        console.log(response.statusCode);
      }

    });

});

//API Key
//b5167b26b79cd1173d23e3935116fc47-us13

//List Id
//e450ebcd2f

app.listen(3000, function(){
  console.log("Server is running on port http://localhost:3000");
});
