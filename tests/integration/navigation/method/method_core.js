// Check is the ?push-state=false is in the url and alter the tests accordingly

define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

$.testHelper.setPushState();

var url = $.mobile.path.parseLocation(),
	home = url.pathname + url.search;

QUnit.module( "navigate", {
	beforeEach: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
	},

	afterEach: function( assert ) {
		var ready = assert.async();

		$( window ).one( "navigate", function() {
			ready();
		} );

		if ( location.hash !== "#reset" ) {
			$.mobile.navigate( "#reset" );
		} else {
			$.mobile.navigate( "#seriously-reset" );
		}
	}
} );

QUnit.test( "navigation changes the url", function( assert ) {
	assert.ok( location.hash.indexOf( "foo" ) === -1, "the hash is clean" );

	$.mobile.navigate( "#foo" );

	assert.equal( location.hash, "#foo", "the hash has been altered" );
} );

if ( $.support.pushState ) {
	QUnit.test( "navigation should squish the hash", function( assert ) {
		var destination = home + "#foo";

		assert.ok( location.hash.indexOf( "foo" ) === -1, "the hash is clean" );
		assert.ok( $.mobile.path.isPath( destination ), "the destination is a path" );

		$.mobile.navigate( destination );

		assert.equal( $.mobile.path.parseLocation().pathname, url.pathname, "the resulting url has the same pathname as the original test url" );
		assert.equal( location.hash, "#foo", "the hash has been altered" );
	} );
}

// Test the inclusion of state for both pushstate and hashchange
// --nav--> #foo {state} --nav--> #bar --back--> #foo {state} --foward--> #bar {state}
QUnit.test( "navigating backward and forward should include the history state", function( assert ) {
	var ready = assert.async();
	$.testHelper.eventTarget = $( window );

	$.testHelper.eventSequence( "navigate", [
		function() {
			$.mobile.navigate( "#foo", { foo: "bar" } );
		},

		function() {
			$.mobile.navigate( "#bar", { baz: "bak" } );
		},

		function() {
			window.history.back();
		},

		function( timedOut, data ) {
			assert.equal( data.state.foo, "bar", "the data that was appended in the navigation is popped with the backward movement" );
			assert.equal( data.state.direction, "back", "the direction is recorded as backward" );
			window.history.forward();
		},

		function( timedOut, data ) {
			assert.equal( data.state.baz, "bak", "the data that was appended in the navigation is popped with the foward movement" );
			assert.equal( data.state.direction, "forward", "the direction is recorded as forward" );
			ready();
		}
	] );
} );

// --nav--> #foo {state} --nav--> #bar --nav--> #foo {state} --back--> #bar --back--> #foo {state.direction = back}
QUnit.test( "navigation back to a duplicate history state should prefer back", function( assert ) {
	var ready = assert.async();
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
			assert.equal( $.mobile.navigate.history.activeIndex, 2, "after n navigation events the active index is correct" );
			window.history.back();
		},

		function( timedOut, data ) {
			assert.equal( $.mobile.navigate.history.activeIndex, 1, "after n navigation events, and a back, the active index is correct" );
			assert.equal( data.state.direction, "back", "the direction should be back and not forward" );
			window.history.back();
		},

		function( timedOut, data ) {
			assert.equal( $.mobile.navigate.history.stack.length, 3, "the history stack hasn't been truncated" );
			assert.equal( $.mobile.navigate.history.activeIndex, 0, "the active history entry is the first" );
			assert.equal( data.state.direction, "back", "the direction should be back and not forward" );
			ready();
		}
	] );
} );

QUnit.test( "Entries with identical URLs are distinguishable when pushState is enabled",
	function( assert ) {
		var ready = assert.async();
		$.testHelper.eventSequence( "navigate", [
			function() {
				$.mobile.navigate( "#foo" );
			},
			function() {
				$.mobile.navigate( "#bar" );
			},
			function() {
				$.mobile.navigate( "#foo" );
			},
			function() {
				assert.deepEqual( $.mobile.navigate.history.activeIndex, $.support.pushState ? 2 : 0,
					"After sequence start -> #foo -> #bar -> #foo activeIndex is correct" );
				window.history.back();
			},
			function() {
				assert.deepEqual( $.mobile.navigate.history.activeIndex, 1,
					"After going back once in the sequence the activeIndex is correct" );
				window.history.forward();
			},
			function() {
				assert.deepEqual( $.mobile.navigate.history.activeIndex, $.support.pushState ? 2 : 0,
					"After returning to the last sequnce entry the activeIndex is correct" );
				ready();
			}
		] );
	} );

QUnit.test( "setting the hash with a url not in history should always create a new history entry", function( assert ) {
	var ready = assert.async();
	$.testHelper.eventTarget = $( window );

	$.testHelper.eventSequence( "navigate", [
		function() {
			$.mobile.navigate( "#bar" );
		},

		function() {
			location.hash = "#foo";
		},

		function() {
			assert.equal( $.mobile.navigate.history.stack.length, 2, "there are two entries in the history stack" );
			assert.equal( $.mobile.navigate.history.getActive().hash, "#foo", "the url for the active history entry matches the hash" );
			ready();
		}
	] );
} );

QUnit.test( "setting the hash to the existing hash should not result in a new history entry", function( assert ) {
	var ready = assert.async();
	$.testHelper.eventTarget = $( window );

	$.testHelper.eventSequence( "navigate", [
		function() {
			location.hash = "#foo";
		},

		function() {
			assert.equal( $.mobile.navigate.history.stack.length, 1, "there is one entry in the history stack" );
			assert.equal( $.mobile.navigate.history.getActive().hash, "#foo", "the url for the active history entry matches the hash" );
			location.hash = "#foo";
		},

		function( timedOut ) {
			assert.equal( $.mobile.navigate.history.stack.length, 1, "there is one entry in the history stack" );
			assert.equal( $.mobile.navigate.history.getActive().hash, "#foo", "the url for the active history entry matches the hash" );
			assert.ok( timedOut, "there was no navigation event from setting the same hash" );
			ready();
		}
	] );
} );

if ( $.support.pushState ) {
	QUnit.test( "squash is working properly", function( assert ) {
		var path = $.mobile.path, loc;
		$.mobile.navigate.navigator.squash( url.pathname + url.search + "#test-hash" );

		$.mobile.navigate.navigator.squash( "#foo/bar" );
		loc = path.parseLocation();
		assert.equal( loc.pathname, url.directory + "foo/bar", "foo/bar has been squashed onto the url" );

		$.mobile.navigate.navigator.squash( "bar/baz" );
		loc = path.parseLocation();
		assert.equal( loc.pathname, url.directory + "foo/bar/baz", "foo/bar has been squashed onto the url" );

		$.mobile.navigate.navigator.squash( "#foo" );
		loc = path.parseLocation();
		assert.equal( loc.hash, "#foo", "foo is now the hash" );
		assert.equal( loc.search, url.search, "the search is preserved" );

		// Make sure that the search delimiter is dictated by the squashed value
		$.mobile.navigate.navigator.squash( "#foo/bar" + location.search.replace( "&", ";" ) );
		loc = path.parseLocation();
		assert.ok( loc.search.indexOf( "&" ) === -1, "the amp has been replaced" );

		$.mobile.navigate.navigator.squash( url.pathname + url.search );
	} );

	QUnit.test( "navigating with an absolute url matching the current url save for the hash should transplant the hash", function( assert ) {
		var loc = $.mobile.path.parseLocation();

		$.mobile.navigate( loc.hrefNoHash + loc.hash + "foo" );
		assert.equal( location.hash, loc.hash + "foo", "the hash is set properly" );
	} );
}
} );
