var express = require('express'),
    app = express();
    
app.get('/', function(req, res){
    res.send('test');
});

app.listen(8888);