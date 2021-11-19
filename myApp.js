var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

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
  res.json(obj)
})

module.exports = app;
