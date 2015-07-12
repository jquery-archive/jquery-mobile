( function( $, undefined ) {
module( "page" );

asyncTest( "Entity in page title", function() {
	$.testHelper.pageSequence( [
		function() {
			$( "#openTestPage" ).click();
		},

		function() {
			strictEqual( $.mobile.activePage.attr( "id" ), "title-test",
				"Title test page is active" );
			strictEqual( document.title.length > 0, true, "Document title is not empty" );
			strictEqual( !!document.title.match( /&([a-zA-Z]+|#([0-9]+|[xX][0-9a-fA-F]+));/ ),
				false, "Document title contains no character references" );
			$.mobile.back();
		},

		start
	] );
} );
} )( jQuery );
