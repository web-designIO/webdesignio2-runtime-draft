express = require('express');

controllers = require('./controllers/admin');

app = module.exports = express();

app.on('mount', function(parent) { app.set('views', parent.get('views')); });
app.get('/websites', controllers.websites.index);
