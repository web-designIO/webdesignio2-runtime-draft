var mongoose = require('mongoose');
var errors = require('http-errors');

var User = mongoose.model('User');

exports.index = function(req, res, done) {
  User.find(function(err, users) {
    if (err != null) { done(err); return; }
    res.render('admin/users/index', { users: users });
  });
};

exports.new = function(req, res) {
  var user = new User();
  res.render('admin/users/new', { user: user });
};

exports.create = function(req, res, done) {
  var user = new User(req.body.user || {});
  user.save(function(err, user) {
    if (err) {
      if (err.name === 'ValidationError') {
        res.render('admin/users/new', { user: user });
      } else {
        done(err);
      }
    } else {
      req.flash('notice', 'User successfully saved');
      res.redirect(`${req.baseUrl}/users/${user._id}/edit`);
    }
  });
};

exports.edit = function(req, res, done) {
  User.findById(req.params.id, function(err, user) {
    if (err) { done(err); return; }
    if (user == null) { done(new errors.NotFound('User not found!')); return; }
    res.render('admin/users/edit', { user: user });
  });
};

exports.update = function(req, res, done) {
  User.findById(req.params.id, function(err, user) {
    if (err) { done(err); return; }
    if (user == null) { done(new errors.NotFound('User not found!')); return; }
    for (var key in (req.body.user || {})) {
      if (!req.body.user.hasOwnProperty(key)) { continue; }
      user[key] = req.body.user[key];
    }
    user.save(function(err, _user) {
      if (err) {
        if (err.name === 'ValidationError') {
          res.render('admin/users/edit', { user: user });
        } else {
          done(err);
        }
      } else {
        req.flash('notice', 'User successfully updated');
        res.redirect(`${req.baseUrl}/users/${_user._id}/edit`);
      }
    });
  });
};
