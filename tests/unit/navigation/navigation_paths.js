/*
 * mobile navigation path unit tests
 */
(function($){
	module("jquery.mobile.navigation.js");

	var testPageLoad = function(testPageSelector, expectedTextValue){
		expect( 1 );

		$.testHelper.sequence([
			// open our test page
			function(){
				$.testHelper.openPage(testPageSelector);
			},

			// navigate to the linked page
			function(){
				$(".ui-page-active a").click();
			},

			// verify that the page has changed and the expected text value is present
			function(){
				same($(".ui-page-active .test-value").text(), expectedTextValue);
				start();
			}
		], 800);
	};

	asyncTest( "document relative file reference no nesting", function(){
		testPageLoad("#doc-rel-file-ref-no-nest", "doc rel file ref no nest");
	});

	asyncTest( "document relative file reference with nesting", function(){
		testPageLoad("#doc-rel-file-ref-nested", "doc rel file ref nested");
	});
})(jQuery);