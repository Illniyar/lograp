var expect = require("chai").expect;
var path =require("path");

describe("module name",function(){
	var lograp = null;
	var mockTransport = null;
	beforeEach(function(){
		var winston = require("winston")
		mockTransport = new(winston.transports.MockTransport)({})
		var wlogger = new (winston.Logger)({
			transports:[mockTransport]
		})
		lograp = require("../lib/lograp")
		lograp.winston = wlogger;
	})
	it("should log module_name",function(){
		var logger = lograp();
		logger.info("something to log");
		expect(mockTransport.getLastLog()[0]).to.equal("info");
		expect(mockTransport.getLastLog()[1]).to.match(RegExp("\\[" +__dirname.replace(/\\/g,"\\\\") +"\\" + path.sep +"moduleName.spec.js\\] - something to log"));
	});
	it("should log only file name if root path is provided",function(){
		lograp.rootPath = path.normalize(__dirname + path.sep + ".." + path.sep);
		var logger = lograp();
		logger.info("something to log");
		expect(mockTransport.getLastLog()[0]).to.equal("info");
		expect(mockTransport.getLastLog()[1]).to.match(RegExp("\\[test" +"\\" + path.sep +"moduleName.spec.js\\] - something to log"));
	});
})
/*describe("template",function() {

})

describe("timestamp",function(){

})
*/
