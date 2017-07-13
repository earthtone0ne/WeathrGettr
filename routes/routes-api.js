var router = require('express').Router();
var keys = require('../keys');
var request = require('request');

router.get('/getWeather', function (req, res) {
  let url = `http://api.openweathermap.org/data/2.5/weather?lat=${req.query.lat}&lon=${req.query.lon}&units=${req.query.units}&APPID=${keys.OWM}`;
  console.log(url);
  request(url, function (err,resp,body) {
    res.setHeader('Content-Type', 'application/json');
    res.send(body)
  })
});

router.get('/getPlaceName', function (req, res) {
  var url = `https://www.mapquestapi.com/geocoding/v1/reverse?location=${req.query.lat},${req.query.lon}&key=${keys.MQ}&thumbMaps=false`;
  console.log(url);
  request(url, function (err,resp,body) {
    res.setHeader('Content-Type', 'application/json');
    res.send(body)
  })
});
module.exports = router;
