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
			"../widget.backcompat",
			"./select" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.selectmenu", $.mobile.selectmenu, {
		options: {
			inline: false,
			corners: true,
			shadow: true,
			mini: false
		},

		initSelector: "select:not( :jqmData(role='slider')):not( :jqmData(role='flipswitch') )",

		classProp: "ui-selectmenu-button"
	} );

	$.widget( "mobile.selectmenu", $.mobile.selectmenu, $.mobile.widget.backcompat );
}

return $.mobile.selectmenu;

} );

