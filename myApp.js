var express = require('express');
var fs = require('fs');
var path = require('path');
var app = express();

const MESSAGE_STYLE = process.env['MESSAGE_STYLE']

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
  if (MESSAGE_STYLE === 'uppercase') {
    obj['message'] = obj['message'].toUpperCase();
  }
  res.json(obj)
})

module.exports = app;
