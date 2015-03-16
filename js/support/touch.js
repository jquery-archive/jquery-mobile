//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Touch feature test
//>>label: Touch support test
//>>group: Core

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../ns" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( jQuery ) {
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
