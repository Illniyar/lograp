var Logger = function(module){
	this.module = module;
}
Logger.prototype.log = function(level,msg) {
	msg = this.parseMessage(msg,this.module)
	arguments[1] = msg;
	this.innerlog.log.apply(this.innerlog,arguments);		
}
var lograp = function(moduleName){
	if(!lograp.logger) lograp.loggerSetup = setupWinston
	var err = new Error("fake error to get module caller")
	if (!moduleName) {
		var moduleName = extractModuleName(err)
		if (lograp.rootPath && moduleName != "unknown") moduleName = moduleName.replace(lograp.rootPath,"")
	}
	var newLogger = new Logger(moduleName);
	lograp.loggerSetup(newLogger);
	return newLogger
}
Logger.prototype.parseMessage = function(msg,moduleName) {
	var template = lograp.template;
	template = template.replace("{timestamp}",new Date().toISOString());
	template = template.replace("{moduleName}",moduleName);
	template = template.replace("{msg}",msg);
	return template;
}
function extractModuleName(err) {
	try {
		return /at .*\((\w:[^:]*|\\[^:]*)/.exec(err.stack.split("\n")[2])[1]
	}catch(e){
		return "unknown";
	}	
}
function setupWinston(logger){
	var winston = lograp.winston?lograp.winston:require("winston");
	logger.innerlog = winston;
	Object.keys(winston.levels).forEach(function(level){
		logger[level] = function() {
			this.log.apply(this,[level].concat(Array.prototype.slice.call(arguments)));
		}		
	})
}
lograp.template = "{timestamp} [{moduleName}] - {msg}"
module.exports = lograp;