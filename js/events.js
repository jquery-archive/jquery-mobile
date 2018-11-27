/*!
 * jQuery Mobile Events @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Events
//>>group: Events
//>>description: Custom events and shortcuts.

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
