/*!
 * jQuery Mobile Popup Arrow Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Popups
//>>group: Widgets
//>>description: Deprecated popup arrow features

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./popup.backcompat",
			"./popup.arrow" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

var shadowClassRe = /\bui-overlay-shadow\b/;

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.popup", $.mobile.popup, {
		_setInitialOptions: function() {
			var classes = this.options.classes;

			this._super();

			// If the value for the ui-popup-arrow class key has not changed we assume we're
			// dealing with legacy code, so we make sure the presence of the ui-overlay-shadow
			// class in the ui-popup-arrow key reflects the value of the "shadow" option.
			if ( classes[ "ui-popup-arrow" ] ===
					$[ this.namespace ][ this.widgetName ].prototype.options
						.classes[ "ui-popup-arrow" ] ) {

				classes[ "ui-popup-arrow" ] = this._getClassValue( classes[ "ui-popup-arrow" ],
					"ui-overlay-shadow", this.options.shadow );
			}
		},

		// The presence of the class ui-overlay-shadow in ui-popup must be synchronized to its
		// presence in ui-popup-arrow as long as the shadow option is supported, because the widget
		// backcompat synchronizes its presence in ui-popup to the value of the shadow option.
		_setOption: function( key, value ) {
			var popupHasShadow;

			if ( key === "classes" ) {
				popupHasShadow = value[ "ui-popup" ].match( shadowClassRe );
				if ( value[ "ui-popup-arrow" ].match( shadowClassRe ) !== popupHasShadow ) {
					value[ "ui-popup-arrow" ] = this._getClassValue( value[ "ui-popup-arrow" ],
						"ui-overlay-shadow", popupHasShadow );
				}
			}

			return this._superApply( arguments );
		}
	} );

}

return $.mobile.popup;

} );
