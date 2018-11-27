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

QUnit.asyncTest( "test option overlayTheme", function( assert ) {
	$.testHelper.pageSequence( [

		function() {
			$( "#open-overlayTheme-test" ).click();
		},

		function() {
			assert.strictEqual( $( ".ui-page-active" ).attr( "id" ), "overlayTheme-test",
				"overlayTheme test dialog is active" );
			assert.hasClasses( $( "body" ), "ui-overlay-x",
				"Page container has swatch specified in the data attribute" );

			$( ".ui-page-active" ).page( "option", "overlayTheme", "y" );
			assert.hasClasses( $( "body" ), "ui-overlay-y",
				"Page container has swatch applied via option change" );

			$.mobile.back();
		},

		QUnit.start

	] );
} );

QUnit.asyncTest( "Test option data-close-btn", function( assert ) {
	assert.expect( 7 );

	$.testHelper.pageSequence( [
		function() {

			// Bring up the dialog
			$( "#close-button-test-link" ).click();
		},

		function() {
			var a,
				dialog = $( "#close-button-test" );

			assert.strictEqual( $( "#close-button-test .ui-toolbar-header a" ).length, 0,
				"Initially, the dialog header has no anchor elements (option value 'none')" );

			dialog.page( "option", "closeBtn", "left" );
			a = $( "#close-button-test .ui-toolbar-header a" );
			assert.strictEqual( a.length, 1,
				"The dialog header has exactly one anchor when the option value is 'left'" );
			assert.hasClasses( a, "ui-toolbar-header-button-left",
				"The close button has class ui-button-left when the closeBtn option is set " +
				"to 'left'" );

			dialog.page( "option", {
				"closeBtn": "right",
				"closeBtnText": "Custom text"
			} );
			a = $( "#close-button-test .ui-toolbar-header a" );
			assert.strictEqual( a.length, 1,
				"The dialog header has exactly one anchor when the option value is 'right'" );
			assert.hasClasses( a, "ui-toolbar-header-button-right",
				"The close button has class ui-button-right when the closeBtn option is set " +
				"to 'right'" );
			assert.strictEqual( a.text(), "Custom text", "Anchor text updated via option" );

			dialog.page( "option", "closeBtn", "none" );
			assert.strictEqual( $( "#close-button-test .ui-toolbar-header a" ).length, 0,
				"Initially, the dialog header has no anchor elements (option value 'none')" );
		},

		QUnit.start
	] );
} );

QUnit.asyncTest( "Clicking dialog 'Close' button renders it unclickable", function( assert ) {
	var correctLocation;

	assert.expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", $( "#mypage" ) );
		},

		function() {
			$( ".ui-pagecontainer" ).pagecontainer( "change", $( "#doubleCloseTestPage" ) );
		},

		function() {
			correctLocation = location.href;
			$( "#doubleCloseTestPage a" ).click();
		},

		function() {
			var closeButton = $( "#foo-dialog a" ).first().click();

			assert.strictEqual( closeButton.css( "pointer-events" ), "none",
				"Close button has pointer events turned off post-click" );
			assert.strictEqual( closeButton.attr( "tabindex" ), "-1",
				"Close button tabindex is set to -1 post-click" );
		},

		function( timedOut ) {
			assert.ok( !timedOut, "Clicking dialog 'Close' has resulted in a pagechange event" );
			assert.strictEqual( location.href, correctLocation, "Location is correct afterwards" );
			$.mobile.back();
		},

		QUnit.start
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
			assert.hasClasses( $( "body" ), "ui-overlay-a",
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
			assert.lacksClasses( $( "body" ), "ui-overlay-b",
				"Expected no overlay theme ui-overlay-b" );
			assert.hasClasses( $( "body" ), "ui-overlay-a",
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
			assert.hasClasses( $( "body" ), "ui-overlay-b",
				"Expected explicit overlay theme ui-overlay-b" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=header" ) ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( jqmDataSelector( "type=footer" ) ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "page container is updated to dialog overlayTheme at pagebeforeshow",
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
				pageTheme = "ui-overlay-" +
					$( ".ui-page-active" ).page( "option", "overlayTheme" );

				$( ".ui-pagecontainer" ).removeClass( pageTheme );

				$( ".ui-page-active" )
					.bind( "pagebeforeshow", function() {
						assert.ok( $( ".ui-pagecontainer" ).hasClass( pageTheme ),
							"Page container has the same theme as the dialog overlayTheme on " +
								"pagebeforeshow" );
						QUnit.start();
					} ).trigger( "pagebeforeshow" );
			}
		] );
	} );

QUnit.asyncTest( "pre-rendered dialog options work", function( assert ) {
	assert.expect( 3 );

	$.testHelper.pageSequence( [
		function() {
			$( "#open-enhanced-dialog" ).click();
		},
		function() {
			assert.strictEqual( $( ".ui-page-active" ).attr( "id" ), "enhanced-dialog",
				"enhanced dialog is the current page" );

			$( "#enhanced-dialog" ).page( "option", "closeBtn", "right" );
			assert.hasClasses( $( "#enhanced-dialog a" ), "ui-toolbar-header-button-right",
				"enhanced dialog button location can be changed" );
			assert.lacksClasses( $( "#enhanced-dialog a" ), "ui-toolbar-header-button-left",
				"enhanced dialog button does not retain old location" );

			$.mobile.back();
		},
		QUnit.start
	] );
} );

} );
