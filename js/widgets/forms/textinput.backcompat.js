/*!
 * jQuery Mobile Textinput Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Text Inputs & Textareas Backcompat
//>>group: Forms
//>>description: Backcompat for textinput widgets.
//>>docs: http://api.jquerymobile.com/textinput/
//>>demos: http://demos.jquerymobile.com/@VERSION/textinput/
//>>css.structure: ../css/structure/jquery.mobile.forms.textinput.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget.theme",
			"../widget.backcompat",
			"./textinput" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "mobile.textinput", $.mobile.textinput, {
		options: {
			corners: true,
			mini: false,
			wrapperClass: null
		},
		classProp: "ui-textinput"
	} );
	$.widget( "mobile.textinput", $.mobile.textinput, $.mobile.widget.backcompat );
}

return $.mobile.textinput;

} );
