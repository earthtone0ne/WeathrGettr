var express = require ('express');
var app = express();
// var request = require('request');
var bodyParser = require('body-parser');


app.listen(3333,function(){
  console.log('Listening on ', this.address().port);
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({
     extended: true
 }));

app.use('/api', require('./routes/routes-api'));

app.get('/', function (req, res) {
  console.log('get /', res.statusCode);
  res.sendFile('./public/index.html');
});
