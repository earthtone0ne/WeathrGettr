var express = require ('express');
var app = express();
// var bodyParser = require('body-parser');

app.listen(3333,function(){
  console.log('Listening on ', this.address().port);
});

app.get('/', function (req, res, next) {
    console.log('get /', res.statusCode);
    next();
});
