//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: All the stock transitions and associated CSS
//>>label: All Transitions
//>>group: Transitions

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"./visuals/flip",
			"./visuals/flow",
			"./visuals/pop",
			"./visuals/slide",
			"./visuals/slidedown",
			"./visuals/slidefade",
			"./visuals/slideup",
			"./visuals/turn" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function() {} );

//>>excludeEnd("jqmBuildExclude");
