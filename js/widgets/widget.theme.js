/*!
 * jQuery Mobile Theme Option @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Widget Theme
//>>group: Widgets
//>>description: Adds Theme option to widgets
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../core",
			"../widget" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.mobile.widget.theme = {
	_create: function() {
		this._super();
		if ( !this.options.enhanced && this.options.theme ) {
			this.widget().addClass( "ui-theme-" + this.options.theme );
		}
	},

	_setOption: function( key, value ) {
		if ( key === "theme" && this.options.theme ) {
			this.widget()
				.removeClass( "ui-theme-" + this.options.theme )
				.addClass( "ui-theme-" + value );
		}
		this._superApply ( arguments );
	}
};

return $.mobile.widget.theme;

} );
