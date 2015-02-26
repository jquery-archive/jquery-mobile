/*!
 * jQuery Mobile Toolbar Backcompat @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Toolbars
//>>group: Widgets
//>>description: Behavior for headers and footers
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar/
//>>css.structure: ../css/structure/jquery.mobile.toolbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./toolbar",
			"./widget.backcompat" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

if ( $.mobileBackcompat !== false ) {

	return $.widget( "mobile.toolbar", $.mobile.toolbar, {
		initSelector: ":jqmData(role='footer'), :jqmData(role='header')"
	} );

}

} );
