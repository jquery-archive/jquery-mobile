(function( $ ) {
	module( "jquery.mobile.buttonMarkup.js" );

	test( "grids inside an ignored container do not enhance", function() {
		var $ignored = $( "#ignored-grid" ), $enhanced = $( "#enhanced-grid" );

		$.mobile.ignoreContentEnabled = true;

		$ignored.grid();
		same( $ignored.attr( "class" ), undefined, "ignored list doesn't have the grid theme" );

		$enhanced.grid();
		same( $enhanced.attr( "class" ).indexOf("ui-grid"), 0, "enhanced list has the grid theme" );

		$.mobile.ignoreContentEnabled = false;
	});
})( jQuery );