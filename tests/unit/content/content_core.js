/*
 * Content Widget Tests
 */
(function($){
	var mockEvent, proto;

	module("Content Widget _filterNavigateEvents", {
		setup: function() {
			mockEvent = $.Event( "mock" );
			mockEvent.originalEvent = $.Event( "hashchange" );
			proto = $.mobile.content.prototype;
		}
	});

	test( "rejects navigate events where the origina event's default is prevented", function(){
		expect( 1 );

		mockEvent.originalEvent.isDefaultPrevented = function() {
			ok( true, "request for default status" );
			return true;
		};

		proto._handleHashChange = function() {
			throw "should not be called when the original event's default is prevented";
		};

		proto._filterNavigateEvents( mockEvent, {} );
	});

	test( "uses the hash in the state when the original event is a hashchange", function() {
		expect( 2 );

		proto._handleHashChange = function( url, state ) {
			equal( url, "foo", "the url is the hash stored in the state" );
			equal( state.hash, url, "hash stored in the state is used as the url" );
		};

		proto._filterNavigateEvents( mockEvent, { state: { hash: "foo" }} );
	});

	test( "uses the url in the state when the original event is NOT a hashchange", function() {
		expect( 2 );

		mockEvent.originalEvent = $.Event( "other" );

		proto._handleHashChange = function( url, state ) {
			equal( url, "bar", "the url is the url stored in the state: " + url );
			equal( state.url, url, "url stored in the state is used as the url: " + state.url );
		};

		proto._filterNavigateEvents( mockEvent, { state: { url: "bar" }} );
	});

	test( "uses the current hash when no url or hash is present", function() {
		expect( 1 );

		proto._handleHashChange = function( url, state ) {
			equal( url, "baz", "the url is the hash stored in the state" );
		};

		proto._getHash = function() {
			return "baz";
		};

		proto._filterNavigateEvents( mockEvent, { state: {}} );
	});

	test( "uses the current url when no hash is present", function() {
		expect( 1 );

		proto._handleHashChange = function( url, state ) {
			equal( url, location.href, "the url is the hash stored in the state" );
		};

		proto._getHash = function() {
			return "";
		};

		proto._filterNavigateEvents( mockEvent, { state: {}} );
	});
})(jQuery);
