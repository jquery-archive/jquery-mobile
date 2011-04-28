/*
 * mobile navigation path unit tests
 */
(function($){
	var testPageLoad = function(testPageAnchorSelector, expectedTextValue){
		expect( 1 );

		$.testHelper.sequence([
			// open our test page
			function(){
				$.testHelper.openPage("#pathing-tests");
			},

			// navigate to the linked page
			function(){
				$( ".ui-page-active a" + testPageAnchorSelector ).click();
			},

			// verify that the page has changed and the expected text value is present
			function(){
				same($(".ui-page-active .test-value").text(), expectedTextValue);
				start();
			}
		], 800);
	};

	module("document relative paths");

 	asyncTest( "file reference no nesting", function(){
		testPageLoad("#doc-rel-file-ref-no-nest", "doc rel file ref no nest");
	});

	asyncTest( "file reference with nesting", function(){
		testPageLoad("#doc-rel-file-ref-nested", "doc rel file ref nested");
	});

	asyncTest( "file reference with double nesting", function(){
		testPageLoad("#doc-rel-file-ref-double-nested", "doc rel file ref double nested");
	});

	asyncTest( "dir refrence with nesting", function(){
		testPageLoad("#doc-rel-dir-ref-nested-dir", "doc rel dir ref nested dir");
	});

	asyncTest( "file refrence with parent dir", function(){
		testPageLoad("#doc-rel-file-ref-parent", "doc rel dir ref parent");
	});

	asyncTest( "dir refrence with parent dir", function(){
		testPageLoad("#doc-rel-dir-ref-parent", "doc rel dir ref parent");
	});
})(jQuery);