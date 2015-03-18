$.testHelper.delayStart();

/*
 * mobile init tests
 */
( function( $ ) {
module( "jquery.mobile.loader", {
	setup: function() {
		// NOTE reset for gradeA tests
		$( 'html' ).removeClass( 'ui-mobile' );

		$.mobile.loading( 'hide' );
	},

	teardown: function() {
		// clear the classes added by reloading the init
		$( "html" ).attr( 'class', '' );

		$.mobile.loadingMessage =
			$.mobile.loadingMessageTheme =
				$.mobile.loadingMessageTextVisible = undefined;
	}
} );

// NOTE important to use $.fn.one here to make sure library reloads don't fire
//      the event before the test check below
$( document ).one( "mobileinit", function() {
	$.mobile.loader.prototype.options.text = "mobileinit";
	$.mobile.loader.prototype.options.textVisible = true;
} );

test( "prototype options are used for mobile loader", function() {
	$.mobile.loading( 'show' );

	deepEqual( $( '.ui-loader' ).text(), "mobileinit", "prototype options set the text and make it visible" );
} );

test( "showing the loader does not show the text when the loading message is false", function() {
	$.mobile.loading( "option", "text", false ).loader( "show" );

	deepEqual( $( ".ui-loader h1" ).text(), "", "no loading message present" );
} );

test( "showing the loader does not hide the text when the loading message is true", function() {
	$.mobile.loading( "option", "textVisible", true ).loader( "show" );

	ok( $( ".ui-loader" ).hasClass( "ui-loader-verbose" ), "displaying text" );
} );

test( "hiding the loader doesn't add the dialog to the page when loading message is false", function() {
	$.mobile.loading( "option", "text", true ).loader( "show" ).loader( "hide" );

	deepEqual( $( ".ui-loading" ).length, 0, "page should not be in the loading state" );
} );

test( "showing the loader adds the dialog to the page when text option is true", function() {
	$.mobile.loading( "option", "text", true ).loader( "show" );

	deepEqual( $( ".ui-loading" ).length, 1, "page should be in the loading state" );
} );

test( "page loading should contain custom loading message", function() {
	$.mobile.loading( "option", "text", "foo" ).loader( "show" );

	deepEqual( $( ".ui-loader h1" ).text(), "foo" );
} );

test( "page loading should contain custom loading message when set at runtime", function() {
	$.mobile.loading( "option", "text", "bar" ).loader( "show" );

	deepEqual( $( ".ui-loader h1" ).text(), "bar" );
} );

test( "page loading should contain custom loading message when used in param object", function() {
	$.mobile.loading( "show", { text: "bak" } );
	deepEqual( $( ".ui-loader h1" ).text(), "bak", "loader has custom message 'bak'" );
} );

test( "page loading should contain different theme when used in param object", function() {
	$.mobile.loading( "show", { theme: "l" } );
	ok( $( ".ui-loader" ).hasClass( "ui-body-l" ), "loader has theme l" );
} );

test( "page loading should contain new html when provided, prefers passed param", function() {
	$.mobile.loading( "show", { html: "<div class=\"foo\"></div>" } );

	deepEqual( $( ".ui-loader > div.foo" ).length, 1, "loader has custom html" );
} );

test( "page loading should always contain text when passed as the second arg", function() {
	// simulate error call in navigation ajax error callback
	$.mobile.loading( "option", "textVisible", true ).loader( "show", "e", "foo serious", true );

	deepEqual( $( ".ui-loader" ).text(), "foo serious", "loader has message regardless of global setting" );
} );

test( "page loading should always contain text when passed as an object prop", function() {
	$.mobile
		.loading( "option", "textVisible", false )

		// simulate error call in navigation ajax error callback
		.loader( "show", {
			theme: "e",
			text: "foo serious second",
			textonly: true
		} );

	deepEqual( $( ".ui-loader" ).text(), "foo serious second", "loader has message regardless of global setting" );
} );

test( "page loading should not contain text when default is used and visible prop is false", function() {
	$.mobile
		.loading( "option", "textVisible", false )

		// simulate error call in navigation ajax error callback
		.loader( "show", { theme: "e", textonly: true } );

	ok( $( ".ui-loader" ).hasClass( "ui-loader-default" ), "loader text is hidden" );

	$.mobile
		.loading( "hide" )

		// simulate error call in navigation ajax error callback
		.loader( "show", "e", undefined, true );

	ok( $( ".ui-loader" ).hasClass( "ui-loader-default" ), "loader text is hidden" );
} );

test( "test the loading config object precedence", function() {
	$.mobile
		.loading( "option", "text", "fozzle" )
		.loader( "option", "theme", "x" )
		.loader( "show" );

	ok( $( ".ui-loader" ).hasClass( "ui-body-x" ), "has theme x" );
	deepEqual( $( ".ui-loader h1" ).text(), "fozzle", "has text fozzle in loading config object" );
} );
} )( jQuery );
