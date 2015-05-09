var express = require('express');

var app = module.exports = express();

app.set('view engine', 'jade');
app.set('views', `${__dirname}/views`);

app.use('/admin', require('./admin'));
app.use(require('./website'));
