/*!
 * jQuery Field Container @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Fieldcontainers
//>>group: Forms
//>>description: Styling to responsively position forms and labels based on screen width and add visual separation
//>>docs: http://api.jquerymobile.com/fieldcontain/
//>>demos: http://demos.jquerymobile.com/@VERSION/forms-field-contain/
//>>css.structure: ../css/structure/jquery.mobile.forms.fieldcontain.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [ "jquery" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

// Deprecated in 1.4
$.fn.fieldcontain = function( /* options */ ) {
	return this.addClass( "ui-field-contain" );
};

return $.fn.fieldcontain;

} );
