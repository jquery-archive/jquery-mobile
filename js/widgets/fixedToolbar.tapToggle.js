/*!
 * jQuery Mobile Fixed Toolbar Tap Toggle @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 */

//>>label: Toolbars: Fixed: TapToggle
//>>group: Widgets
//>>description: Tap Toggle Extension for Fixed Toolbars
//>>docs: http://api.jquerymobile.com/toolbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/toolbar-fixed/
//>>css.structure: ../css/structure/jquery.mobile.fixedToolbar.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"../core",
			"../navigation",
			"./page",
			"../zoom",
			"./fixedToolbar" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.toolbar", $.mobile.toolbar, {
	options: {
		tapToggle: false,
		tapToggleBlacklist: "a, button, input, select, textarea, .ui-toolbar-header-fixed, " +
			".ui-toolbar-footer-fixed, .ui-flipswitch, .ui-popup, .ui-panel, .ui-panel-dismiss-open"
	},

	_makeFixed: function() {
		this._super();
		this._bindToggleHandlers();
	},

	_bindToggleHandlers: function() {
		this._attachToggleHandlersToPage( ( !!this.page ) ? this.page : $( ".ui-page" ) );
	},

	_attachToggleHandlersToPage: function( page ) {
		var self = this,
			o = self.options;

		// Tap toggle
		page
			.bind( "vclick", function( e ) {
				if ( o.tapToggle && !$( e.target ).closest( o.tapToggleBlacklist ).length ) {
					self.toggle();
				}
			} );
	}
} );

} );
