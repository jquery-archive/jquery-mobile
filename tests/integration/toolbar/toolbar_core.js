define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Toolbar" );

QUnit.test( "Back button appears correctly", function( assert ) {

	assert.expect( 2 );

	var done = assert.async();

	$.testHelper.pageSequence( [
		function() {
			$( "#go-to-page2" ).click();
		},

		function() {
			var backBtn = $( "#header a:first" );

			assert.deepEqual( backBtn.length, 1, "A 'Back' button was added to the header." );
			assert.deepEqual( backBtn.attr( "role" ), "button",
				"The 'Back' button has the attribute " + "\"" + "data-role='button'" + "\"" );
			$.mobile.back();
		},

		done
	] );
} );

} );
