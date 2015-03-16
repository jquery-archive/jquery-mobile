//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Custom events and shortcuts.
//>>label: Events
//>>group: Events

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./events/navigate",
			"./events/touch",
			"./events/scroll",
			"./events/orientationchange" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function() {} );
//>>excludeEnd("jqmBuildExclude");
