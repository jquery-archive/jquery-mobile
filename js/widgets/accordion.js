/*!
 * jQuery Mobile Accordion @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Accordion
//>>group: Widgets
//>>description: Displays collapsible content panels for presenting information in a limited space.
//>>css.structure: ../css/structure/jquery.mobile.accordion.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui/widget",
			"widget.theme",
			"jquery-ui/accordion" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "ui.accordion", $.ui.accordion, {
	options: {
		theme: null,
		icons: {
			activeHeader: "ui-icon-caret-d",
			header: "ui-icon-caret-r"
		}
	},
	_themeElements: function() {
		return [
			{
				element: this.widget(),
				prefix: "ui-body-"
			}
		];
	}
} );

$.widget( "ui.accordion", $.ui.accordion, $.mobile.widget.theme );

return $.ui.accordion;

} );
