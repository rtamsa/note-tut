const bodyParser = require('body-parser');
var express = require('express');
require('dotenv').config();
var app = express();
const mongoose = require('mongoose');

mongoose.connect( process.env['MONGO_URI'], { useNewUrlParser: true, useUnifiedTopology: true });

app.use(function(req, res, next) {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
})

app.use('/public', express.static(__dirname + '/public'));
app.use('/name', bodyParser.urlencoded({extended: false}));

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

app.get('/now', ( req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.send({time: req.time});
})

app.get('/:word/echo', (req, res) => {
  res.send({echo: req.params.word})
})

app.get('/name', (req, res) => {
  res.send({name: req.query.first + ' ' + req.query.last})
})

app.post('/name', (req, res) => {
  res.send({name: req.body.first + ' ' + req.body.last});
})

module.exports = app;
