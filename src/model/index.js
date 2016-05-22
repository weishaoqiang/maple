const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash')
const debug = require('debug')('Maple');

let connect = mongoose.connect(config.base.mongodb, function (err) {
  if (err) {
    debug('connect to %s error' + err.message, config.base.mongodb)
    process.exit(1);
  } else {
    debug('mongodb has be connected')
  }
});

if (process.env.NODE_ENV === 'develpment') {
  mongoose.set('debug', true);
}

[
  'user',
  'notification',
  'amount',
  'check',
  'repair',
  'detail'
].forEach(function(filename) {
  var modelName = _.capitalize(_.camelCase(filename));
  exports[modelName] = require(path.join(__dirname, filename));
});
