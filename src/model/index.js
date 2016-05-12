const mongoose = require('mongoose');
const path = require('path');
const _ = require('lodash')

var connect = mongoose.connect(config.base.mongodb, function (err) {
  if (err) {
    console.error('connect to %s error', config.base.mongodb, err.message);
    process.exit(1);
  }
});

if (process.env.NODE_ENV === 'develpment') {
  mongoose.set('debug', true);
}

[
  'user',
  'notification',
  'amount',
  'check'
].forEach(function(filename) {
  var modelName = _.capitalize(_.camelCase(filename));
  exports[modelName] = require(path.join(__dirname, filename));
  console.log(modelName)
});
