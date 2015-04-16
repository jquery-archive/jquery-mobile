$.testHelper.setPushState();

( function( $ ) {
module( "navigate", {
	setup: function() {
		location.hash = "";
	},

	teardown: function() {
		$( window ).unbind( "navigate" );
	}
} );

asyncTest( "changes to the url trigger a navigate", function() {
	$( window ).one( "navigate", function( event, data ) {
		ok( true, "navigate called" );
		start();
	} );

	location.hash = "foo";
} );

asyncTest( "traversing history back fires a navigate", function() {
	expect( 2 );

	$( window ).one( "navigate", function( event, data ) {
		ok( true, "navigate called on hash change" );

		$( window ).one( "navigate", function( event, data ) {
			ok( true, "navigate called on back button" );

			start();
		} );

		window.history.back();
	} );

	location.hash = "foo";
} );

asyncTest( "navigation events are marked", function() {
	$( window ).one( "navigate", function( event, data ) {
		equal( event.originalEvent.type, $.support.pushState ? "popstate" : "hashchange", "tagged as popstate" );
		start();
	} );

	location.hash = "foo";
} );

asyncTest( "navigation events can be disabled with prevent default on beforenavigate", function() {
	// Failure in this test would be 3 test assertions
	expect( 2 );

	$( window ).one( "beforenavigate", function( e ) {
		ok( true, "beforenavigate fired" );
		e.preventDefault();
	} );

	$( window ).one( "navigate", function() {
		ok( true, "navigate fired" );
		start();
	} );

	// fire a navigate that will be prevented
	location.hash = "foo";

	// fire another to absorb the navigate binding
	location.hash = "bar";
} );

asyncTest( "beforenavigate should carry the original navigation function", function() {

	$( window ).one( "beforenavigate", function( event ) {
		var type = event.originalEvent.type;

		if ( $.support.pushState ) {
			equal( type, "popstate", "the original event type is popstate" );
		} else {
			equal( type, "hashchange", "the original event type is hashchange" );
		}

		start();
	} );

	location.hash = "beforenavigate";
} );

if ( $.support.pushState ) {
	asyncTest( "popstate navigation events contain pushed state", function() {
		$.testHelper.eventTarget = $( window );

		$.testHelper.eventSequence( "navigate", [
			function() {
				window.history.replaceState( { foo: "bar" }, document.title, location.href.replace( /#.*/, "" ) + "#foo" );
				location.hash = "#foo2";
			},

			function() {
				window.history.back();
			},

			function( timedOut, data ) {
				equal( data.state.foo, "bar", "state provided properly" );
				start();
			}
		] );
	} );

	// relies on having the early popstate handler defined in early_popstate_handler.js
	asyncTest( "Default-prevented popstate does not trigger a navigate event",
		function( assert ) {
			var eventNs = ".defaultPreventedPopstate";

			assert.expect( 2 );

			$.testHelper.detailedEventCascade( [
				function() {
					window.history.replaceState( { foo: "bar" }, document.title,
						location.href.replace( /#.*/, "" ) + "#foo" );
					location.hash = "#foo2";
				},
				{
					navigate: { src: $( window ), event: "navigate" + eventNs + "1" }
				},
				function( result ) {
					assert.deepEqual( result.navigate.timedOut, false,
						"Received navigate event going forward" );
					window.preventDefaultForNextPopstate = true;
					window.history.back();
				},
				{
					navigate: { src: $( window ), event: "navigate" + eventNs + "2" }
				},
				function( result ) {
					assert.deepEqual( result.navigate.timedOut, true,
						"Received no navigate event from a default-prevented popstate" );
					delete window.preventDefaultForNextPopstate;
					start();
				}
			] );
		} );

} else {
	asyncTest( "hashchange navigation provides for data added in a later binding", function() {
		$( window ).one( "beforenavigate", function( event, data ) {
			event.originalEvent.hashchangeState = { foo: "bar" };
		} );

		$( window ).one( "navigate", function( event, data ) {
			equal( event.originalEvent.type, "hashchange", "event triggered by a hashchange" );
			equal( data.state.foo, "bar", "state provided properly" );
			start();
		} );

		location.hash = "#foo2";
	} );
}
} )( jQuery );
