/*!
 * jQuery Mobile Selectmenu Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Popups
//>>group: Widgets
//>>description: Deprecated selectmenu features

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./select.custom" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.selectmenu", $.mobile.selectmenu, {
		_ns: function() {
			return $.mobile.ns || "";
		}
	} );
}

return $.mobile.selectmenu;

} );

