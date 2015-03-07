/*
 * mobile navigation path unit tests
 */
(function($){
	var url = $.mobile.path.parseUrl( location.href ),
		home = location.href.replace( url.domain, "" );

	var testPageLoad = function(testPageAnchorSelector, expectedTextValue, assert){
		expect( 2 );

		var done = assert.async();
		$.testHelper.pageSequence([
			// open our test page
			function(){
				$.testHelper.openPage("#pathing-tests");
			},

			// navigate to the linked page
			function(){
				var page = $.mobile.activePage;

				// check that the reset page isn't still open
				equal("", page.find(".reset-value").text());

				//click he test page link to execute the path
				page.find("a" + testPageAnchorSelector).click();
			},

			// verify that the page has changed and the expected text value is present
			function(){
				deepEqual($.mobile.activePage.find(".test-value").text(), expectedTextValue);
				done();
			}
		]);
	};

	// all of these alterations assume location.pathname will be a directory
	// this is required to prevent the tests breaking in a subdirectory
	// TODO could potentially be fragile since the tests could be running while
	//      the urls are being updated
	$(function(){
		$("a.site-rel").each(function(i, elem){
			var $elem = $(elem);
			$elem.attr("href", location.pathname + $(elem).attr("href"));
		});

		$('a.protocol-rel').each(function(i, elem){
			var $elem = $(elem);
			$elem.attr("href", "//" + location.host + location.pathname + $(elem).attr("href"));
		});

		$('a.absolute').each(function(i, elem){
			var $elem = $(elem);
			$elem.attr("href",
									location.protocol + "//" + location.host +
									location.pathname + $(elem).attr("href"));
		});
	});


	//Doc relative tests
	QUnit.module("document relative paths", {
		teardown: function() {
			$.testHelper.navReset( url.pathname + url.search );
		}
	});

	QUnit.test( "file reference no nesting", function(assert){
		testPageLoad("#doc-rel-test-one", "doc rel test one", assert);
	});

	QUnit.test( "file reference with nesting", function(assert){
		testPageLoad("#doc-rel-test-two", "doc rel test two", assert);
	});

	QUnit.test( "file reference with double nesting", function(assert){
		testPageLoad("#doc-rel-test-three", "doc rel test three", assert);
	});

	QUnit.test( "dir refrence with nesting", function(assert){
		testPageLoad("#doc-rel-test-four", "doc rel test four", assert);
	});

	QUnit.test( "file refrence with parent dir", function(assert){
		testPageLoad("#doc-rel-test-five", "doc rel test five", assert);
	});

	QUnit.test( "dir refrence with parent dir", function(assert){
		testPageLoad("#doc-rel-test-six", "doc rel test six", assert);
	});


	// Site relative tests
	// NOTE does not test root path or non nested references
	QUnit.module("site relative paths");

 	QUnit.test( "file reference no nesting", function(assert){
		testPageLoad("#site-rel-test-one", "doc rel test one", assert);
	});

	QUnit.test( "file reference with nesting", function(assert){
		testPageLoad("#site-rel-test-two", "doc rel test two", assert);
	});

	QUnit.test( "file reference with double nesting", function(assert){
		testPageLoad("#site-rel-test-three", "doc rel test three", assert);
	});

	QUnit.test( "dir refrence with nesting", function(assert){
		testPageLoad("#site-rel-test-four", "doc rel test four", assert);
	});

	QUnit.test( "file refrence with parent dir", function(assert){
		testPageLoad("#site-rel-test-five", "doc rel test five", assert);
	});

	QUnit.test( "dir refrence with parent dir", function(assert){
		testPageLoad("#site-rel-test-six", "doc rel test six", assert);
	});


	// Protocol relative tests
	// NOTE does not test root path or non nested references
	QUnit.module("protocol relative paths");

 	QUnit.test( "file reference no nesting", function(assert){
		testPageLoad("#protocol-rel-test-one", "doc rel test one", assert);
	});

	QUnit.test( "file reference with nesting", function(assert){
		testPageLoad("#protocol-rel-test-two", "doc rel test two", assert);
	});

	QUnit.test( "file reference with double nesting", function(assert){
		testPageLoad("#protocol-rel-test-three", "doc rel test three", assert);
	});

	QUnit.test( "dir refrence with nesting", function(assert){
		testPageLoad("#protocol-rel-test-four", "doc rel test four", assert);
	});

	QUnit.test( "file refrence with parent dir", function(assert){
		testPageLoad("#protocol-rel-test-five", "doc rel test five", assert);
	});

	QUnit.test( "dir refrence with parent dir", function(assert){
		testPageLoad("#protocol-rel-test-six", "doc rel test six", assert);
	});

	// absolute tests
	// NOTE does not test root path or non nested references
	QUnit.module("absolute paths");

 	QUnit.test( "file reference no nesting", function(assert){
		testPageLoad("#absolute-test-one", "doc rel test one", assert);
	});

	QUnit.test( "file reference with nesting", function(assert){
		testPageLoad("#absolute-test-two", "doc rel test two", assert);
	});

	QUnit.test( "file reference with double nesting", function(assert){
		testPageLoad("#absolute-test-three", "doc rel test three", assert);
	});

	QUnit.test( "dir refrence with nesting", function(assert){
		testPageLoad("#absolute-test-four", "doc rel test four", assert);
	});

	QUnit.test( "file refrence with parent dir", function(assert){
		testPageLoad("#absolute-test-five", "doc rel test five", assert);
	});

	QUnit.test( "dir refrence with parent dir", function(assert){
		testPageLoad("#absolute-test-six", "doc rel test six", assert);
	});
})(jQuery);
