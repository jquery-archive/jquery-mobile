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
			"./forms/button",
			"../widget" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.navbar", {
	version: "@VERSION",

	options: {
		iconpos: "top",
		maxbutton: 5
	},

	_create: function() {
		var that = this;
		var navbar = that.element;
		var navButtons = navbar.find( "a" );
		var numButtons = navButtons.length;
		var maxButton = this.options.maxbutton;
		var iconpos = navButtons.filter( ":jqmData(icon)" ).length ?
				that.options.iconpos : undefined;

		navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable();

		that.navbar = navbar;
		that.navButtons = navButtons;
		that.numButtons = numButtons;
		that.maxButton = maxButton;
		that.iconpos = iconpos;

		 if ( numButtons <= maxButton ) {
			navButtons.each( function() {
				that._makeNavButton( this, iconpos );
			} );
		} else {
			that._createNavRows();
		}

	},

	_createNavRows: function() {
		var rowCount;
		var row;
		var pos;
		var buttonItem;
		var overflowNav;
		var navRow;
		var navItems = this.navbar.find( "li" );
		var buttonCount = this.numButtons;
		var maxButton = this.maxButton;

		rowCount = ( buttonCount % maxButton ) === 0 ?
						( buttonCount / maxButton ) :
						Math.floor( buttonCount / maxButton ) + 1;

		// Prep for new rows
		for ( pos = 1; pos < rowCount ; pos++ ) {
			navRow = $( "<ul>" );
			this._addClass( navRow, "ui-navbar-row ui-navbar-row-" + pos );
			navRow.appendTo( this.navbar );
		}

		// Enhance buttons and move to new rows
		for ( pos = 0; pos < buttonCount ; pos++ ) {
			buttonItem = navItems.eq( pos );
			this._makeNavButton( buttonItem.find( "a" ), this.iconpos );
			if ( pos + 1 > maxButton ) {
				buttonItem.detach();
				row = ( ( pos + 1 ) % maxButton ) === 0 ?
						Math.floor( ( pos ) / maxButton ) :
						Math.floor( ( pos + 1 ) / maxButton );
				overflowNav = "ul.ui-navbar-row-" + row;
				this.navbar.find( overflowNav ).append( buttonItem );
			}
		}
	},

	_makeNavButton: function( button, iconpos ) {
		$( button ).button( { iconPosition: iconpos } );
	},

	refresh: function() {
		var that = this;

		that.navButtons = that.navbar.find( "a" );
		that.numButtons = that.navButtons.length;

		this._addClass( that.navbar, "ui-navbar" );
		that.navbar.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable();

		 if ( that.numButtons <= that.maxButton ) {
			that.navButtons.each( function() {
				that._makeNavButton( this, that.iconpos );
			} );
		} else {
			that._createNavRows();
		}
	},

	_destroy: function() {
		var navrows;
		var that = this;

		if ( that.numButtons > that.maxButton ) {
			navrows = that.navbar.find( ".ui-navbar-row li" ).detach();
			$( ".ui-navbar-row" ).remove();
			that.navbar.find( "ul" ).append( navrows );
		}

		this._removeClass( that.navbar, "ui-navbar" );

		that.navButtons.each( function() {
			$( this ).button( "destroy" );
		} );
	}
} );

} );
