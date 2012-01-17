//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Fixes the iOS orientation change bug using a jQM version of this technique https://github.com/scottjehl/iOS-Orientationchange-Fix
//>>label: iOS orientation change bugfix

define( [ "jquery", "jquery.mobile.core", "jquery.mobile.zoom" ], function( $ ) {
//>>excludeEnd("jqmBuildExclude");
( function( $, window ) {
    var orientation = window.orientation,
        rotation = 0;

    function checkTilt( e ){
		e = e.originalEvent;
        orientation = Math.abs( window.orientation );
        rotation = Math.abs( e.gamma );

        if( rotation > 8 && orientation === 0 ){
            if( $.mobile.zoom.enabled ){
                $.mobile.zoom.disable();
            }   
        }
        else {
            if( !$.mobile.zoom.enabled ){
                $.mobile.zoom.enable();
            }
        }
    }

    $( window )
		.bind( "orientationchange", $.mobile.zoom.enable )
		.bind( "deviceorientation", checkTilt );

}( jQuery, this ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
