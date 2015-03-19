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
})( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	var classSplitterRegex = /\S+/g,
		toggleClass = function( classValue, oneClass, add ) {
			var index;

			classValue = classValue.match( classSplitterRegex ) || [];
			index = $.inArray( oneClass, classValue );

			if ( add && index === -1 ) {
				classValue.push( oneClass );
			} else if ( !add && index >= 0 ) {
				if ( index === 0 ) {
					classValue.shift();
				} else {
					classValue = classValue.splice( index - 1, 1 );
				}
			}

			return classValue.join( " " );
		};

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

				classes[ "ui-popup-arrow" ] = toggleClass( classes[ "ui-popup-arrow" ],
					"ui-overlay-shadow", this.options.shadow );
			}
		},

		_optionsToClasses: function( option, value ) {
			this._super( option, value );

			if ( option === "shadow" ) {
				this.option( "classes.ui-popup-arrow",
					toggleClass( this.options.classes[ "ui-popup-arrow" ], "ui-overlay-shadow",
						value ) );
			}
		}
	} );

}

return $.mobile.popup;

} );
