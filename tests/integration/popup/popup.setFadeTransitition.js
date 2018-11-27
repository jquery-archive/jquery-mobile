define( [ "jquery" ], function( $ ) {

	// Set the default transition to "fade" if specified in the query
	if ( !!~location.search.indexOf( "setFadeTransition" ) ) {
		$( document ).one( "mobileinit", function() {
			$.mobile.popup.prototype.options.transition = "fade";
		} );
	}
} );
