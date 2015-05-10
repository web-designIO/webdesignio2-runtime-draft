var errors = require('http-errors');

// Will later be retrieved from a redis store or something.
var websites = {
  'sub.localhost': 'sub'
};

var loaded = {};

exports.get = function(domain, callback) {
  var name = websites[domain];
  if (name == null) {
    callback(new errors.NotFound('Domain not found!'));
    return;
  }
  try {
    var app = require(resolvePath(name));
    loaded[name] = app;
    callback(null, app);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      callback(new errors.NotFound('Website module not found!'));
    } else {
      callback(e);
    }
  }
};

/**
 * Unloads the website from the cache.  It will be reloaded at the
 * next request.
 *
 *   - `name`
 */
exports.unload = function(name) {
  var path = resolvePath(name);
  delete require.cache[path];
};

/**
 * Resolve the path to a website module.
 *
 *   - `name`  String Name of the module.
 */
function resolvePath(name) {
  return `${process.cwd()}/websites/${name}/index.js`;
};
