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


const toto = {
    "id":"23", 
    "value":"titi", 
    "message":"hey"
};

app.use( (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
})
app.post("/", function(req, res){
    console.log(req.body); 
    res.json(req.body);
});

app.listen(3000, function(){
    console.log("Listening on port 3000"); 
})