/*
 * Mobile dialog unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
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
			$( ".ui-pagecontainer" ).pagecontainer( "change", $( "#mypage" ) );
		},

		function() {
			activePage = $.mobile.activePage;
			//Bring up the dialog
			$( "#dialog-no-hash-link" ).click();
		},

		function() {
			// Make sure the dialog came up
			assert.ok( $( "#dialog-no-hash" ).is( ":visible" ), "dialog showed up" );

			// Close the dialog
			$( "#dialog-no-hash a" ).click();
		},

		function() {
			assert.ok( !$( "#dialog-no-hash" ).is( ":visible" ), "dialog disappeared" );
			assert.ok( $.mobile.activePage[ 0 ] === activePage[ 0 ], "active page has been restored" );
			QUnit.start();
		}
	] );
} );

} );
