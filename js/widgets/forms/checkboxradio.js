/*!
 * jQuery Mobile Checkboxradio @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Checkboxes & Radio Buttons
//>>group: Forms
//>>description: Consistent styling for checkboxes/radio buttons.
//>>docs: http://api.jquerymobile.com/checkboxradio/
//>>demos: http://demos.jquerymobile.com/@VERSION/checkboxradio-checkbox/
//>>css.structure: ../css/structure/jquery.mobile.forms.checkboxradio.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../../core",
			"../../widget",
			"jquery-ui/checkboxradio",
			"../widget.theme" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "ui.checkboxradio", $.ui.checkboxradio, {
	initSelector: "input[type='radio'],input[type='checkbox']:not(:jqmData(role='flipswitch'))",

	options: {
		enhanced: false,
		theme: "inherit"
	},

	_enhance: function() {
		if ( !this.options.enhanced ) {
			this._super();
		} else if ( this.options.icon ) {
			this.icon = this.element.find( "ui-button-icon" );
		}
	}
} );

$.widget( "ui.checkboxradio", $.ui.checkboxradio, $.mobile.widget.theme );

return $.ui.checkboxradio;

} );
