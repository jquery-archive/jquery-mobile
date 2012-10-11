// Check is the ?push-state=false is in the url and alter the tests accordingly
$.testHelper.setPushState();

(function( $ ) {
	var url = $.mobile.path.parseLocation(),
		home = url.pathname + url.search;

	module( "navigate", {
		setup: function() {
			stop();

			$( window ).one( "navigate", function() {
				start();
			});

			if( location.hash !== "#reset" ) {
				$.navigate( "#reset" );
			}

			$.navigate.history.stack = [];
		}
	});

	test( "navigation changes the url", function() {
		ok( location.hash.indexOf( "foo" ) == -1, "the hash is clean" );

		$.navigate( "#foo" );

		equal( location.hash, "#foo", "the hash has been altered" );
	});

	if( $.support.pushState ) {
		test( "navigation should squish the hash", function() {
			var destination = home + "#foo";

			ok( location.hash.indexOf( "foo" ) == -1, "the hash is clean" );
			ok( $.mobile.path.isPath(destination), "the destination is a path" );

			$.navigate( destination );

			equal( $.mobile.path.parseLocation().pathname, url.pathname, "the resulting url has the same pathname as the original test url" );
			equal( location.hash, "#foo", "the hash has been altered" );
		});
	} else {
		test( "navigation should append the hash with a path", function() {
			var destination = home + "#foo";

			ok( location.hash.indexOf(home) == -1, "the hash is clean" );
			ok( $.mobile.path.isPath(destination), "the destination is a path" );

			$.navigate( destination );

			equal( $.mobile.path.parseLocation().hash, "#" + destination, "the resulting url has the same pathname as the original test url" );
		});
	}

	if( !$.support.pushState ) {
		asyncTest( "navigating backward should include the history state", function() {
			$( window ).one( "navigate", function() {
				$.navigate( "#bar" );

				$( window ).one( "navigate", function() {
					window.history.back();

					$( window ).one( "navigate", function( event, data ) {
						equal( data.state.foo, "bar", "the data that was appended in the navigation is popped with the backward movement" );
						start();
					});
				});
			});

			$.navigate( "#foo", { foo: "bar" });
		});
	}
})( jQuery );