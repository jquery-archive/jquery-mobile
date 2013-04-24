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

		proto._handleNavigate = function() {
			throw "should not be called when the original event's default is prevented";
		};

		proto._filterNavigateEvents( mockEvent, {} );
	});

	test( "uses the hash in the state when the original event is a hashchange", function() {
		expect( 2 );

		proto._handleNavigate = function( url, state ) {
			equal( url, "foo", "the url is the hash stored in the state" );
			equal( state.hash, url, "hash stored in the state is used as the url" );
		};

		proto._filterNavigateEvents( mockEvent, { state: { hash: "foo" }} );
	});

	test( "uses the url in the state when the original event is NOT a hashchange", function() {
		expect( 2 );

		mockEvent.originalEvent = $.Event( "other" );

		proto._handleNavigate = function( url, state ) {
			equal( url, "bar", "the url is the url stored in the state: " + url );
			equal( state.url, url, "url stored in the state is used as the url: " + state.url );
		};

		proto._filterNavigateEvents( mockEvent, { state: { url: "bar" }} );
	});

	test( "uses the current hash when no url or hash is present", function() {
		expect( 1 );

		proto._handleNavigate = function( url, state ) {
			equal( url, "baz", "the url is the hash stored in the state" );
		};

		proto._getHash = function() {
			return "baz";
		};

		proto._filterNavigateEvents( mockEvent, { state: {}} );
	});

	test( "uses the current url when no hash is present", function() {
		expect( 1 );

		proto._handleNavigate = function( url, state ) {
			equal( url, location.href, "the url is the hash stored in the state" );
		};

		proto._getHash = function() {
			return "";
		};

		proto._filterNavigateEvents( mockEvent, { state: {}} );
	});

	module("Content Widget _handleDialog", {
		setup: function() {
			proto = $.mobile.content.prototype;
		}
	});

	test( "continues backward when the active content isn't a dialog", function() {
		expect( 2 );

		proto._getActiveContent = function() {
			return $( "<div>" );
		};

		proto._back = function(){
			ok( true, "back called" );
		};

		ok( !proto._handleDialog( {}, {direction: "back"} ), "returns false to prevent action" );
	});

	test( "continues forward when the active content isn't a dialog", function() {
		expect( 2 );

		proto._getActiveContent = function() {
			return $( "<div>" );
		};

		proto._forward = function(){
			ok( true, "forward called" );
		};

		ok( !proto._handleDialog( {}, {direction: "forward"} ), "returns false to prevent action" );
	});

	test( "extends changePageOptions when current content is a dialog", function() {
		var result, opts = {};

		proto._getActiveContent = function() {
			return $( "<div>", {"class": "ui-dialog"} );
		};

		proto._getActiveHistory = function() {
			return {
				role: "foo",
				transition: "bar"
			};
		};

		equal( opts.role, undefined );
		equal( opts.transition, undefined );
		equal( opts.reverse, undefined );

		// the pageUrl is returned for use as the target url when the active content is a dialog
		equal( proto._handleDialog( opts, {direction: "back", pageUrl: "baz" } ), "baz" );

		equal( opts.role, "foo" );
		equal( opts.transition, "bar" );
		equal( opts.reverse, true );
	});

	var base = "http://example.com/";

	module("Content Widget _handleUrl", {
		setup: function() {
			proto = $.mobile.content.prototype;
			proto._getHistory = function() {
				return {
					initialDst: "foo",
					stack: []
				};
			};

			proto._getDocumentBase = function() {
				return base;
			};
		}
	});

	test( "skips manipulation if to is undefined", function() {
		equal( "", proto._handleUrl( "" ), "avoids manip" );
	});

	test( "returns an absolute url when the argument is just a hash", function() {
		equal( base + "#foo", proto._handleUrl( "#foo" ) );
	});

	test( "returns the hashless value when the argument is a path", function() {
		equal( "foo/bar", proto._handleUrl( "#foo/bar" ) );
	});
})(jQuery);
