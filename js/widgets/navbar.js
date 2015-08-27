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

		var self = this,
			navbar = self.element,
			navButtons = navbar.find( "a" ),
			numButtons = navButtons.length,
			maxButton = this.options.maxbutton,
			iconpos = navButtons.filter( ":jqmData(icon)" ).length ?
				self.options.iconpos : undefined;

		navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable();

		$.extend( self, {
			navbar: navbar,
			navButtons: navButtons,
			numButtons: numButtons,
			maxButton: maxButton,
			iconpos: iconpos
		} );

		 if ( numButtons <= maxButton ) {
			navButtons.each( function() {
				self._makeNavButton( this, iconpos );
			} );
		} else {
			self._createNavRows();
		}

		// Deprecated in 1.5
		self._on( self.element, {
			"vclick a": function( event ) {
				var activeBtn = $( event.target );

				if ( !( activeBtn.hasClass( "ui-state-disabled" ) ||
					activeBtn.hasClass( "ui-button-active" ) ) ) {

					navButtons.removeClass( "ui-button-active" );
					activeBtn.addClass( "ui-button-active" );

					// The code below is a workaround to fix #1181
					$( document ).one( "pagehide", function() {
						activeBtn.removeClass( "ui-button-active" );
					} );
				}
			}
		} );

		// Deprecated in 1.5
		// Buttons in the navbar with ui-state-persist class should
		// regain their active state before page show
		navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			navButtons.filter( ".ui-state-persist" ).addClass( "ui-button-active" );
		} );
	},

	_createNavRows: function() {
		var rowCount, row, pos, buttonItem, overflowNav,
			navItems = this.navbar.find( "li" ),
			buttonCount = this.numButtons,
			maxButton = this.maxButton;

		rowCount = ( buttonCount % maxButton ) === 0 ?
						( buttonCount / maxButton ) :
						Math.floor( buttonCount / maxButton ) + 1;

		// prep for new rows
		for ( pos = 1; pos < rowCount ; pos++ ) {
			$( "<ul>" )
				.addClass( "ui-navbar-row ui-navbar-row-" + pos )
				.appendTo( this.navbar );
		}

		// enhance buttons and move to new rows
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
		var self = this;

		self.navButtons = self.navbar.find( "a" );
		self.numButtons = self.navButtons.length;

		self.navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable();

		 if ( self.numButtons <= self.maxButton ) {
			self.navButtons.each( function() {
				self._makeNavButton( this, self.iconpos );
			} );
		} else {
			self._createNavRows();
		}
	},

	_destroy: function() {
		var navrows,
			self = this;

		if ( self.numButtons > self.maxButton ) {
			navrows = self.navbar.find( ".ui-navbar-row li" ).detach();
			$( ".ui-navbar-row" ).remove();
			self.navbar.find( "ul" ).append( navrows );
		}

		self.navbar.removeClass( "ui-navbar" );

		self.navButtons.each( function() {
			$( this ).button( "destroy" );
		} );
	}
} );

} );
