/*!
 * jQuery Mobile Page Styled As Dialog Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Dialog styling backcompat
//>>group: Widgets
//>>description: Style options for page styled as dialog

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./widget.backcompat",
			"./page.dialog" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "mobile.page", $.mobile.page, {
		options: {
			corners: true
		},
		classProp: "ui-page-dialog-contain"
	} );
	$.widget( "mobile.page", $.mobile.page, $.mobile.widget.backcompat );
}

return $.mobile.page;

} );
