var util = require('util');

var websiteStore = require('./website_store');

/**
 * Dispatches the request to the right website.
 *
 *   - `req`  http.IncomingMessage
 *   - `res`  http.ServerResponse
 */
module.exports = function(req, res) {
  if (req.vhost.hostname === process.env.WDIO_HOSTNAME) {
    var app = require(`${process.cwd()}/app`);
    app(req, res, function(err) {
      if (err) {
        serveError(err, res);
        return;
      }
      serveNotFound(res);
    });
    return;
  }
  websiteStore.get(req.vhost.hostname, function(err, app) {
    if (err != null) {
      if (err.name === 'NotFoundError') {
        serveNotFound(res);
      } else {
        req.emit('error', err);
      }
    } else {
      app(req, res, function(err) {
        if (err) {
          serveError(err, res);
          return;
        }
        serveNotFound(res);
      });
    }
  });
};

function serveNotFound(res) {
  res.statusCode = 404;
  res.setHeader('content-type', 'plain/text');
  res.end('No such page!');
}

function serveError(err, res) {
  if (err.statusCode == null) { throw err; }
  console.error(err.message);
  res.statusCode = 500;
  res.setHeader('content-type', 'plain/text');
  res.end('Internal server error!');
}
