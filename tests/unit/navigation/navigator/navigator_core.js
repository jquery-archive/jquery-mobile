// Check is the ?push-state=false is in the url and alter the tests accordingly
$.testHelper.setPushState();

(function( $ ) {
	var navigator;

	module( "Navigator object", {
		setup: function() {
			navigator = new $.mobile.Navigator( new $.mobile.History() );
		}
	});

	test( "hash function properly deduces the hash from a new url and the absolute version", function() {
		equal( navigator.hash("#foo", "http://example.com/"), "#foo" );
		equal( navigator.hash("#/foo/bar", "http://example.com/"), "#/foo/bar" );
		equal( navigator.hash("#/foo/bar?foo", "http://example.com/"), "#/foo/bar?foo" );
		equal( navigator.hash("http://example.com/#/foo/bar?foo", "http://example.com/"), "#/foo/bar?foo" );
	});
})( jQuery );