( function( $, undefined ) {
	module( "jquery.mobile.page" );

	asyncTest( "Entity in page title", function() {
		$.testHelper.pageSequence([
			function() {
				$( "#openTestPage" ).click();
			},

			function() {
				deepEqual( $.mobile.activePage.attr( "id" ), "title-test", "Title test page is active" );
				deepEqual( document.title.length > 0, true, "Document title is not empty" );
				deepEqual( !!document.title.match(/&([a-zA-Z]+|#([0-9]+|[xX][0-9a-fA-F]+));/), false, "Document title contains no character references" );
			},

			start
		]);
	});
})( jQuery );
