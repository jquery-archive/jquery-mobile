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
			"../widget.backcompat",
			"./textinput" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {
	$.widget( "mobile.textinput", $.mobile.textinput, {
		initSelector: "input[type='text']," +
			"input[type='search']," +
			":jqmData(type='search')," +
			"input[type='number']:not(:jqmData(type='range'))," +
			":jqmData(type='number')," +
			"input[type='password']," +
			"input[type='email']," +
			"input[type='url']," +
			"input[type='tel']," +
			"textarea," +
			"input[type='time']," +
			"input[type='date']," +
			"input[type='month']," +
			"input[type='week']," +
			"input[type='datetime']," +
			"input[type='datetime-local']," +
			"input[type='color']," +
			"input:not([type])," +
			"input[type='file']",
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
