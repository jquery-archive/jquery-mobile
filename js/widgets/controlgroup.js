/*!
 * jQuery Mobile Controlgroup @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Controlgroups
//>>group: Forms
//>>description: Visually groups sets of buttons, checks, radios, etc.
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar-fixed/
//>>css.structure: ../css/structure/jquery.mobile.controlgroup.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"jquery-ui/widget",
			"./widget.theme",
			"jquery-ui/widgets/controlgroup" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

$.widget( "ui.controlgroup", $.ui.controlgroup, {
	options: {
		theme: "inherit"
	},

	_create: function() {
		this._super();
		this._on( this.document, {
			"pagecontainershow": function( event, ui ) {
				if ( $.contains( ui.toPage[ 0 ], this.element[ 0 ] ) ) {
					this.refresh();
				}
			}
		} );
	},

	// Deprecated as of 1.5.0 and will be removed in 1.6.0
	// This method is no longer necessary since controlgroup no longer has a wrapper
	container: function() {
		return this.element;
	},

	_themeElements: function() {
		return [
			{
				element: this.widget(),
				prefix: "ui-group-theme-"
			}
		];
	}
} );

$.widget( "ui.controlgroup", $.ui.controlgroup, $.mobile.widget.theme );

return $.ui.controlgroup;

} );
