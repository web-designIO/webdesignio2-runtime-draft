var express = require('express');

var controllers = require('./controllers/admin');

var router = module.exports = express.Router();

router.use(function(req, res, done) {
  res.locals.req = req;
  done();
});

router.use(function(req, res, done) {
  res.locals.alert = req.flash('alert');
  res.locals.notice = req.flash('notice');
  done();
});

router.get('/', function(req, res) { res.redirect(`${req.baseUrl}/dashboard`); });
router.get('/dashboard', controllers.dashboard.index);
router.get('/websites', controllers.websites.index);
router.get('/users', controllers.users.index);
router.get('/users/new', controllers.users.new);
router.post('/users', controllers.users.create);
router.get('/users/:id/edit', controllers.users.edit);
router.put('/users/:id', controllers.users.update);
