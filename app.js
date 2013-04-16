var express = require('express'),
    fs = require('fs');

var app = express();
    
// app.use(express.static(__dirname + '/static'));

app.get("/static/:staticFilename", function (req, res) {
  res.sendfile("static/" + req.params.staticFilename);
});
    
app.get('/', function(req, res){
    res.send('test');
});

app.listen(8888);