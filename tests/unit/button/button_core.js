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
		var textValueButton = $("#hidden-element-addition"), valueButton = $("#value");

		// the value shouldn't change unless it's been altered
		textValueButton.button( 'refresh' );
		deepEqual( textValueButton.val(), "foo" );

		// use the text where it's provided
		deepEqual( textValueButton.val(), "foo" );
		textValueButton.val( "bar" ).button( 'refresh' );
		deepEqual( textValueButton.val(), "bar" );

		// prefer the text to the value
		textValueButton.text( "bar" ).val( "baz" ).button( 'refresh' );
		deepEqual( textValueButton.text(), "bar" );
	});

	test( "theme should be inherited", function() {
		var $inherited = $( "#theme-check" ),
		    $explicit = $( "#theme-check-explicit" );

		deepEqual( $inherited.css( "background-color" ), "rgb(51, 51, 51)" ); /* The RGB value should match the background color we set for ui-btn-b in the default theme */
		ok( $explicit.hasClass( "ui-btn-a" ), "should not inherit" );
	});

	test( "Enhanced button elements should allow for phrasing content.", function() {
		var $htmlstring = $( "#contains-html" ),
		    $htmlval = $( "#val-contains-html" );

		ok( $htmlstring.find("sup").length, "HTML contained within a button element should carry over to the enhanced version" );
	});

	test( "Button's disabled state synced via refresh()", function() {
		var button = $( "#disabled-state" );

		button.prop( "disabled", true ).button( "refresh" );

		deepEqual( button.parent().hasClass( "ui-state-disabled" ), true,
			"class ui-state-disabled has been added to the wrapper" );
		deepEqual( button.button( "option", "disabled" ), true, "option disabled is now true" );
	});

	test( "Destroying a button works correctly", function() {
		var button = $( "<input type='button' value='Destroy Test'>" ),
			container = $( "#destroy-test-container" ).append( button ),
			pristineDOM = container.clone();

		button.button().button( "destroy" );

		deepEqual( $.testHelper.domEqual( container, pristineDOM ), true,
			"_destroy() leaves DOM unmodified" );
	});

})( jQuery );
