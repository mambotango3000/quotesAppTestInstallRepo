var express = require('express');
var path = require('path');
var quotes = require('./quotesController');
var app = express();
var rootPath = path.normalize(__dirname + '/../');
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static( rootPath + '/app'));

app.get('/data/quote/:ticker', quotes.get);
app.get('/data/quote', quotes.getAll);
//app.get('/data/gravatar', quotes.getGravatar);
app.post('/data/quote/:ticker', quotes.save);
app.delete('/data/quote/:ticker', quotes.delQuote);
//app.post('/data/gravatar', quotes.saveGravatar);
app.get('*', function(req, res) { res.sendFile(rootPath + '/app/index.html'); });


app.listen(8000);
console.log('Listening on port ' + 8000 + '...');