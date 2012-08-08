//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Feature test for orientation
//>>label: Orientation support test
//>>group: Core

define( [ "jquery" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
	(function( $, undefined ) {
		$.extend( $.support, {
			orientation: "orientation" in window && "onorientationchange" in window
		});
	}( jQuery ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
