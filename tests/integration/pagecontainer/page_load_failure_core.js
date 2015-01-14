module( "Pagecontainer" );

asyncTest( "hides loader and clears transition lock when page load fails", function() {
	expect( 3 );

	$( document ).on( "pagecontainerloadfailed", function( event ) {

		// Prevent error message shown by default
		event.preventDefault();
		setTimeout( function() {
			deepEqual( $.mobile.loading().is( ":visible" ), false, "Loader is hidden" );

			$.testHelper.pageSequence([
				function() {
					$( "#go-to-other-page" ).click();
				},
				function() {
					deepEqual( $.mobile.pageContainer.pagecontainer( "getActivePage" )
						.attr( "id" ), "other-page",
						"The other page is the active page" );
					$.mobile.back();
				},
				function() {
					deepEqual( $.mobile.pageContainer.pagecontainer( "getActivePage" )
						.attr( "id" ), "start-page",
						"Returned to start page" );
					start();
				}
			]);
		}, 500 );
	});

	$( "#go-to-nonexistent-page" ).click();
});
