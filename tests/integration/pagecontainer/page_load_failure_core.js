define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Pagecontainer" );

QUnit.test( "hides loader and clears transition lock when page load fails", function( assert ) {
	var ready = assert.async();
	assert.expect( 3 );

	$( document ).on( "pagecontainerloadfailed", function( event ) {

		// Prevent error message shown by default
		event.preventDefault();
		setTimeout( function() {
			assert.deepEqual( $.mobile.loading().is( ":visible" ), false, "Loader is hidden" );

			$.testHelper.pageSequence( [
				function() {
					$( "#go-to-other-page" ).click();
				},
				function() {
					assert.deepEqual( $( ".ui-pagecontainer" ).pagecontainer( "getActivePage" )
						.attr( "id" ), "other-page",
						"The other page is the active page" );
					$.mobile.back();
				},
				function() {
					assert.deepEqual( $( ".ui-pagecontainer" ).pagecontainer( "getActivePage" )
						.attr( "id" ), "start-page",
						"Returned to start page" );
					ready();
				}
			] );
		}, 500 );
	} );

	$( "#go-to-nonexistent-page" ).click();
} );

} );
