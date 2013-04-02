/*
 * mobile navigation path unit tests
 */
(function($){
	var url = $.mobile.path.parseUrl( location.href ),
		home = location.href.replace( url.domain, "" );

	var testPageLoad = function(testPageAnchorSelector, expectedTextValue){
		expect( 2 );

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
				start();
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
	module("document relative paths", {
		teardown: function() {
			$.testHelper.navReset( url.pathname + url.search );
		}
	});

	asyncTest( "file reference no nesting", function(){
		testPageLoad("#doc-rel-test-one", "doc rel test one");
	});

	asyncTest( "file reference with nesting", function(){
		testPageLoad("#doc-rel-test-two", "doc rel test two");
	});

	asyncTest( "file reference with double nesting", function(){
		testPageLoad("#doc-rel-test-three", "doc rel test three");
	});

	asyncTest( "dir refrence with nesting", function(){
		testPageLoad("#doc-rel-test-four", "doc rel test four");
	});

	asyncTest( "file refrence with parent dir", function(){
		testPageLoad("#doc-rel-test-five", "doc rel test five");
	});

	asyncTest( "dir refrence with parent dir", function(){
		testPageLoad("#doc-rel-test-six", "doc rel test six");
	});


	// Site relative tests
	// NOTE does not test root path or non nested references
	module("site relative paths");

 	asyncTest( "file reference no nesting", function(){
		testPageLoad("#site-rel-test-one", "doc rel test one");
	});

	asyncTest( "file reference with nesting", function(){
		testPageLoad("#site-rel-test-two", "doc rel test two");
	});

	asyncTest( "file reference with double nesting", function(){
		testPageLoad("#site-rel-test-three", "doc rel test three");
	});

	asyncTest( "dir refrence with nesting", function(){
		testPageLoad("#site-rel-test-four", "doc rel test four");
	});

	asyncTest( "file refrence with parent dir", function(){
		testPageLoad("#site-rel-test-five", "doc rel test five");
	});

	asyncTest( "dir refrence with parent dir", function(){
		testPageLoad("#site-rel-test-six", "doc rel test six");
	});


	// Protocol relative tests
	// NOTE does not test root path or non nested references
	module("protocol relative paths");

 	asyncTest( "file reference no nesting", function(){
		testPageLoad("#protocol-rel-test-one", "doc rel test one");
	});

	asyncTest( "file reference with nesting", function(){
		testPageLoad("#protocol-rel-test-two", "doc rel test two");
	});

	asyncTest( "file reference with double nesting", function(){
		testPageLoad("#protocol-rel-test-three", "doc rel test three");
	});

	asyncTest( "dir refrence with nesting", function(){
		testPageLoad("#protocol-rel-test-four", "doc rel test four");
	});

	asyncTest( "file refrence with parent dir", function(){
		testPageLoad("#protocol-rel-test-five", "doc rel test five");
	});

	asyncTest( "dir refrence with parent dir", function(){
		testPageLoad("#protocol-rel-test-six", "doc rel test six");
	});

	// absolute tests
	// NOTE does not test root path or non nested references
	module("absolute paths");

 	asyncTest( "file reference no nesting", function(){
		testPageLoad("#absolute-test-one", "doc rel test one");
	});

	asyncTest( "file reference with nesting", function(){
		testPageLoad("#absolute-test-two", "doc rel test two");
	});

	asyncTest( "file reference with double nesting", function(){
		testPageLoad("#absolute-test-three", "doc rel test three");
	});

	asyncTest( "dir refrence with nesting", function(){
		testPageLoad("#absolute-test-four", "doc rel test four");
	});

	asyncTest( "file refrence with parent dir", function(){
		testPageLoad("#absolute-test-five", "doc rel test five");
	});

	asyncTest( "dir refrence with parent dir", function(){
		testPageLoad("#absolute-test-six", "doc rel test six");
	});
})(jQuery);
