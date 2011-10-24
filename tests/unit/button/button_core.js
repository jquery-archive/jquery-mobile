/*
 * mobile button unit tests
 */
(function($){
	$.mobile.page.prototype.options.keepNative = "button.should-be-native";

	test( "button elements in the keepNative set shouldn't be enhanced", function() {
		same( $("button.should-be-native").siblings("div.ui-slider").length, 0 );
	});

	test( "button elements should be enhanced", function() {
    ok( $("#enhanced").hasClass( "ui-btn-hidden" ) );
	});
})( jQuery );