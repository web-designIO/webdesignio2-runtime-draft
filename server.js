'use strict';

var cluster = require('cluster');
const workers = 1;

var workerMap = new Map();

if (cluster.isMaster) {
  cluster.on('disconnect', function(worker) {
    cluster.fork();
  });

  for (let i = 0; i < workers; ++i) {
    cluster.fork();
  }
} else {
  require('./lib/worker')(3000);
}
