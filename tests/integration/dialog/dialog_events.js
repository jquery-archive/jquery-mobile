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

asyncTest( "dialog hash is added when the dialog is opened and removed when closed", function() {
	expect( 2 );

	$.testHelper.pageSequence( [
		function() {
			//bring up the dialog
			$( "#foo-dialog-link" ).click();
		},

		function() {
			var fooDialog = $( "#foo-dialog" );

			// make sure the dialog came up
			ok( /&ui-state=dialog/.test( location.hash ), "ui-state=dialog =~ location.hash", "dialog open" );

			// close the dialog
			$( ".ui-page-dialog" ).dialog( "close" );
		},

		function() {
			ok( !( /&ui-state=dialog/.test( location.hash ) ), "ui-state=dialog !~ location.hash" );
			start();
		}
	] );
} );

asyncTest( "Test option data-close-button", function() {
	expect( 7 );

	$.testHelper.pageSequence( [
		function() {
			// bring up the dialog
			$( "#close-button-test-link" ).click();
		},

		function() {
			var a = $( "#close-button-test .ui-header a" );
			deepEqual( a.length, 0, "Initially, the dialog header has no anchor elements (option value 'none')" );

			$( "#close-button-test" ).dialog( "option", "closeBtn", "left" );
			a = $( "#close-button-test .ui-header a" );
			deepEqual( a.length, 1, "The dialog header has eactly one anchor element when the option value is set to 'left'" );
			ok( a.hasClass( "ui-button-left" ), "The close button has class ui-button-left when the closeBtn option is set to 'left'" );
			deepEqual( a.attr( "role" ), "button", "The close button has the attribute " + '"' + "role='button'" + '"' + "set" );

			$( "#close-button-test" ).dialog( "option", "closeBtn", "right" );
			a = $( "#close-button-test .ui-header a" );
			deepEqual( a.length, 1, "The dialog header has eactly one anchor element when the option value is set to 'right'" );
			ok( a.hasClass( "ui-button-right" ), "The close button has class ui-button-right when the closeBtn option is set to 'right'" );
			deepEqual( a.attr( "role" ), "button", "The close button has the attribute " + '"' + "role='button'" + '"' + "set" );

			$( "#close-button-test" ).dialog( "close" );
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
			//bring up the dialog
			$( "#link-a" ).click();
		},

		function() {
			var dialog = $( "#dialog-a" );

			// Assert dialog theme inheritance (issue 1375):
			assert.hasClasses( dialog, "ui-page-theme-a",
				"Expected explicit theme ui-page-theme-a" );
			assert.hasClasses( $.mobile.pageContainer, "ui-overlay-a",
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
			assert.lacksClasses( $.mobile.pageContainer, "ui-overlay-b",
				"Expected no overlay theme ui-overlay-b" );
			assert.hasClasses( $.mobile.pageContainer, "ui-overlay-a",
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
			assert.hasClasses( $.mobile.pageContainer, "ui-overlay-b",
				"Expected explicit overlay theme ui-overlay-b" );
			assert.hasClasses( dialog.find( ":jqmData(role=header)" ), "ui-bar-inherit",
				"Expected header to inherit from dialog" );
			assert.hasClasses( dialog.find( ":jqmData(role=footer)" ), "ui-bar-inherit",
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
			//bring up the dialog
			$( "#foo-dialog-link" ).click();
		},

		function() {
			pageTheme = "ui-overlay-" + $.mobile.activePage.dialog( "option", "overlayTheme" );

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
