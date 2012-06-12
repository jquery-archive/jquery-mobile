//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Assorted tests to qualify browsers by detecting features
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
