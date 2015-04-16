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

asyncTest( "Test option data-close-button", function() {
	expect( 5 );

	$.testHelper.pageSequence( [
		function() {
			// bring up the dialog
			$( "#close-button-test-link" ).click();
		},

		function() {
			var a = $( "#close-button-test .ui-header a" );
			deepEqual( a.length, 0, "Initially, the dialog header has no anchor elements (option value 'none')" );

			$( "#close-button-test" ).page( "option", "closeBtn", "left" );
			a = $( "#close-button-test .ui-header a" );
			deepEqual( a.length, 1, "The dialog header has eactly one anchor element when the option value is set to 'left'" );
			ok( a.hasClass( "ui-button-left" ), "The close button has class ui-button-left when the closeBtn option is set to 'left'" );
			$( "#close-button-test" ).page( "option", "closeBtn", "right" );
			a = $( "#close-button-test .ui-header a" );
			deepEqual( a.length, 1, "The dialog header has eactly one anchor element when the option value is set to 'right'" );
			ok( a.hasClass( "ui-button-right" ), "The close button has class ui-button-right when the closeBtn option is set to 'right'" );

		},

		function() {
			start();
		}
	] );
} );

asyncTest( "clicking dialog 'Close' button twice in quick succession does not cause the browser history to retreat by two", function() {
	var correctLocation;

	expect( 1 );

	$.testHelper.pageSequence( [
		function() {
			$.mobile.changePage( $( "#mypage" ) );
		},

		function() {

			$.mobile.changePage( $( "#doubleCloseTestPage" ) );
		},

		function() {

			$( "#doubleCloseTestPage a" ).click();
		},

		function( timedOut ) {
			ok( !timedOut, "Clicking dialog 'Close' has resulted in a pagechange event" );
			start();
		}
	] );
} );

asyncTest( "dialog element with no theming", function() {
	expect( 5 );

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
			ok( dialog.hasClass( "ui-page-theme-a" ), "Expected explicit theme ui-page-theme-a" );
			ok( $.mobile.pageContainer.hasClass( "ui-overlay-a" ), "Expected default overlay theme ui-overlay-a" );
			ok( dialog.find( ":jqmData(role=header)" ).hasClass( "ui-bar-inherit" ), "Expected header to inherit from dialog" );
			ok( dialog.find( ":jqmData(role=content)" ).hasClass( "ui-body-" + $.mobile.page.prototype.options.contentTheme ), "Expect content to inherit from $.mobile.page.prototype.options.contentTheme" );
			ok( dialog.find( ":jqmData(role=footer)" ).hasClass( "ui-bar-inherit" ), "Expected footer to inherit from dialog" );

			start();
		}
	] );
} );

asyncTest( "dialog element with data-theme", function() {
	// Reset fallback theme for content
	$.mobile.page.prototype.options.contentTheme = null;

	expect( 6 );

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
			ok( dialog.hasClass( "ui-page-theme-e" ), "Expected explicit theme ui-page-theme-e" );
			ok( !$.mobile.pageContainer.hasClass( "ui-overlay-b" ), "Expected no overlay theme ui-overlay-b" );
			ok( $.mobile.pageContainer.hasClass( "ui-overlay-a" ), "Expected default overlay theme ui-overlay-a" );
			ok( dialog.find( ":jqmData(role=header)" ).hasClass( "ui-bar-inherit" ), "Expected header to inherit from dialog" );
			ok( dialog.find( ":jqmData(role=content)" ).hasClass( "ui-body-e" ), "Expect content to inherit from data-theme" );
			ok( dialog.find( ":jqmData(role=footer)" ).hasClass( "ui-bar-inherit" ), "Expected footer to inherit from dialog" );

			start();
		}
	] );
} );

asyncTest( "dialog element with data-theme & data-overlay-theme", function() {
	expect( 5 );

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
			ok( dialog.hasClass( "ui-page-theme-e" ), "Expected explicit theme ui-page-theme-e" );
			ok( $.mobile.pageContainer.hasClass( "ui-overlay-b" ), "Expected explicit overlay theme ui-overlay-b" );
			ok( dialog.find( ":jqmData(role=header)" ).hasClass( "ui-bar-inherit" ), "Expected header to inherit from dialog" );
			ok( dialog.find( ":jqmData(role=content)" ).hasClass( "ui-body-" + $.mobile.page.prototype.options.contentTheme ), "Expect content to inherit from $.mobile.page.prototype.options.contentTheme" );
			ok( dialog.find( ":jqmData(role=footer)" ).hasClass( "ui-bar-inherit" ), "Expected footer to inherit from dialog" );

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
					ok( $.mobile.pageContainer.hasClass( pageTheme ), "Page container has the same theme as the dialog overlayTheme on pagebeforeshow" );
					start();
				} ).trigger( "pagebeforeshow" );
		}
	] );
} );
} )( jQuery );
