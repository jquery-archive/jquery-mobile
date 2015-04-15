/*
 * mobile dialog unit tests
 */
( function( $ ) {
var home = $.mobile.path.parseUrl( location.pathname ).directory,
	homeWithSearch = home + location.search;

module( "dialog", {
	setup: function() {
		$.mobile.page.prototype.options.contentTheme = "d";
		$.testHelper.navReset( homeWithSearch );
	}
} );

asyncTest( "test option overlayTheme", function( assert ) {
	$.testHelper.pageSequence( [

		function() {
			$( "#open-overlayTheme-test" ).click();
		},

		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "overlayTheme-test",
				"overlayTheme test dialog is active" );
			assert.hasClasses( $( "body" ), "ui-overlay-x",
				"Page container has swatch specified in the data attribute" );

			$.mobile.activePage.page( "option", "overlayTheme", "y" );
			assert.hasClasses( $( "body" ), "ui-overlay-y",
				"Page container has swatch applied via option change" );

			$.mobile.back();
		},

		start

	] );
} );

asyncTest( "Test option data-close-btn", function( assert ) {
	expect( 7 );

	$.testHelper.pageSequence( [
		function() {
			// bring up the dialog
			$( "#close-button-test-link" ).click();
		},

		function() {
			var a,
				dialog = $( "#close-button-test" );

			assert.strictEqual( $( "#close-button-test .ui-header a" ).length, 0,
				"Initially, the dialog header has no anchor elements (option value 'none')" );

			dialog.page( "option", "closeBtn", "left" );
			a = $( "#close-button-test .ui-header a" );
			assert.strictEqual( a.length, 1,
				"The dialog header has exactly one anchor when the option value is 'left'" );
			assert.hasClasses( a, "ui-button-left",
				"The close button has class ui-button-left when the closeBtn option is set " +
				"to 'left'" );

			dialog.page( "option", {
				"closeBtn": "right",
				"closeBtnText": "Custom text"
			} );
			a = $( "#close-button-test .ui-header a" );
			assert.deepEqual( a.length, 1,
				"The dialog header has exactly one anchor when the option value is 'right'" );
			assert.hasClasses( a, "ui-button-right",
				"The close button has class ui-button-right when the closeBtn option is set " +
				"to 'right'" );
			assert.strictEqual( a.text(), "Custom text", "Anchor text updated via option" );

			dialog.page( "option", "closeBtn", "none" );
			assert.strictEqual( $( "#close-button-test .ui-header a" ).length, 0,
				"Initially, the dialog header has no anchor elements (option value 'none')" );
		},

		start
	] );
} );

asyncTest( "Clicking dialog 'Close' button renders it unclickable", function() {
	var correctLocation;

	expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( $( "#mypage" ) );
		},

		function() {
			$.mobile.changePage( $( "#doubleCloseTestPage" ) );
		},

		function() {
			correctLocation = location.href;
			$( "#doubleCloseTestPage a" ).click();
		},

		function() {
			var closeButton = $( "#foo-dialog a" ).click();

			strictEqual( closeButton.css( "pointer-events" ), "none",
				"Close button has pointer events turned off post-click" );
			strictEqual( closeButton.attr( "tabindex" ), "-1",
				"Close button tabindex is set to -1 post-click" );
		},

		function( timedOut ) {
			ok( !timedOut, "Clicking dialog 'Close' has resulted in a pagechange event" );
			ok( location.href === correctLocation, "Location is correct afterwards" );
			$.mobile.back();
		},

		start
	] );
} );

asyncTest( "dialog element with no theming", function( assert ) {
	expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( $( "#mypage" ) );
		},

		function() {
			//bring up the dialog
			$( "#link-a" ).click();
		},

		function() {
			var dialog = $( "#dialog-a" );

			// Assert dialog theme inheritance (issue 1375):
			assert.hasClasses( dialog, "ui-page-theme-a",
				"Expected explicit theme ui-page-theme-a" );
			assert.hasClasses( $( "body" ), "ui-overlay-a",
				"Expected default overlay theme ui-overlay-a" );
			assert.hasClasses( dialog.find( ":jqmData(role=header)" ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( ":jqmData(role=footer)" ), "ui-bar-inherit",
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
			//bring up the dialog
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
			assert.hasClasses( dialog.find( ":jqmData(role=header)" ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( ":jqmData(role=footer)" ), "ui-bar-inherit",
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
			//bring up the dialog
			$( "#link-c" ).click();
		},

		function() {
			var dialog = $( "#dialog-c" );
			// Assert dialog theme inheritance (issue 1375):
			assert.hasClasses( dialog, "ui-page-theme-e",
				"Expected explicit theme ui-page-theme-e" );
			assert.hasClasses( $( "body" ), "ui-overlay-b",
				"Expected explicit overlay theme ui-overlay-b" );
			assert.hasClasses( dialog.find( ":jqmData(role=header)" ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( ":jqmData(role=footer)" ), "ui-bar-inherit",
				"Expected footer to inherit from dialog" );

			start();
		}
	] );
} );

asyncTest( "page container is updated to dialog overlayTheme at pagebeforeshow", function() {
	var pageTheme;

	expect( 1 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( "#mypage" );
		},

		function() {
			//bring up the dialog
			$( "#foo-dialog-link" ).click();
		},

		function() {
			pageTheme = "ui-overlay-" + $.mobile.activePage.page( "option", "overlayTheme" );

			$.mobile.pageContainer.removeClass( pageTheme );

			$.mobile.activePage
				.bind( "pagebeforeshow", function() {
					ok( $.mobile.pageContainer.hasClass( pageTheme ),
						"Page container has the same theme as the dialog overlayTheme on " +
							"pagebeforeshow" );
					start();
				} ).trigger( "pagebeforeshow" );
		}
	] );
} );

asyncTest( "pre-rendered dialog options work", function( assert ) {
	expect( 4 );

	$.testHelper.pageSequence( [
		function() {
			$( "#open-enhanced-dialog" ).click();
		},
		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "enhanced-dialog",
				"enhanced dialog is the current page" );

			$( "#enhanced-dialog" ).page( "option", "closeBtn", "right" );
			assert.hasClasses( $( "#enhanced-dialog a" )[ 0 ], "ui-button-right",
				"enhanced dialog button location can be changed" );
			assert.lacksClasses( $( "#enhanced-dialog a" )[ 0 ], "ui-button-left",
				"enhanced dialog button does not retain old location" );

			$( "#enhanced-dialog" ).page( "option", "corners", false );
			assert.lacksClasses( $( "#enhanced-dialog .ui-page-dialog-contain" ),
				"ui-corner-all", "Corner class absent after option was turned off" );

			$.mobile.back();
		},
		start
	] );
} );

} )( jQuery );
