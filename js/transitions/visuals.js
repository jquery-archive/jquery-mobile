/*!
 * jQuery Mobile Transition Visuals @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: All Transitions
//>>group: Transitions
//>>description: All the stock transitions and associated CSS
//>>demos: http://demos.jquerymobile.com/@VERSION/transitions/

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
} )( function() {} );
