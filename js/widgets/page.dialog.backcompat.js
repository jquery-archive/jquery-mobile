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

		classProp: "ui-page-dialog-contain",

		_create: function() {

			// Support for deprecated dialog widget functionality
			if ( $.mobile.getAttribute( this.element[ 0 ], "role" ) === "dialog" ||
				this.options.role === "dialog" ) {

				// The page container needs to distinguish a dialog widget from a page styled
				// as a dialog. It does so by looking for the "mobile-dialog" data item on the
				// page element. Since the dialog is no longer a widget, we need to provide a
				// dummy hint
				$.data( this.element[ 0 ], "mobile-dialog", true );
				this.options.dialog = true;
			}
			this._super();
		}
	} );
	$.widget( "mobile.page", $.mobile.page, $.mobile.widget.backcompat );
}

return $.mobile.page;

} );
