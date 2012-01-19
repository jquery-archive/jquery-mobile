//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Fixes the iOS orientation change bug using a jQM version of this technique https://github.com/scottjehl/iOS-Orientationchange-Fix
//>>label: iOS orientation change bugfix

define( [ "jquery", "jquery.mobile.core", "jquery.mobile.zoom" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
( function( $, window ) {
    var zoom = $.mobile.zoom,
        rotation = 0,
		x = y = z = 0,
		orientation, aig;
	
    function checkTilt( e ){
		evt = e.originalEvent;
        orientation = window.orientation;
		aig = evt.accelerationIncludingGravity;
		
		if( aig ){
        	x = Math.abs( aig.x );
			y = Math.abs( aig.y );
			z = Math.abs( aig.z );
		}

        if( orientation === 0 && ( e.type === "deviceorientation" || x > 7 || ( z > 4 && ( x > 6 || y > 6 ) ) ) ){
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
		.bind( "deviceorientation devicemotion", checkTilt );

}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
