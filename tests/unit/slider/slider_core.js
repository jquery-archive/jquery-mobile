/*
 * mobile slider unit tests
 */
(function($){
	$.mobile.page.prototype.options.keepNative = "input.should-be-native";

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "slider elements in the keepNative set shouldn't be enhanced", function() {
		same( $("input.should-be-native").siblings("div.ui-slider").length, 0 );
	});
})( jQuery );