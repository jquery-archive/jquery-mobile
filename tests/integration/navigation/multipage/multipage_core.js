( function( $ ) {
	module( "Multipage document navigation" );

	asyncTest( "Sequence start(#page1) -> #page3 -> #page1 -> #page2 <- Back", function() {
		$.testHelper.pageSequence([
			function() {
				deepEqual( $.mobile.activePage.attr( "id" ), "page1", "Initially #page1 is active" );
				$.mobile.activePage.find( "a[href='#page3']" ).click();
			},

			function() {
				deepEqual( $.mobile.activePage.attr( "id" ), "page3", "#page3 is active after start(#page1) -> #page3" );
				$.mobile.activePage.find( "a[href='#page1']" ).click();
			},

			function() {
				deepEqual( $.mobile.activePage.attr( "id" ), "page1", "#page1 is active after #page3 -> #page1" );
				$.mobile.activePage.find( "a[href='#page2']" ).click();
			},

			function() {
				deepEqual( $.mobile.activePage.attr( "id" ), "page2", "#page2 is active after #page1 -> #page2" );
				$.mobile.back();
			},

			function() {
				deepEqual( $.mobile.activePage.attr( "id" ), "page1", "#page1 is active after #page2 <- Back" );
				start();
			}
		]);
	} );
})( jQuery );
