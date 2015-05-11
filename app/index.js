var express = require('express');
var session = require('express-session');
var lusca = require('lusca');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var bodyParser = require('body-parser');

var app = module.exports = express();
var assets = require('connect-assets');

require('./models');

app.set('view engine', 'jade');
app.set('views', `${__dirname}/views`);

app.use(assets({
  paths: [
    `${__dirname}/assets/javascripts`,
    `${__dirname}/assets/stylesheets`
  ],
  helperContext: app.locals
}));
app.use(cookieParser('keyboard cat'));
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('method-override')('_method'));

// Tighten security using paypals lusca.
app.use(lusca({
  csrf: true,
  csp: { 'default-src': "'self'" },
  xframe: 'SAMEORIGIN',
  p3p: 'ABCDEF',
  hsts: { maxAge: 31536000, includeSubDomains: true, preload: true },
  xssProtection: true
}));
app.use(flash());

app.use('/admin', require('./admin'));
app.use(require('./website'));
app.use(express.static('public'));

app.use(function(err, req, res, done) {
  if (res.statusCode != 200) { res.send(err.message); return; }
  if (err.statusCode != null) {
    res.status(err.statusCode).end(err.message);
  } else {
    done(err);
  }
});
