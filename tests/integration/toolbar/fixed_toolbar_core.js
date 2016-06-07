define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Fixed toolbar" );

QUnit.test( "Only a single back button is added to a fixed toolbar", function( assert ) {
	assert.expect( 1 );
	var ready = assert.async();

	$.testHelper.pageSequence( [
		function() {
			$( "#go-to-page-2" ).click();
		},
		function() {
			assert.deepEqual( $( "#header" ).children( "a" ).length, 1,
				"Fixed header has exactly one back button" );
			$.mobile.back();
		},
		ready
	] );
} );

} );
