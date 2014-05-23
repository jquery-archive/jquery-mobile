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
			"../widget"], factory );
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
			$navbar = self.element,
			$navbtns = $navbar.find( "a" ),
			numbuttons = $navbtns.length,
			maxbutton = this.options.maxbutton,
			iconpos = $navbtns.filter( ":jqmData(icon)" ).length ? self.options.iconpos : undefined;

		$navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable();

		 if ( numbuttons <= maxbutton ) {
			$navbtns.each(function() {
				self._makeNavButton(this, iconpos);
			});
		} else {
			self._createNavRows();
		}

		$navbar.delegate( "a", "vclick", function( /* event */ ) {
			var activeBtn = $( this );

			if ( !( activeBtn.hasClass( "ui-state-disabled" ) ||
				activeBtn.hasClass( $.mobile.activeBtnClass ) ) ) {

				$navbuttons.removeClass( "ui-button-active" );
				activeBtn.addClass( "ui-button-active" );

				// The code below is a workaround to fix #1181
				$( document ).one( "pagehide", function() {
					activeBtn.removeClass( "ui-button-active" );
				} );
			}
		} );

		// DEPRECATE
		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	},

	_createNavRows: function(){
		var $navbar = this.element,
			$navbtns = $navbar.find( "a" ),
			$navitems = $navbar.find( "li" ),
			numbuttons = $navbtns.length,
			maxbutton = this.options.maxbutton,
			iconpos = this.option.iconpos,
			numrows,
			row,
			pos,
			btn,
			overflowNav;
		numrows = (numbuttons % maxbutton) === 0 ?
						(numbuttons / maxbutton) :
						Math.floor( numbuttons / maxbutton ) + 1;
			// prep for new rows
			for ( pos = 1; pos < numrows; pos++ ) {
				$("<ul>")
					.addClass("ui-navbar-row ui-navbar-row-" + pos)
					.appendTo($navbar);
			}
			// enhance buttons and move to new rows
			for( pos = 0; pos < numbuttons; pos++ ) {
				btn = $navitems.eq(pos);
				this._makeNavButton(btn.find("a"), iconpos);
				if ( pos + 1 > maxbutton) {
					btn.detach();
					row = ((pos + 1) % maxbutton) === 0 ?
							Math.floor((pos) / maxbutton) :
							Math.floor((pos + 1) / maxbutton);
					overflowNav ="ul.ui-navbar-row-" + row;
					$navbar.find(overflowNav).append(btn);
				}
			}
		},
	_makeNavButton: function(btn, iconpos) {
		var icon = $.mobile.getAttribute( btn, "icon" ),
			theme = $.mobile.getAttribute( btn, "theme" ),
			classes = "ui-btn";

		if ( theme ) {
			classes += " ui-btn-" + theme;
		}
		if ( icon ) {
			classes += " ui-icon-" + icon + " ui-btn-icon-" + iconpos;
		}
		$( btn ).addClass( classes );
	}
} );

} );
