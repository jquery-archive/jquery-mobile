/*!
 * jQuery Mobile Navbar @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Navbar Backcompat
//>>group: Widgets
//>>description: Packcompat Formats groups of links as horizontal navigation bars.
//>>docs: http://api.jquerymobile.com/navbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/navbar/
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css
( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./navbar",
			"./widget.backcompat" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {
	return $.widget( "mobile.navbar", $.mobile.navbar, {
		_create: function() {
			var that = this;
			this._super();

			// Deprecated in 1.5
			that._on( that.element, {
				"vclick a": function( event ) {
					var activeBtn = $( event.target );

					if ( !( activeBtn.hasClass( "ui-state-disabled" ) ||
						activeBtn.hasClass( "ui-button-active" ) ) ) {

						that.navButtons.removeClass( "ui-button-active" );
						activeBtn.addClass( "ui-button-active" );

						// The code below is a workaround to fix #1181
						$( document ).one( "pagehide", function() {
							activeBtn.removeClass( "ui-button-active" );
						} );
					}
				}
			} );

			// Deprecated in 1.5
			// Buttons in the navbar with ui-state-persist class should
			// regain their active state before page show
			that.navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
				that.navButtons.filter( ".ui-state-persist" ).addClass( "ui-button-active" );
			} );
		}
	} );
}

} );
