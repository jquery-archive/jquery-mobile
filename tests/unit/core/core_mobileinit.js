/*
 * mobile core unit tests
 */

(function($){
	var mobilePage = undefined;
	module('jquery.mobile.core.js');

	// NOTE important to use $.fn.one here to make sure library reloads don't fire
	//      the event before the test check below
	$(document).one("mobileinit", function(){
		mobilePage = $.mobile.page;
	});

	test( "mobile.page is available when mobile init is fired", function(){
		ok(mobilePage !== undefined, "$.mobile.page is defined");
	});
})(jQuery);
