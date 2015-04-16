/*!
 * jQuery Mobile Navbar @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Navbars
//>>group: Widgets
//>>description: Formats groups of links as horizontal navigation bars.
//>>docs: http://api.jquerymobile.com/navbar/
//>>demos: http://demos.jquerymobile.com/@VERSION/navbar/
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"../widget",
			"../grid" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.navbar", {
	version: "@VERSION",

	options: {
		iconpos: "top",
		grid: null
	},

	_create: function() {

		var $navbar = this.element,
			$navbuttons = $navbar.find( "a, button" ),
			iconpos = $navbuttons.filter( ":jqmData(icon)" ).length ? this.options.iconpos : undefined;

		$navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
				.jqmEnhanceable()
				.grid( { grid: this.options.grid } );

		$navbuttons
			.each( function() {
				var icon = $.mobile.getAttribute( this, "icon" ),
					theme = $.mobile.getAttribute( this, "theme" ),
					classes = "ui-button";

				if ( theme ) {
					classes += " ui-button-" + theme;
				}
				if ( icon ) {
					classes += " ui-icon-" + icon + " ui-button-icon-" + iconpos;
				}
				$( this ).addClass( classes );
			} );

		$navbar.delegate( "a", "vclick", function( /* event */ ) {
			var activeBtn = $( this );

			if ( !( activeBtn.hasClass( "ui-state-disabled" ) ||

					// DEPRECATED as of 1.4.0 - remove after 1.4.0 release
					// only ui-state-disabled should be present thereafter
					activeBtn.hasClass( "ui-disabled" ) ||
					activeBtn.hasClass( $.mobile.activeBtnClass ) ) ) {

				$navbuttons.removeClass( $.mobile.activeBtnClass );
				activeBtn.addClass( $.mobile.activeBtnClass );

				// The code below is a workaround to fix #1181
				$( document ).one( "pagehide", function() {
					activeBtn.removeClass( $.mobile.activeBtnClass );
				} );
			}
		} );

		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbuttons.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		} );
	}
} );

} );
