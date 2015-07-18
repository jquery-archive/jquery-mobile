$.testHelper.delayStart();

/*
 * mobile init tests
 */
( function( QUnit, $ ) {
QUnit.module( "jquery.mobile.loader", {
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

QUnit.test( "prototype options are used for mobile loader", function( assert ) {
	$.mobile.loading( 'show' );

	assert.deepEqual( $( '.ui-loader' ).text(), "mobileinit", "prototype options set the text and make it visible" );
} );

QUnit.test( "showing the loader does not show the text when the loading message is false", function( assert ) {
	$.mobile.loading( "option", "text", false ).loader( "show" );

	assert.deepEqual( $( ".ui-loader h1" ).text(), "", "no loading message present" );
} );

QUnit.test( "showing the loader does not hide the text when the loading message is true", function( assert ) {
	$.mobile.loading( "option", "textVisible", true ).loader( "show" );

	assert.ok( $( ".ui-loader" ).hasClass( "ui-loader-verbose" ), "displaying text" );
} );

QUnit.test( "hiding the loader doesn't add the dialog to the page when loading message is false", function( assert ) {
	$.mobile.loading( "option", "text", true ).loader( "show" ).loader( "hide" );

	assert.deepEqual( $( ".ui-loading" ).length, 0, "page should not be in the loading state" );
} );

QUnit.test( "showing the loader adds the dialog to the page when text option is true", function( assert ) {
	$.mobile.loading( "option", "text", true ).loader( "show" );

	assert.deepEqual( $( ".ui-loading" ).length, 1, "page should be in the loading state" );
} );

QUnit.test( "page loading should contain custom loading message", function( assert ) {
	$.mobile.loading( "option", "text", "foo" ).loader( "show" );

	assert.deepEqual( $( ".ui-loader h1" ).text(), "foo" );
} );

QUnit.test( "page loading should contain custom loading message when set at runtime", function( assert ) {
	$.mobile.loading( "option", "text", "bar" ).loader( "show" );

	assert.deepEqual( $( ".ui-loader h1" ).text(), "bar" );
} );

QUnit.test( "page loading should contain custom loading message when used in param object", function( assert ) {
	$.mobile.loading( "show", { text: "bak" } );
	assert.deepEqual( $( ".ui-loader h1" ).text(), "bak", "loader has custom message 'bak'" );
} );

QUnit.test( "page loading should contain different theme when used in param object", function( assert ) {
	$.mobile.loading( "show", { theme: "l" } );
	assert.ok( $( ".ui-loader" ).hasClass( "ui-body-l" ), "loader has theme l" );
} );

QUnit.test( "page loading should contain new html when provided, prefers passed param", function( assert ) {
	$.mobile.loading( "show", { html: "<div class=\"foo\"></div>" } );

	assert.deepEqual( $( ".ui-loader > div.foo" ).length, 1, "loader has custom html" );
} );

QUnit.test( "page loading should always contain text when passed as the second arg", function( assert ) {
	// simulate error call in navigation ajax error callback
	$.mobile.loading( "option", "textVisible", true ).loader( "show", "e", "foo serious", true );

	assert.deepEqual( $( ".ui-loader" ).text(), "foo serious", "loader has message regardless of global setting" );
} );

QUnit.test( "page loading should always contain text when passed as an object prop", function( assert ) {
	$.mobile
		.loading( "option", "textVisible", false )

		// simulate error call in navigation ajax error callback
		.loader( "show", {
			theme: "e",
			text: "foo serious second",
			textonly: true
		} );

	assert.deepEqual( $( ".ui-loader" ).text(), "foo serious second", "loader has message regardless of global setting" );
} );

QUnit.test( "page loading should not contain text when default is used and visible prop is false", function( assert ) {
	$.mobile
		.loading( "option", "textVisible", false )

		// simulate error call in navigation ajax error callback
		.loader( "show", { theme: "e", textonly: true } );

	assert.ok( $( ".ui-loader" ).hasClass( "ui-loader-default" ), "loader text is hidden" );

	$.mobile
		.loading( "hide" )

		// simulate error call in navigation ajax error callback
		.loader( "show", "e", undefined, true );

	assert.ok( $( ".ui-loader" ).hasClass( "ui-loader-default" ), "loader text is hidden" );
} );

QUnit.test( "test the loading config object precedence", function( assert ) {
	$.mobile
		.loading( "option", "text", "fozzle" )
		.loader( "option", "theme", "x" )
		.loader( "show" );

	assert.ok( $( ".ui-loader" ).hasClass( "ui-body-x" ), "has theme x" );
	assert.deepEqual( $( ".ui-loader h1" ).text(), "fozzle", "has text fozzle in loading config object" );
} );
} )( QUnit, jQuery );
