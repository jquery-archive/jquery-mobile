/*global casper: false, __utils__: false */

var host = casper.cli.get( "host" ) || "localhost",
	port = casper.cli.get( "port" ) || 80,
	path = casper.cli.get( "path" ) || "",
	mouse = require("mouse").create(casper);

casper.options.viewportSize = {width: 1024, height: 768};

casper.test.begin("Root index should redirect to demos/", 2, function suite( test ) {
	casper.start( "http://" + host + ":" + port + path + "/" );

	casper.then( function() {
		test.assertHttpStatus( 200 );
		test.assertUrlMatch( /\/demos\/$/, "/ redirects to /demos/" );
	});

	casper.run(function() {
		test.done();
	});
});

casper.test.begin("demos/ should render properly", 2, function suite( test ) {
	casper.start( "http://" + host + ":" + port + path + "/demos/" );

	casper.then( function() {
		test.assertHttpStatus( 200 );
		test.assertExists(
			"li[data-filtertext='demos homepage'].ui-first-child",
			"First ListItem in menu panel should have class ui-first-child"
		);
	});

	casper.run(function() {
		test.done();
	});
});

casper.test.begin("Checkboxradio widget should render properly", 2, function suite( test ) {
	casper.start( "http://" + host + ":" + port + path + "/demos/" );

	// Click "Checkboxradio widget" list item
	casper.then( function() {
		casper.click( "ul.jqm-list > li:nth-child(5) > h3 > a" );
	});

	// Click "Checkboxes" sub list item
	casper.then( function() {
		casper.waitUntilVisible( "ul.jqm-list > li:nth-child(5) > div > ul > li.ui-first-child > a",
			function() {
				casper.click( "ul.jqm-list > li:nth-child(5) > div > ul > li.ui-first-child > a" );
			}
		);
	});

	casper.then( function() {
		casper.waitForUrl( /\/demos\/checkboxradio-checkbox\/$/, function() {
			test.assertVisible(
				"input[name='checkbox-0 ']",
				"Checkbox checkbox-0 should be visible"
			);
			test.assertEvalEquals(
				function() {
					return $( "input[name='checkbox-0 ']" ).parent( "div" )[0].className;
				},
				"ui-checkbox",
				"Checkbox should be enhanced"
			);
		});
	});

	casper.run(function() {
		test.done();
	});
});
