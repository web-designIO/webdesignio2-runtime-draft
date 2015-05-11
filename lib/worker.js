var qs = require('querystring');
var cluster = require('cluster');
var domain = require('domain');
var http = require('http');

var dispatcher = require('./dispatcher');
var websiteStore = require('./website_store');
var database = require('./database');

var parseHost;

/**
 * Spawns a new worker for `port` and returns its server.
 *
 *   - `port`  Number Port to listen to
 */
module.exports = function(port) {
  var server;

  server = http.createServer(function(req, res) {
    var d = domain.create();
    d.on('error', function(err) {
      console.error(err.stack);

      // Note: we're in dangerous territory!
      // By definition, something unexpected occurred,
      // which we probably didn't want.
      // Anything can happen now!  Be very careful!

      try {
        // make sure we close down within 30 seconds
        var killtimer = setTimeout(function() {
          process.exit(1);
        }, 30000);
        // But don't keep the process open just for that!
        killtimer.unref();

        // stop taking new requests.
        server.close();

        // Let the master know we're dead.  This will trigger a
        // 'disconnect' in the cluster master, and then it will fork
        // a new worker.
        cluster.worker.disconnect();

        // try to send an error to the request that triggered the problem
        res.statusCode = 500;
        res.setHeader('content-type', 'text/plain');
        res.end('Oops, there was a problem!\n');
      } catch (err2) {
        // oh well, not much we can do at this point.
        console.error('Error sending 500!', err2.stack);
      }
    });

    // add referenced objects to the domain to avoid them being
    // garbage collected
    d.add(req);
    d.add(res);
    d.run(function() {
      var urlParts = req.url.split('?');
      database.setup();
      req.vhost = parseHost(req.headers.host);
      if (urlParts[0] === '/unload') {
        websiteStore.unload(qs.parse(urlParts[1]).website);
        res.end();
        return;
      }
      dispatcher(req, res);
    });
  });
  server.listen(port);
  return server;
}

/**
 * Parse a host header.
 *
 *   - `host`  String
 */
parseHost = exports.parseHost = function(host) {
  var u = require('url').parse(`http://${host}`);
  return {
    port: u.port,
    host: u.host,
    hostname: u.hostname
  };
};
