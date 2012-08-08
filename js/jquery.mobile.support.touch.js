//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Touch feature test
//>>label: Touch support test
//>>group: Core

define( [ "jquery" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
	(function( $, undefined ) {
		$.extend( $.support, {
			touch: "ontouchend" in document
		});
		$.extend( $.mobile, {
			supportsTouch: $.support.touch
		});
	}( jQuery ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
