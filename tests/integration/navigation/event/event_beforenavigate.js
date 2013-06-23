$.testHelper.setPushState();

(function( $ ) {
	module( "beforenavigate", {
		setup: function() {
			location.hash = "";
		},

		teardown: function() {
			$( window ).unbind( "beforenavigate" );
		}
	});

	asyncTest( "changes to the url trigger a beforenavigate", function() {
		setTimeout( function() {
			ok( false, "beforenavigate should have been triggered" );
			start();
		}, 3000 );
		$( window ).one( "beforenavigate", function( event, data ) {
			ok( true, "beforenavigate should have been triggered" );
			start();
		});

		location.hash = "foo";
	});

})( jQuery );
