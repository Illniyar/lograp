#lograp
====================

Lograp is a simple wrapper around [Winston](https://npmjs.org/package/winston) that provides some (to my opinion) missing functionality.

Currently it:

* always adds the name of the module you called the logger from and the current timestamp.
	* you can provide a rootPath so that the module name is relative
	* you can provide a name for the logger to use instead of it using the relative path.
* prints stack traces of errors.
	
##to install :

```

	npm install winston
	npm install lograp
```
note that lograp does not come with winston built in. you must have it in your path inorder to use it.

##usage:

to use simply require lograp and use it like you do winston
``` js

	//---- module in /path/to/project/src/module.js
	var logger = require("lograp")();
	logger.info("some text"); // the message will be "INFO: <timestamp> [/path/to/project/src/module.js] - some text"
```
if you pass an error object to the logging function, the stack trace will be attached to the log.
``` js

	var logger = require("lograp")();
	logger.error("erorr text",new Error("some error")) // will out put "error: <timestamp> [path] - some error\n\t Error: some error \n\t stack trace ...
```
###Configuration
you can configure lograp to use a custom winston logger, however you must do so prior to initiating the logger for the first time.
``` js

	//---- in your intial configuration file
	var lograp = require("lograp")
	lograp.winston = new (require("winston").Logger)({}); 

	//--- different module
	var logger = require("lograp")()
	logger.info

```
you can provide lograp with a root path so that module names logged will not be relative to the root path.
``` js

	//---- in your intial configuration file
	var lograp = require("lograp")
	lograp.rootPath = "/path/to/project/" 

	//--- module in /path/to/project/src/module.js
	var logger = require("lograp")()
	logger.info("some text") // the message will be "INFO: <timestamp> [src/module.js] - some text"
```

Planned functionality:
* add express request log middleware
* allow providing templates for certain transports
* enable dynamic log levels per module
* override console.log

License MIT:
http://opensource.org/licenses/MIT
