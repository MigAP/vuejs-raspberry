let express = require("express"); 

let app = express(); 
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.use(logger("dev")); 
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser()); 


app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})

app.post("/", function(req, res){
    console.log(req.body); 
    res.send("The request has been treated");
});
app.post("/gpio", function(req, res){
    console.log(req.body); 
    res.send("The gpio request has been treated");
});
app.post("/pwm/soft", function(req, res){
    console.log(req.body); 
    res.send("The pwm soft request has been treated");
});
app.post("/pwm/hard", function(req, res){
    console.log(req.body); 
    res.send("The pwm hard request has been treated");
});

app.listen(3000, function(){
    console.log("Listening on port 3000"); 
})