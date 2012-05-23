/*
 * grunt
 * https://github.com/cowboy/grunt
n *
 * Copyright (c) 2012 "Cowboy" Ben Alman
 * Licensed under the MIT license.
 * http://benalman.com/about/license/
 */

/*global QUnit:true, alert:true*/

// Don't re-order tests.
QUnit.config.reorder = false;
// Run tests serially, not in parallel.
QUnit.config.autorun = false;

// Send messages to the parent zombie.js process via alert! Good times!!
function sendMessage() {
	var args = [].slice.call(arguments);
	alert(JSON.stringify(args));
}

QUnit.log = function(obj) {
	// What is this I don’t even
	if (obj.message === '[object Object], undefined:undefined') { return; }
	// Parse some stuff before sending it.
	var actual = QUnit.jsDump.parse(obj.actual);
	var expected = QUnit.jsDump.parse(obj.expected);
	// Send it.
	sendMessage('log', obj.result, actual, expected, obj.message, obj.source);


	function xmlEncode(message) {
		return message.replace(/\&/g,'&amp;').replace(/</g,'&lt;')
			.replace(/>/g,'&gt;').replace(/\'/g,'&apos;').replace(/\"/g,'&quot;');
	}

	if (obj.result) {
		return;
	}

	var message = obj.message || "";
	if (obj.expected) {
		if (message.length > 0) {
			message += ", ";
		}
		message += "expected: " + obj.expected + ", but was: " + obj.actual;
	}

	var xml = ']]>\n<failure type="failed" message="' + xmlEncode(message) + '"/>\n<![CDATA[';

	current_test_assertions.push(xml);
};

var testCases = [], current_test_assertions, moduleName, startTime;

QUnit.testStart = function(obj) {
	sendMessage('testStart', obj.name);
	startTime = new Date();
};

QUnit.testDone = function(obj) {
	sendMessage('testDone', obj.name, obj.failed, obj.passed, obj.total);
	var xml = '\t<testcase classname="' +	(moduleName || "jquery.mobile") + '" ' +
		'name="' + obj.name + '" ' +
		'time="' + ((new Date()) - startTime)/1000 + '" ' +
		'assertions="' + obj.total + '"></testcase>\n';

	current_test_assertions = [];
	testCases.push(xml);
};

QUnit.moduleStart = function(obj) {
	sendMessage('moduleStart', obj.name);
	moduleName = obj.name;
};

QUnit.moduleDone = function(obj) {
	sendMessage('moduleDone', obj.name, obj.failed, obj.passed, obj.total);
};

QUnit.begin = function() {
	sendMessage('begin');
	sendMessage('xml', '<?xml version="1.0" encoding="UTF-8"?>\n' );
};

QUnit.done = function(obj) {
	var xml = '<testsuite name="'+ obj.name +'" errors="0" failures="'+obj.failed+'" tests="'+obj.total+'" time="'+(new Date() - new Date())/1000+'" >\n';
	if(testCases.length) {
		for (var i=0, l=testCases.length; i<l; i++) {
			xml += testCases[i];
		}
	}

	xml += '</testsuite>\n';
	sendMessage( "xml", xml );
	sendMessage('done', obj.failed, obj.passed, obj.total, obj.runtime);
};
