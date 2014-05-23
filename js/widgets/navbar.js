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
			.find( "ul" );

		this.navbar = navbar;
		this.navButtons = navButtons;
		this.numButtons = numButtons;
		this.maxButton = maxButton;
		this.iconpos = iconpos;

		 if ( numButtons <= maxButton ) {
			navButtons.each( function() {
				that._makeNavButton( this, iconpos );
			} );
		} else {
			this._createNavRows();
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
		var isDisabled = false;
		if ( $( button ).hasClass( "ui-state-disabled" ) ) {
			isDisabled = true;
		}
		$( button ).button( {
			iconPosition: iconpos,
			disabled: isDisabled
		 } );
	},

	refresh: function() {
		var that = this;

		this.navButtons = this.navbar.find( "a" );
		this.numButtons = this.navButtons.length;

		this._addClass( this.navbar, "ui-navbar" );
		this.navbar.attr( "role", "navigation" )
			.find( "ul" );

		 if ( this.numButtons <= this.maxButton ) {
			this.navButtons.each( function() {
				that._makeNavButton( this, that.iconpos );
			} );
		} else {
			this._createNavRows();
		}
	},

	_destroy: function() {
		var navrows;

		if ( this.numButtons > this.maxButton ) {
			navrows = this.navbar.find( ".ui-navbar-row li" ).detach();
			$( ".ui-navbar-row" ).remove();
			this.navbar.find( "ul" ).append( navrows );
		}

		this._removeClass( this.navbar, "ui-navbar" );

		this.navButtons.each( function() {
			$( this ).button( "destroy" );
		} );
	}
} );

} );
