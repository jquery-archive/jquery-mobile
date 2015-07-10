/*
 * mobile dialog unit tests
 */
( function( $ ) {
var home = $.mobile.path.parseUrl( location.pathname ).directory,
	homeWithSearch = home + location.search;

function jqmDataSelector( expression ) {
	return "[data-" + $.mobile.ns + expression + "]";
}

module( "dialog", {
	setup: function() {
		$.mobile.page.prototype.options.contentTheme = "d";
		$.testHelper.navReset( homeWithSearch );
	}
} );

asyncTest( "Test option data-close-btn", function( assert ) {
	expect( 5 );

	$.testHelper.pageSequence( [
		function() {

			// Bring up the dialog
			$( "#close-button-test-link" ).click();
		},

		function() {
			var a = $( "#close-button-test .ui-header a" );
			assert.strictEqual( a.length, 0,
				"Initially, the dialog header has no anchor elements (option value 'none')" );

			$( "#close-button-test" ).page( "option", "closeBtn", "left" );
			a = $( "#close-button-test .ui-header a" );
			assert.strictEqual( a.length, 1,
				"The dialog header has exactly one anchor when the option value is 'left'" );
			assert.hasClasses( a, "ui-button-left",
				"The close button has class ui-button-left when the closeBtn option is 'left'" );

			$( "#close-button-test" ).page( "option", "closeBtn", "right" );
			a = $( "#close-button-test .ui-header a" );
			assert.strictEqual( a.length, 1,
				"The dialog header has eactly one anchor when the option value is 'right'" );
			assert.hasClasses( a, "ui-button-right",
				"The close button has class ui-button-right when the closeBtn option is 'right'" );

			$.mobile.back();
		},

		function() {
			start();
		}
	] );
} );

asyncTest( "dialog element with no theming", function( assert ) {
	expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( $( "#mypage" ) );
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
			assert.hasClasses( $.mobile.pageContainer, "ui-overlay-a",
				"Expected default overlay theme ui-overlay-a" );
			assert.hasClasses( dialog.find( jqmDataSelector( "role=header" ) ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( jqmDataSelector( "role=footer" ) ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			start();
		}
	] );
} );

asyncTest( "dialog element with data-theme", function( assert ) {

	// Reset fallback theme for content
	$.mobile.page.prototype.options.contentTheme = null;

	expect( 5 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( $( "#mypage" ) );
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
			assert.lacksClasses( $.mobile.pageContainer, "ui-overlay-b",
				"Expected no overlay theme ui-overlay-b" );
			assert.hasClasses( $.mobile.pageContainer, "ui-overlay-a",
				"Expected default overlay theme ui-overlay-a" );
			assert.hasClasses( dialog.find( jqmDataSelector( "role=header" ) ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( jqmDataSelector( "role=footer" ) ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			start();
		}
	] );
} );

asyncTest( "dialog element with data-theme & data-overlay-theme", function( assert ) {
	expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( $( "#mypage" ) );
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
			assert.hasClasses( $.mobile.pageContainer, "ui-overlay-b",
				"Expected explicit overlay theme ui-overlay-b" );
			assert.hasClasses( dialog.find( jqmDataSelector( "role=header" ) ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( jqmDataSelector( "role=footer" ) ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			start();
		}
	] );
} );

asyncTest( "pagecontainer is set to dialog overlayTheme at pagebeforeshow", function( assert ) {
	var pageTheme;

	expect( 1 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#mypage" );
		},

		function() {

			// Bring up the dialog
			$( "#foo-dialog-link" ).click();
		},

		function() {
			pageTheme = "ui-overlay-" + $.mobile.activePage.page( "option", "overlayTheme" );

			$.mobile.pageContainer.removeClass( pageTheme );

			$.mobile.activePage
				.bind( "pagebeforeshow", function() {
					assert.hasClasses( $.mobile.pageContainer, pageTheme,
						"Page container has the same theme as the dialog overlayTheme on " +
							"pagebeforeshow" );
					start();
				} ).trigger( "pagebeforeshow" );
		}
	] );
} );
} )( jQuery );
