$.testHelper.delayStart();

(function( $ ) {
	module( "initial page loading tests" );

	test( "loading a url that refs an embedded page with a query param works", function() {
		ok( location.href.indexOf( "?test-query-param-hash=true" ) >= -1, "query param present in url" );
		ok( location.hash.indexOf( "loaded" ) >= -1, "the hash is targeted at the page to be loaded" );
		ok( $.mobile.activePage.attr( "id" ), "loaded", "the correct page is loaded" );
	});
})( jQuery );