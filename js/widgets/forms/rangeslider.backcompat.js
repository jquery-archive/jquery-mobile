/*!
 * jQuery Mobile Rangeslider Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Rangeslider
//>>group: Forms
//>>description: Deprecated rangeslider features

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget.backcompat",
			"./rangeslider" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	$.widget( "mobile.rangeslider", $.mobile.rangeslider, {
		options: {
			corners: true,
			mini: false,
			highlight: true
		},
		classProp: "ui-rangeslider",
		_create: function() {
			this._super();

			this.element.find( "input" ).slider( {
				mini: this.options.mini,
				highlight: this.options.highlight
			} ).slider( "refresh" );

			this._updateHighlight();

			if ( this.options.mini ) {
				this._addClass( "ui-mini", null );
				this._addClass( this._sliderFirst, "ui-mini", null );
				this._addClass( this._sliderLast, "ui-mini", null );
			}
		}
	} );

	$.widget( "mobile.rangeslider", $.mobile.rangeslider, $.mobile.widget.backcompat );

}

return $.mobile.rangeslider;

} );
