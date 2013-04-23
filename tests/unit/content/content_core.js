/*
 * Content Widget Tests
 */
(function($){
	var mockEvent;

	module("Content Widget _filterNavigateEvents", {
		setup: function() {
			mockEvent = $.Event( "mock" );
			mockEvent.originalEvent = $.Event( "hashchange" );
		}
	});

	test( "rejects navigate events where the origina event's default is prevented", function(){
		expect( 1 );

		mockEvent.originalEvent.isDefaultPrevented = function() {
			ok( true, "request for default status" );
			return true;
		};

		$.mobile.content.prototype._handleHashChange = function() {
			throw "should not be called when the original event's default is prevented";
		};

		$.mobile.content.prototype._filterNavigateEvents( mockEvent, {} );
	});

	test( "uses the hash in the state when the original event is a hashchange", function() {
		expect( 2 );

		$.mobile.content.prototype._handleHashChange = function( url, state ) {
			equal( url, "foo", "the url is the hash stored in the state" );
			equal( state.hash, url, "hash stored in the state is used as the url" );
		};

		$.mobile.content.prototype._filterNavigateEvents( mockEvent, { state: { hash: "foo" }} );
	});
})(jQuery);
