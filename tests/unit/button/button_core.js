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

	// Issue 2877
	test( "verify the button placeholder is added many times", function() {
		var $form =	$( "#hidden-element-addition-form" ), count = 3;
		expect( count * 2 );

		for( var x = 0; x < count; x++ ) {
			$( "#hidden-element-addition" ).trigger( "vclick" );
			same( $form.find( "input[type='hidden']" ).length, 1, "hidden form input should be added" );

			$form.trigger( "submit" );
			same( $form.find( "[type='hidden']" ).length, 0, "hidden form input is removed" );
		}
	});

	test( "theme should be inherited", function() {
		var $inherited = $( "#theme-check" ),
		    $explicit = $( "#theme-check-explicit" );

		ok( $inherited.closest("div").hasClass( "ui-btn-up-a" ), "should inherit from page" );
		ok( $explicit.closest("div").hasClass( "ui-btn-up-b" ), "should not inherit" );
	});
})( jQuery );