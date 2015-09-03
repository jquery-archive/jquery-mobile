/*
 * mobile dialog unit tests
 */
( function( QUnit, $ ) {
QUnit.module( "dialog", {
	setup: function() {
		$.mobile.page.prototype.options.contentTheme = "d";
	}
} );

QUnit.asyncTest( "dialog opens and closes correctly when hash handling is off", function( assert ) {
	var activePage;

	assert.expect( 3 );

	$.testHelper.pageSequence( [
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
			assert.ok( $( "#dialog-no-hash" ).is( ":visible" ), "dialog showed up" );

			// close the dialog
			$( "#dialog-no-hash a" ).click();
		},

		function() {
			assert.ok( !$( "#dialog-no-hash" ).is( ":visible" ), "dialog disappeared" );
			assert.ok( $.mobile.activePage[ 0 ] === activePage[ 0 ], "active page has been restored" );
			QUnit.start();
		}
	] );
} );

} )( QUnit, jQuery );
