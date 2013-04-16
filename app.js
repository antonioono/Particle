var express = require('express'),
    app = express();
    
app.use(express.static(__dirname + '/static'));
    
app.get('/', function(req, res){
    res.send('test');
});

app.listen(8888);