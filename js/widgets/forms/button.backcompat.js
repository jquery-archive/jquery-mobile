/*!
 * jQuery Mobile Button Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Button
//>>group: Forms
//>>description: Backwards-compatibility for buttons.
//>>docs: http://api.jquerymobile.com/button/
//>>demos: http://demos.jquerymobile.com/@VERSION/button/
//>>css.structure: ../css/structure/jquery.mobile.core.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../widget",
			"../widget.theme",
			"checkboxradio",
			"checkboxradio.backcompat" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "ui.button", $.ui.button, {
		options: {
			iconpos: "left",
			mini: false,
			wrapperClass: null,
			inline: null,
			shadow: true,
			corners: true
		},

		classProp: "ui-button",

		_create: function() {
			if ( this.options.iconPosition !== $.ui.button.prototype.options.iconPosition ) {
				this._seticonpos( this.options.iconPosition );
			} else if ( this.options.iconpos !== $.ui.button.prototype.options.iconpos ) {
				this._seticonPosition( this.options.iconpos );
			}
			this._super();
		},

		_seticonPosition: function( value ) {
			if ( value === "end" ) {
				this.options.iconpos = "right";
			} else if ( value !== "left" ) {
				this.options.iconpos = value;
			}
		},

		_seticonpos: function( value ) {
			if ( value === "right" ) {
				this._setOption( "iconPosition", "end" );
			} else if ( value !== "left" ) {
				this._setOption( "iconPosition", value );
			}
		},

		_setOption: function( key, value ) {
			if ( key === "iconPosition" || key === "iconpos" ) {
				this[ "_set" + key ]( value );
			}
			this._superApply( arguments );
		}
	} );
	$.widget( "ui.button", $.ui.button, $.mobile.widget.backcompat );
}

return $.ui.button;

} );
