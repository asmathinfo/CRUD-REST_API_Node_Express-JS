const express = require("express");
const bodyPaser = require("body-parser");
var fs =require("fs");
const app = express();



app.use(bodyPaser.urlencoded({
    extended : true
}));



app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html");
});


app.post("/addUser",function(req,res){
    var username = req.body.username;
    var dob = req.body.dob;
    var profession = req.body.profession;
    var obj = {};
    var key = req.body.userid;
    var newuser = {
      "name" : username,
      "dob" : dob,
      "profession" : profession
    }
    obj[key] = newuser;
  
    fs.readFile("users.json","utf8",function(err,data){
      data = JSON.parse(data);
      data[key] = obj[key];
      console.log(data);
      var updateuser = JSON.stringify(data);
      fs.writeFile("users.json",updateuser,function(err)
      {
        res.end( JSON.stringify(data));
      });
    });
  });


app.listen(3000, function () {
    console.log("Express server listening on port 8000");
    });