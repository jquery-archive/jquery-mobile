define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.asyncTest( "Returning from a dialog results in the page from which it opened", function( assert ) {
	assert.expect( 2 );

	$.testHelper.pageSequence( [
		function() {
			$( "#openBasicDialog" ).click();
		},

		function() {
			assert.ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
			$( "a", $.mobile.activePage[ 0 ] ).click();
		},

		function() {
			assert.ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
			QUnit.start();
		}
	] );
} );

} );
