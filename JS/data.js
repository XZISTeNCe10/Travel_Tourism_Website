var mysql=require('mysql');
var express=require("express");
const bodyParser=require("body-parser");
const encoder=bodyParser.urlencoded();

const app=express();


var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"tourism"

});
app.use("/login.css",express.static(""));
con.connect(function(err){
    if(err)throw err;
    console.log("Connected!");
});

app.get("/",function(req,res){
    res.sendFile(__dirname+"/login.html");
});
app.post("/",encoder,function(req,res){
    var username=req.body.uname;
    var password=req.body.pass;
    con.query("SELECT * from userdata where username=? and password=?",[username,password],function(error,results,fields){
        if(error) throw error;
        if(results.length>0){
            res.redirect("/welcome");
        }
        else{
            res.redirect("/");
        }

    });

});
app.get("/welcome",function(req,res){
    res.sendFile(__dirname + "/welcome.html");
});

app.listen(8087,function(){
    console.log('App listening on port 8087');
});







