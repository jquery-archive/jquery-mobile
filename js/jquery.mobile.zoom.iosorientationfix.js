//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Fixes the iOS orientation change bug using a jQM version of this technique https://github.com/scottjehl/iOS-Orientationchange-Fix
//>>label: iOS orientation change bugfix

define( [ "jquery", "jquery.mobile.core", "jquery.mobile.zoom" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
( function( $, window ) {
    var zoom = $.mobile.zoom,
		x, y, z, aig;
	
    function checkTilt( e ){
		evt = e.originalEvent;
		aig = evt.accelerationIncludingGravity;

    	x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

        if( !window.orientation &&  ( x > 8.1 || ( ( z > 6.5 || y > 6.5 ) && x > 5.5 ) ) ){
			if( zoom.enabled ){
				zoom.disable();
			}        	
        }
		else if( !zoom.enabled ){
			zoom.enable();
        }
    }

    $( window )
		.bind( "orientationchange", zoom.enable )
		.bind( "devicemotion", checkTilt );

}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
