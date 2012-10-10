$.testHelper.setPushState();

(function( $) {
	module( "navigate", {
		setup: function() {
			location.hash = "";
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
			equal( data.from, $.support.pushState ? "popstate" : "hashchange", "tagged as popstate" );
			start();
		});

		location.hash = "foo";
	});

	if( $.support.pushState ) {
		asyncTest( "popstate navigation events contain pushed state", function() {
			$( window ).one( "navigate", function( event, data ) {
				$( window ).one( "navigate", function( event, data ) {
					equal( data.state.foo, "bar", "state provided properly" );
					start();
				});

				window.history.back();
			});

			window.history.replaceState({ foo: "bar" }, document.title, location.href.replace(/#.*/, "" ) + "#foo");
			location.hash = "#foo2";
		});
	} else {
		// Make sure the binding happends before any of the navigate bindings
		$( window ).bind( "hashchange", function( event ) {
			event.hashchangeState = { foo: "bar" };
		});

		asyncTest( "hashchange navigation provides for data added in a later binding", function() {
			$( window ).one( "navigate", function( event, data ) {
				equal( data.from, "hashchange", "event triggered by a hashchange" );
				equal( data.state.foo, "bar", "state provided properly" );
				start();
			});

			location.hash = "#foo2";
		});
	}
})( jQuery );