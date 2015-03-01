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
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.popup", $.mobile.popup, {
		options: {
			wrapperClass: null,
			closeLinkSelector: "a:jqmData(rel='back')",
			shadow: true,
			corners: true
		},
		classProp: "ui-popup"
	} );

	$.widget( "mobile.popup", $.mobile.popup, $.mobile.widget.backcompat );

	// We override the class being toggled in response to changes in the value of the shadow option
	// because the default implementation toggles the ui-shadow class, whereas we need it to toggle
	// the ui-overlay-shadow class.
	$.mobile.popup.prototype._boolOptions.shadow = "ui-overlay-shadow";

}

return $.mobile.popup;

} );
