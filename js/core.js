/*!
 * jQuery Mobile Core @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

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
} )( function() {} );
