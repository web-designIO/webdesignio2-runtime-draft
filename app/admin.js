var express = require('express');

var controllers = require('./controllers/admin');

var router = module.exports = express.Router();

router.use(function(req, res, done) {
  res.locals.req = req;
  done();
});
router.get('/', function(req, res) { res.redirect(`${req.baseUrl}/dashboard`); });
router.get('/websites', controllers.websites.index);
router.get('/dashboard', controllers.dashboard.index);
