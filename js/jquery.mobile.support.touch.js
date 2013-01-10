//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Touch feature test
//>>label: Touch support test
//>>group: Core

define( [ "jquery", "./jquery.mobile.ns" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
	(function( $, undefined ) {
		var support = {
			touch: "ontouchend" in document
		};

		$.mobile.support = $.mobile.support || {};
		$.extend( $.support, support );
		$.extend( $.mobile.support, support );
	}( jQuery ));
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
