/*
 * Mobile dialog unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
var home = $.mobile.path.parseUrl( location.pathname ).directory,
	homeWithSearch = home + location.search;

function jqmDataSelector( expression ) {
	return "[data-" + $.mobile.ns + expression + "]";
}

QUnit.module( "dialog", {
	setup: function() {
		$.mobile.page.prototype.options.contentTheme = "d";
		$.testHelper.navReset( homeWithSearch );
	}
} );

QUnit.asyncTest( "Test option data-close-btn", function( assert ) {
	assert.expect( 5 );

	$.testHelper.pageSequence( [
		function() {

			// Bring up the dialog
			$( "#close-button-test-link" ).click();
		},

		function() {
			var a = $( "#close-button-test .ui-toolbar-header a" );
			assert.strictEqual( a.length, 0,
				"Initially, the dialog header has no anchor elements (option value 'none')" );

			$( "#close-button-test" ).page( "option", "closeBtn", "left" );
			a = $( "#close-button-test .ui-toolbar-header a" );
			assert.strictEqual( a.length, 1,
				"The dialog header has exactly one anchor when the option value is 'left'" );
			assert.hasClasses( a, "ui-toolbar-header-button-left",
				"Close button has class ui-toolbar-header-button-left when closeBtn is 'left'" );

			$( "#close-button-test" ).page( "option", "closeBtn", "right" );
			a = $( "#close-button-test .ui-toolbar-header a" );
			assert.strictEqual( a.length, 1,
				"The dialog header has eactly one anchor when the option value is 'right'" );
			assert.hasClasses( a, "ui-toolbar-header-button-right",
				"Close button has class ui-toolbar-header-button-right when closeBtn is 'right'" );

			$.mobile.back();
		},

		function() {
			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "dialog element with no theming", function( assert ) {
	assert.expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", $( "#mypage" ) );
		},

		function() {

			// Bring up the dialog
			$( "#link-a" ).click();
		},

		function() {
			var dialog = $( "#dialog-a" );

			// Assert dialog theme inheritance (issue 1375):
			assert.hasClasses( dialog, "ui-page-theme-a",
				"Expected explicit theme ui-page-theme-a" );
			assert.hasClasses( $( ".ui-pagecontainer" ), "ui-overlay-a",
				"Expected default overlay theme ui-overlay-a" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=header" ) ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=footer" ) ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "dialog element with data-theme", function( assert ) {

	// Reset fallback theme for content
	$.mobile.page.prototype.options.contentTheme = null;

	assert.expect( 5 );

	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", $( "#mypage" ) );
		},

		function() {

			// Bring up the dialog
			$( "#link-b" ).click();
		},

		function() {
			var dialog = $( "#dialog-b" );

			// Assert dialog theme inheritance (issue 1375):
			assert.hasClasses( dialog, "ui-page-theme-e",
				"Expected explicit theme ui-page-theme-e" );
			assert.lacksClasses( $( ".ui-pagecontainer" ), "ui-overlay-b",
				"Expected no overlay theme ui-overlay-b" );
			assert.hasClasses( $( ".ui-pagecontainer" ), "ui-overlay-a",
				"Expected default overlay theme ui-overlay-a" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=header" ) ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=footer" ) ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "dialog element with data-theme & data-overlay-theme", function( assert ) {
	assert.expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", $( "#mypage" ) );
		},

		function() {

			// Bring up the dialog
			$( "#link-c" ).click();
		},

		function() {
			var dialog = $( "#dialog-c" );

			// Assert dialog theme inheritance (issue 1375):
			assert.hasClasses( dialog, "ui-page-theme-e",
				"Expected explicit theme ui-page-theme-e" );
			assert.hasClasses( $( ".ui-pagecontainer" ), "ui-overlay-b",
				"Expected explicit overlay theme ui-overlay-b" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=header" ) ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=footer" ) ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "pagecontainer is set to dialog overlayTheme at pagebeforeshow",
	function( assert ) {
		var pageTheme;

		assert.expect( 1 );

		$.testHelper.pageSequence( [
			function() {
				$( ".ui-pagecontainer" ).pagecontainer( "change", "#mypage" );
			},

			function() {

				// Bring up the dialog
				$( "#foo-dialog-link" ).click();
			},

			function() {
				pageTheme = "ui-overlay-" + $.mobile.activePage.page( "option", "overlayTheme" );

				$( ".ui-pagecontainer" ).removeClass( pageTheme );

				$.mobile.activePage
					.bind( "pagebeforeshow", function() {
						assert.hasClasses( $( ".ui-pagecontainer" ), pageTheme,
							"Page container has the same theme as the dialog overlayTheme on " +
								"pagebeforeshow" );
						QUnit.start();
					} ).trigger( "pagebeforeshow" );
			}
		] );
	} );
} );
