var db = require('../dbSchema.js');

var BitstampData = db.Model.extend({
  tableName: 'bitstampMarketData',
  hasTimestamps: true
});

module.exports = BitstampData;
