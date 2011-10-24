/*
 * mobile dialog unit tests
 */
(function($) {
	module( "jquery.mobile.dialog.js" );

	asyncTest( "dialog hash is added when the dialog is opened and removed when closed", function() {
		expect( 6 );

		$.testHelper.pageSequence([
			function() {
				//bring up the dialog
				$( "#foo-dialog-link" ).click();
			},

			function() {
				var fooDialog = $( "#foo-dialog" );

				// make sure the dialog came up
				ok( /&ui-state=dialog/.test(location.hash), "ui-state=dialog =~ location.hash", "dialog open" );

				// Assert dialog theme inheritance (issue 1375):
				ok( fooDialog.hasClass( "ui-body-b" ), "Expected explicit theme ui-body-b" );
				ok( fooDialog.find( ":jqmData(role=header)" ).hasClass( "ui-bar-a" ), "Expected header to inherit from $.mobile.page.prototype.options.headerTheme" );
				ok( fooDialog.find( ":jqmData(role=content)" ).hasClass( "ui-body-d" ), "Expect content to inherit from $.mobile.page.prototype.options.contentTheme" );
				ok( fooDialog.find( ":jqmData(role=footer)" ).hasClass( "ui-bar-a" ), "Expected footer to inherit from $.mobile.page.prototype.options.footerTheme" );

				// close the dialog
				$( ".ui-dialog" ).dialog( "close" );
			},

			function() {
				ok( !/&ui-state=dialog/.test(location.hash), "ui-state=dialog !~ location.hash" );
				start();
			}
		]);
	});
})( jQuery );
