/*
 * mobile dialog unit tests
 */
(function($){
	var testValue = "a value we can test!";

	module('jquery.mobile.dialog.js', {
		setup: function(){
			//bring up the dialog
			$("a[href='#foo-dialog']").click();

			// We prefer the external links don't send the browser elsewhere
			$("#foo-dialog").delegate("a", "click", function(e){
				return false;
			});

			// set a test value to verify against change
			$.mobile.activePage = testValue;
		}
	});

	test( "external and targeted links do not set the active page", function(){
		var verifyActivePage = function(selector){
			$(selector).click();
			same( $.mobile.activePage, testValue, "mobile active page remains untouched");
		};

		verifyActivePage("a#http-link");
		verifyActivePage("a#mailto-link");
		verifyActivePage("a#rel-link");
		verifyActivePage("a#target-link");
	});

	test( "non external links set the active page", function(){
		$.mobile.activePage = testValue;
		$("a#internal-link").click();
		ok( $.mobile.activePage !== testValue, "mobile is altered");
	});
})(jQuery);
