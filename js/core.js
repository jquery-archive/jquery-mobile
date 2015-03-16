//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>group: exclude

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"./defaults",
			"./data",
			"./helpers" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function(){} );
//>>excludeEnd("jqmBuildExclude");
