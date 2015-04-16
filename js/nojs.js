/*!
 * jQuery Mobile No JS @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: “nojs” Classes
//>>group: Utilities
//>>description: Adds class to make elements hidden to A grade browsers
//>>docs: http://api.jquerymobile.com/global-config/#keepNative
//>>css.structure: ../css/structure/jquery.mobile.core.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./ns" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.mobile.nojs = function( target ) {
	$( ":jqmData(role='nojs')", target ).addClass( "ui-nojs" );
};

return $.mobile.nojs;

} );
