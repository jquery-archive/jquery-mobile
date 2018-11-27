/*
 * Mobile init tests
 */

define( [ "jquery", "qunit" ], function( $, QUnit ) {

$.testHelper.delayStart();

QUnit.module( "Theme option", {
	setup: function() {
		this.loader = $( "#theme-test" ).loader();
	}
} );

QUnit.test( "Initial swatch", function( assert ) {
	assert.hasClasses( this.loader, "ui-body-a", "Initial class is 'ui-body-a'" );
} );

QUnit.test( "Setting option", function( assert ) {
	this.loader.loader( "option", "theme", "x" );
	assert.hasClasses( this.loader, "ui-body-x",
		"After setting theme option to 'x', loader has class 'ui-body-x'" );
} );

QUnit.module( "jquery.mobile.loader", {
	setup: function() {
		$.mobile.loading._widget.remove();
		$.mobile.loading._widget = undefined;
	},

	teardown: function() {

		// Clear the classes added by reloading the init
		$( "html" ).attr( "class", "" );

		// NOTE reset for gradeA tests
		$( "html" ).removeClass( "ui-mobile" );

		$.mobile.loadingMessage =
			$.mobile.loadingMessageTheme =
				$.mobile.loadingMessageTextVisible = undefined;

		$.mobile.loading( "hide" );
	}
} );

// NOTE important to use $.fn.one here to make sure library reloads don't fire
//	  the event before the test check below
$( document ).one( "mobileinit", function() {
	$.mobile.loader.prototype.options.text = "mobileinit";
	$.mobile.loader.prototype.options.textVisible = true;
} );

QUnit.test( "prototype options are used for mobile loader", function( assert ) {
	$.mobile.loading( "show" );

	assert.strictEqual( $( ".ui-loader" ).text(), "mobileinit",
		"prototype options set the text and make it visible" );
} );

QUnit.test( "showing the loader does not show the text when the loading message is false",
	function( assert ) {
		$.mobile.loading( "option", "text", false ).loader( "show" );

		assert.strictEqual( $( ".ui-loader h1" ).text(), "", "no loading message present" );
	} );

QUnit.test( "showing the loader does not hide the text when the loading message is true",
	function( assert ) {
		$.mobile.loading( "option", "textVisible", true ).loader( "show" );

		assert.hasClasses( $( ".ui-loader" ), "ui-loader-verbose", "displaying text" );
	} );

QUnit.test( "hiding the loader doesn't add the dialog to the page when loading message is false",
	function( assert ) {
		$.mobile.loading( "option", "text", true ).loader( "show" ).loader( "hide" );

		assert.strictEqual( $( ".ui-loading" ).length, 0,
			"page should not be in the loading state" );
	} );

QUnit.test( "showing the loader adds the dialog to the page when text option is true",
	function( assert ) {
		$.mobile.loading( "option", "text", true ).loader( "show" );

		assert.strictEqual( $( ".ui-loading" ).length, 1, "page should be in the loading state" );
	} );

QUnit.test( "page loading should contain custom loading message", function( assert ) {
	$.mobile.loading( "option", "text", "foo" ).loader( "show" );

	assert.strictEqual( $( ".ui-loader h1" ).text(), "foo" );
} );

QUnit.test( "page loading should contain custom loading message when set at runtime",
	function( assert ) {
		$.mobile.loading( "option", "text", "bar" ).loader( "show" );

		assert.strictEqual( $( ".ui-loader h1" ).text(), "bar" );
	} );

QUnit.test( "page loading should contain custom loading message when used in param object",
	function( assert ) {
		$.mobile.loading( "show", { text: "bak" } );
		assert.strictEqual( $( ".ui-loader h1" ).text(), "bak",
			"loader has custom message 'bak'" );
	} );

QUnit.test( "page loading should contain different theme when used in param object",
	function( assert ) {
		$.mobile.loading( "show", { theme: "l" } );

		assert.hasClasses( $( ".ui-loader" ), "ui-body-l" );
	} );

QUnit.test( "page loading should contain new html when provided, prefers passed param",
	function( assert ) {
		$.mobile.loading( "show", { html: "<div class=\"foo\"></div>" } );

		assert.strictEqual( $( ".ui-loader > div.foo" ).length, 1, "loader has custom html" );
	} );

QUnit.test( "page loading should always contain text when passed as the second arg",
	function( assert ) {

		// Simulate error call in navigation ajax error callback
		$.mobile.loading( "option", "textVisible", true ).loader( "show", "e", "foo serious",
			true );

		assert.strictEqual( $( ".ui-loader" ).text(), "foo serious",
			"loader has message regardless of global setting" );
	} );

QUnit.test( "page loading should always contain text when passed as an object prop",
	function( assert ) {
		$.mobile
			.loading( "option", "textVisible", false )

			// Simulate error call in navigation ajax error callback
			.loader( "show", {
				theme: "e",
				text: "foo serious second",
				textonly: true
			} );

		assert.strictEqual( $( ".ui-loader" ).text(), "foo serious second",
			"loader has message regardless of global setting" );
	} );

QUnit.test( "page loading should not contain text when default is used and visible prop is false",
	function( assert ) {
		$.mobile
			.loading( "option", "textVisible", false )

			// Simulate error call in navigation ajax error callback
			.loader( "show", { theme: "e", textonly: true } );

		assert.hasClasses( $( ".ui-loader" ), "ui-loader-default",
			"loader text is hidden" );
		assert.hasClasses( $( ".ui-loader" ), "ui-loader-textonly",
			"loader has class ui-loader-textonly" );

		$.mobile
			.loading( "hide" )

			// Simulate error call in navigation ajax error callback
			.loader( "show", "e", undefined, true );

		assert.hasClasses( $( ".ui-loader" ), "ui-loader-default",
			"loader text is hidden" );
	} );

QUnit.test( "test the loading config object precedence", function( assert ) {
	$.mobile
		.loading( "option", "text", "fozzle" )
		.loader( "option", "theme", "x" )
		.loader( "show" );

	assert.hasClasses( $( ".ui-loader" ), "ui-body-x", "has theme x" );
	assert.strictEqual( $( ".ui-loader h1" ).text(), "fozzle",
		"has text fozzle in loading config object" );
} );

} );
