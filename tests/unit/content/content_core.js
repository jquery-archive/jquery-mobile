/*
 * Content Widget Tests
 */
(function($){
	module("Content Widget");

	test( "rejects navigate events where the origina event's default is prevented", function(){
		var mockEvent = $.Event( "mock" );

		mockEvent.originalEvent = $.Event( "childmock" );
		mockEvent.originalEvent.isDefaultPrevented = function() {
			ok( true, "request for default status" );
			return true;
		};

		$.mobile.content.prototype._filterNavigateEvents( mockEvent, {} );
		$.mobile.content.prototype._handleHashChange = function() {
			throw "should not be called when the original event's default is prevented";
		};
	});
})(jQuery);
