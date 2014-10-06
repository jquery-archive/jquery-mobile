( function( $, undefined ) {

module( "Toolbar" );

asyncTest( "Back button appears correctly", function() {

	expect( 2 );

	$.testHelper.pageSequence([
		function() {
			$( "#go-to-page2" ).click();
		},

		function() {
			var backBtn = $( "#header a:first" );

			deepEqual( backBtn.length, 1, "A 'Back' button was added to the header." );
			deepEqual( backBtn.attr( "role" ), "button", "The 'Back' button has the attribute " + '"' + "data-role='button'" + '"' );
			$.mobile.back();
		},

		start
	]);
});

})( jQuery );
