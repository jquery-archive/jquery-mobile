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

	test( "button markup text value should be changed on refresh", function() {
		var textValueButton = $("#text"), valueButton = $("#value");

		// the value shouldn't change unless it's been altered
		textValueButton.button( 'refresh' );
		same( textValueButton.siblings().text(), "foo" );

		// use the text where it's provided
		same( textValueButton.siblings().text(), "foo" );
		textValueButton.text( "bar" ).button( 'refresh' );
		same( textValueButton.siblings().text(), "bar" );

		// use the val if it's provided where the text isn't
		same( valueButton.siblings().text(), "foo" );
		valueButton.val( "bar" ).button( 'refresh' );
		same( valueButton.siblings().text(), "bar" );

		// prefer the text to the value
		textValueButton.text( "bar" ).val( "baz" ).button( 'refresh' );
		same( textValueButton.siblings().text(), "bar" );
	});
})( jQuery );