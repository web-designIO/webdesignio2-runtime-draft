var express = require('express');

var app = module.exports = express();
var assets = require('connect-assets');

app.set('view engine', 'jade');
app.set('views', `${__dirname}/views`);

app.use(assets({
  paths: [
    `${__dirname}/assets/javascripts`,
    `${__dirname}/assets/stylesheets`
  ],
  helperContext: app.locals
}));
app.use('/admin', require('./admin'));
app.use(require('./website'));
app.use(express.static('public'));
