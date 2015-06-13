/*!
 * jQuery Mobile Slider Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Slider
//>>group: Forms
//>>description: Deprecated Slider features

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget.backcompat",
			"./slider" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.slider", $.mobile.slider, {
		options: {
			corners: true,
			mini: false,
			highlight: false
		},
		classProp: "ui-slider",
		_create: function() {
			this._super();

			if ( this.options.mini ) {
				this._addClass( this.slider, "ui-mini", null );
			}

			if ( this.options.highlight && this.slider.find( ".ui-slider-bg" ).length === 0 ) {
				this.valuebg = ( function( slider ) {
					var bg = document.createElement( "div" );
					bg.className = "ui-slider-bg " + $.mobile.activeBtnClass;
					return $( bg ).prependTo( slider );
				} )( this.slider );
			}

			if ( this.options.highlight ) {
				this._setHighlight( this.options.highlight );
			}
		},

		_setHighlight: function( value ) {
			if ( value ) {
				this.options.highlight = !!value;
				this.refresh();
			} else if ( this.valuebg ) {
				this.valuebg.remove();
				this.valuebg = false;
			}
		}
	} );

	$.widget( "mobile.slider", $.mobile.slider, $.mobile.widget.backcompat );

}

return $.mobile.slider;

} );
