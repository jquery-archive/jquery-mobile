module( "Fixed toolbar" );

asyncTest( "Only a single back button is added to a fixed toolbar", function() {
	expect( 1 );
	$.testHelper.pageSequence([
		function() {
			$( "#go-to-page-2" ).click();
		},
		function() {
			deepEqual( $( "#header" ).children( "a" ).length, 1,
				"Fixed header has exactly one back button" );
			$.mobile.back();
		},
		start
	]);
});
