// Check is the ?push-state=false is in the url and alter the tests accordingly
$.testHelper.setPushState();

(function( $ ) {
	var url = $.mobile.path.parseLocation(),
		home = url.pathname + url.search;

	module( "navigate", {
		setup: function() {
			$.mobile.navigate.history.stack = [];
			$.mobile.navigate.history.activeIndex = 0;
		},

		teardown: function() {
			stop();

			$( window ).one( "navigate", function() {
				start();
			});

			if( location.hash !== "#reset" ) {
				$.mobile.navigate( "#reset" );
			} else {
				$.mobile.navigate( "#seriously-reset" );
			}
		}
	});

	test( "navigation changes the url", function() {
		ok( location.hash.indexOf( "foo" ) == -1, "the hash is clean" );

		$.mobile.navigate( "#foo" );

		equal( location.hash, "#foo", "the hash has been altered" );
	});

	if( $.support.pushState ) {
		test( "navigation should squish the hash", function() {
			var destination = home + "#foo";

			ok( location.hash.indexOf( "foo" ) == -1, "the hash is clean" );
			ok( $.mobile.path.isPath(destination), "the destination is a path" );

			$.mobile.navigate( destination );

			equal( $.mobile.path.parseLocation().pathname, url.pathname, "the resulting url has the same pathname as the original test url" );
			equal( location.hash, "#foo", "the hash has been altered" );
		});
	}

	// Test the inclusion of state for both pushstate and hashchange
	// --nav--> #foo {state} --nav--> #bar --back--> #foo {state} --foward--> #bar {state}
	asyncTest( "navigating backward and forward should include the history state", function() {
		$.testHelper.eventTarget = $( window );

		$.testHelper.eventSequence( "navigate", [
			function( timedOut, data ) {
				$.mobile.navigate( "#foo", { foo: "bar" });
			},

			function( timedOut, data ) {
				$.mobile.navigate( "#bar", { baz: "bak" });
			},

			function( timedOut, data ) {
				window.history.back();
			},

			function( timedOut, data ) {
				equal( data.state.foo, "bar", "the data that was appended in the navigation is popped with the backward movement" );
				equal( data.state.direction, "back", "the direction is recorded as backward" );
				window.history.forward();
			},

			function( timedOut, data ) {
				equal( data.state.baz, "bak", "the data that was appended in the navigation is popped with the foward movement" );
				equal( data.state.direction, "forward", "the direction is recorded as forward" );
				start();
			}
		]);
	});

	// --nav--> #foo {state} --nav--> #bar --nav--> #foo {state} --back--> #bar --back--> #foo {state.direction = back}
	asyncTest( "navigation back to a duplicate history state should prefer back", function() {
		$.testHelper.eventTarget = $( window );

		$.testHelper.eventSequence( "navigate", [
			function() {
				$.mobile.navigate( "#foo" );
			},

			function() {
				$.mobile.navigate( "#bar" );
			},

			function() {
				$.mobile.navigate( "#baz" );
			},

			function() {
				equal( $.mobile.navigate.history.activeIndex, 2, "after n navigation events the active index is correct" );
				window.history.back();
			},

			function( timedOut, data ) {
				equal( $.mobile.navigate.history.activeIndex, 1, "after n navigation events, and a back, the active index is correct" );
				equal( data.state.direction, "back", "the direction should be back and not forward" );
				window.history.back();
			},

			function( timedOut, data ) {
				equal( $.mobile.navigate.history.stack.length, 3, "the history stack hasn't been truncated" );
				equal( $.mobile.navigate.history.activeIndex, 0, "the active history entry is the first" );
				equal( data.state.direction, "back", "the direction should be back and not forward" );
				start();
			}
		]);
	});

	asyncTest( "setting the hash with a url not in history should always create a new history entry", function() {
		$.testHelper.eventTarget = $( window );

		$.testHelper.eventSequence( "navigate", [
			function() {
				$.mobile.navigate( "#bar" );
			},

			function() {
				location.hash = "#foo";
			},

			function() {
				equal($.mobile.navigate.history.stack.length, 2, "there are two entries in the history stack" );
				equal($.mobile.navigate.history.getActive().hash, "#foo", "the url for the active history entry matches the hash" );
				start();
			}
		]);
	});

	asyncTest( "setting the hash to the existing hash should not result in a new history entry", function() {
		$.testHelper.eventTarget = $( window );

		$.testHelper.eventSequence( "navigate", [
			function() {
				location.hash = "#foo";
			},

			function() {
				equal($.mobile.navigate.history.stack.length, 1, "there is one entry in the history stack" );
				equal($.mobile.navigate.history.getActive().hash, "#foo", "the url for the active history entry matches the hash" );
				location.hash = "#foo";
			},

			function( timedOut ) {
				equal($.mobile.navigate.history.stack.length, 1, "there is one entry in the history stack" );
				equal($.mobile.navigate.history.getActive().hash, "#foo", "the url for the active history entry matches the hash" );
				ok( timedOut, "there was no navigation event from setting the same hash" );
				start();
			}
		]);
	});

	if( $.support.pushState ) {
		test( "squash is working properly", function() {
			var path = $.mobile.path, loc;
			$.mobile.navigate.navigator.squash( url.pathname + url.search + "#test-hash" );

			$.mobile.navigate.navigator.squash("#foo/bar");
			loc = path.parseLocation();
			equal( loc.pathname, url.directory + "foo/bar", "foo/bar has been squashed onto the url" );

			$.mobile.navigate.navigator.squash("bar/baz");
			loc = path.parseLocation();
			equal( loc.pathname, url.directory + "foo/bar/baz", "foo/bar has been squashed onto the url" );

			$.mobile.navigate.navigator.squash("#foo");
			loc = path.parseLocation();
			equal( loc.hash, "#foo", "foo is now the hash" );
			equal( loc.search, url.search, "the search is preserved" );

			// Make sure that the search delimiter is dictated by the squashed value
			$.mobile.navigate.navigator.squash("#foo/bar" + location.search.replace( "&", ";" ));
			loc = path.parseLocation();
			ok( loc.search.indexOf( "&" ) === -1, "the amp has been replaced" );

			$.mobile.navigate.navigator.squash( url.pathname + url.search );
		});


		test( "navigating with an absolute url matching the current url save for the hash should transplant the hash", function() {
			var loc = $.mobile.path.parseLocation();

			$.mobile.navigate( loc.hrefNoHash + loc.hash + "foo" );
			equal( location.hash, loc.hash + "foo", "the hash is set properly" );
		});
	}
})( jQuery );
