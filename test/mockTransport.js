var util = require('util'),
    winston = require('winston');

  var mockLogger = winston.transports.MockTransport = function (options) {
    this.name = 'MockLogger';
    this.level = options.level || 'info';

  };

  util.inherits(mockLogger, winston.Transport);

  mockLogger.prototype.log = function (level, msg, meta, callback) {
    this.lastLog = [level,msg,meta];
    callback(null, true);
  };
  mockLogger.prototype.getLastLog = function() {
	return this.lastLog;
  }
module.exports = mockLogger;