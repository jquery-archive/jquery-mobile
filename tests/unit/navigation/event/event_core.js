$.testHelper.setPushState();

(function( $ ) {
	module( "navigate", {
		setup: function() {
			location.hash = "";
		},

		teardown: function() {
			$( window ).unbind( "navigate" );
		}
	});

	asyncTest( "changes to the url trigger a navigate", function() {
		$( window ).one( "navigate", function( event, data ) {
			ok( true, "navigate called" );
			start();
		});

		location.hash = "foo";
	});

	asyncTest( "traversing history back fires a navigate", function() {
		expect( 2 );

		$( window ).one( "navigate", function( event, data ) {
			ok( true, "navigate called on hash change" );

			$( window ).one( "navigate", function( event, data ) {
				ok( true, "navigate called on back button" );

				start();
			});

			window.history.back();
		});

		location.hash = "foo";
	});

	asyncTest( "navigation events are marked", function() {
		$( window ).one( "navigate", function( event, data ) {
			equal( event.originalEvent.type, $.support.pushState ? "popstate" : "hashchange", "tagged as popstate" );
			start();
		});

		location.hash = "foo";
	});

	asyncTest( "navigation events can be disabled with prevent default on beforenavigate", function() {
		// Failure in this test would be 3 test assertions
		expect( 2 );

		$( window ).one( "beforenavigate", function( e ) {
			ok( true, "beforenavigate fired" );
			e.preventDefault();
		});

		$( window ).one( "navigate", function() {
			ok( true, "navigate fired" );
			start();
		});

		// fire a navigate that will be prevented
		location.hash = "foo";

		// fire another to absorb the navigate binding
		location.hash = "bar";
	});

	if( $.support.pushState ) {
		asyncTest( "popstate navigation events contain pushed state", function() {
			$.testHelper.eventTarget = $( window );

			$.testHelper.eventSequence( "navigate", [
				function() {
					window.history.replaceState({ foo: "bar" }, document.title, location.href.replace(/#.*/, "" ) + "#foo");
					location.hash = "#foo2";
				},

				function() {
					window.history.back();
				},

				function( timedOut, data ) {
					equal( data.state.foo, "bar", "state provided properly" );
					start();
				}
			]);
		});
	} else {
		// Make sure the binding happends before any of the navigate bindings
		$( window ).bind( "hashchange", function( event ) {
			event.hashchangeState = { foo: "bar" };
		});

		asyncTest( "hashchange navigation provides for data added in a later binding", function() {
			$( window ).one( "navigate", function( event, data ) {
				equal( event.originalEvent.type, "hashchange", "event triggered by a hashchange" );
				equal( data.state.foo, "bar", "state provided properly" );
				start();
			});

			location.hash = "#foo2";
		});
	}
})( jQuery );