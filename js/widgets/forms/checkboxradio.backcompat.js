/*!
 * jQuery Mobile Checkboxradio Backcompat @VERSION
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
			"../widget.theme",
			"../widget.backcompat",
			"./checkboxradio" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "ui.checkboxradio", $.ui.checkboxradio, {
		initSelector: "input[type='radio'],input[type='checkbox']:not(:jqmData(role='flipswitch'))",
		options: {

			// Unimplemented until its decided if this will move to ui widget
			iconpos: "left",
			mini: false,
			wrapperClass: null
		},

		classProp: "ui-checkboxradio-label"
	} );
	$.widget( "ui.checkboxradio", $.ui.checkboxradio, $.mobile.widget.backcompat );
}

return $.ui.checkboxradio;

} );
