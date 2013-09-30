//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Fixes the orientation change bug in iOS when switching between landscape and portrait
//>>label: iOS Orientation Change Fix
//>>group: Utilities

define( [ "jquery", "./jquery.mobile.core", "./jquery.mobile.zoom" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, window ) {

	$.mobile.iosorientationfixEnabled = true;

	// This fix addresses an iOS bug, so return early if the UA claims it's something else.
	var ua = navigator.userAgent,
		zoom,
		evt, x, y, z, aig;
	if ( !( /iPhone|iPad|iPod/.test( navigator.platform ) && /OS [1-5]_[0-9_]* like Mac OS X/i.test( ua ) && ua.indexOf( "AppleWebKit" ) > -1 ) ) {
		$.mobile.iosorientationfixEnabled = false;
		return;
	}

	zoom = $.mobile.zoom;

	function checkTilt( e ) {
		evt = e.originalEvent;
		aig = evt.accelerationIncludingGravity;

		x = Math.abs( aig.x );
		y = Math.abs( aig.y );
		z = Math.abs( aig.z );

		// If portrait orientation and in one of the danger zones
		if ( !window.orientation && ( x > 7 || ( ( z > 6 && y < 8 || z < 8 && y > 6 ) && x > 5 ) ) ) {
				if ( zoom.enabled ) {
					zoom.disable();
				}
		}	else if ( !zoom.enabled ) {
				zoom.enable();
		}
	}

	$.mobile.document.on( "mobileinit", function() {
		if ( $.mobile.iosorientationfixEnabled ) {
			$.mobile.window
				.bind( "orientationchange.iosorientationfix", zoom.enable )
				.bind( "devicemotion.iosorientationfix", checkTilt );
		}
	});

}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
