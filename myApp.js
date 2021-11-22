var express = require('express');
require('dotenv').config();
var app = express();

app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
})

app.use('/public', express.static(__dirname + '/public'))

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/public', function(req, res) {
  let personals = fs.readdirSync(__dirname + '/public', [])
  res.send(JSON.stringify(personals));
});

app.get('/json', (req, res) => {
  let obj = {
    message: 'Hello json'
  }
  if ( process.env['MESSAGE_STYLE'] === 'uppercase') {
    obj['message'] = obj['message'].toUpperCase();
  }
  res.json(obj)
})

app.get('/now', function( req, res, next){
  req.time = new Date().toString();
  next();
}, function(req, res){
  res.send({time: req.time});
})

module.exports = app;
