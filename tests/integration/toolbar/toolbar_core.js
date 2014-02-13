( function( $, undefined ) {

module( "Toolbar" );

test( "Links are auto-enhanced, unless data-role is set to 'none'", function() {
	var leftLink = $( "#start-page-header a:first" ),
		rightLink = $( "#start-page-header a:last" );

	deepEqual( leftLink.hasClass( "ui-btn" ), true, "Left link has been enhanced" );
	deepEqual( rightLink.hasClass( "ui-btn" ), false, "Right link has not been enhanced" );
});

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
