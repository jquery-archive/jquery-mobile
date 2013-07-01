/*
 * mobile button unit tests
 */
(function($){
	$.mobile.page.prototype.options.keepNative = "button.should-be-native";

	test( "button elements in the keepNative set shouldn't be enhanced", function() {
		deepEqual( $("button.should-be-native").siblings("div.ui-slider").length, 0 );
	});

	test( "button elements should be enhanced", function() {
		ok( $("#enhanced").hasClass( "ui-btn" ) );
	});

	test( "button markup text value should be changed on refresh", function() {
		var textValueButton = $("#text"), valueButton = $("#value");

		// the value shouldn't change unless it's been altered
		textValueButton.button( 'refresh' );
		deepEqual( textValueButton.text(), "foo" );

		// use the text where it's provided
		deepEqual( textValueButton.text(), "foo" );
		textValueButton.text( "bar" ).button( 'refresh' );
		deepEqual( textValueButton.text(), "bar" );

		// use the val if it's provided where the text isn't
		deepEqual( valueButton.text(), "foo" );
		valueButton.empty().val( "bar" ).button( 'refresh' );
		deepEqual( valueButton.text(), "bar" );

		// prefer the text to the value
		textValueButton.text( "bar" ).val( "baz" ).button( 'refresh' );
		deepEqual( textValueButton.text(), "bar" );
	});

	test( "theme should be inherited", function() {
		var $inherited = $( "#theme-check" ),
		    $explicit = $( "#theme-check-explicit" );

		deepEqual( $inherited.css( "background-color" ), "rgb(221, 221, 221)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
		ok( $explicit.hasClass( "ui-btn-a" ), "should not inherit" );
	});

	test( "Enhanced button elements should allow for phrasing content.", function() {
		var $htmlstring = $( "#contains-html" ),
		    $htmlval = $( "#val-contains-html" );

		ok( $htmlstring.find("sup").length, "HTML contained within a button element should carry over to the enhanced version" );
		ok( $htmlval.text().length > 1, "If the text is pulled from a button’s value, anything HTML-like should be disregarded." );
	});

})( jQuery );
