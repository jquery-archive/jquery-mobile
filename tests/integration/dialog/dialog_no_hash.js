/*
 * mobile dialog unit tests
 */
(function($) {
	module( "jquery.mobile.dialog.js", {
		setup: function() {
			$.mobile.page.prototype.options.contentTheme = "d";
		}
	});

	asyncTest( "dialog opens and closes correctly when hash handling is off", function() {
		var activePage;

		expect( 3 );

		$.testHelper.pageSequence([
			function() {
				$.mobile.changePage( $( "#mypage" ) );
			},

			function() {
				activePage = $.mobile.activePage;
				//bring up the dialog
				$( "#dialog-no-hash-link" ).click();
			},

			function() {
				// make sure the dialog came up
				ok( $( "#dialog-no-hash" ).is( ":visible" ), "dialog showed up" );

				// close the dialog
				$( "#dialog-no-hash a" ).click();
			},

			function() {
				ok( !$( "#dialog-no-hash" ).is( ":visible" ), "dialog disappeared" );
				ok( $.mobile.activePage[0] === activePage[0], "active page has been restored" );
				start();
			}
		]);
	});

})( jQuery );
