/**
 * Here we setup all the database related stuff.
 */

var mongoose = require('mongoose');

var setup = false;

/**
 * Simple setup function.
 */
exports.setup = function() {

  // Make sure setup is done only once.
  if (setup) { return; }
  mongoose.connect(getUri());
  setup = true;
};

function getUri() {
  return `mongodb://${process.env.MONGO_PORT_27017_TCP_ADDR}:${process.env.MONGO_PORT_27017_TCP_PORT}/webdesignio`;
}
