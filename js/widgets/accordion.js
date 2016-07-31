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
			"jquery-ui/widgets/accordion",
			"./widget.theme" ], factory );
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
	},
	_create: function() {
		this._super();

		// We need to refresh on page show so that the height can be calculated
		// when the widget is not hidden
		this._on( this.document, {
			"pagecontainershow": function( event, ui ) {
				if ( ui.toPage[ 0 ] === this.element.closest( ".ui-page" )[ 0 ] ) {
					this.refresh();
				}
			}
		} );
	}
} );

$.widget( "ui.accordion", $.ui.accordion, $.mobile.widget.theme );

return $.ui.accordion;

} );
