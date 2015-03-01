/*!
 * jQuery Mobile Popup Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Popups
//>>group: Widgets
//>>description: Deprecated popup features

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./widget.backcompat",
			"./popup" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
})( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.popup", $.mobile.popup, {
		options: {
			wrapperClass: null,
			shadow: true,
			corners: true
		},
		classProp: "ui-popup"
	} );

	$.widget( "mobile.popup", $.mobile.popup, $.mobile.widget.backcompat );

	$.mobile.popup.prototype._boolOptions.shadow = "ui-overlay-shadow";

}

return $.mobile.popup;

} );
