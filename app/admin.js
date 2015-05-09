var express = require('express');

var controllers = require('./controllers/admin');

var router = module.exports = express.Router();

router.get('/websites', controllers.websites.index);
