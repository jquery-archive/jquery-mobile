//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Formats groups of links as horizontal navigation bars.
//>>label: Navbars
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.navbar.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../widget" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.navbar", {
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

		// Deprecated in 1.5
		self._on( self.element, {
			"vclick a": function( event ) {
				var activeBtn = $( event.target );

				if ( !( activeBtn.hasClass( "ui-state-disabled" ) ||
					activeBtn.hasClass( $.mobile.activeBtnClass ) ) ) {

					$navbtns.removeClass( $.mobile.activeBtnClass );
					activeBtn.addClass( $.mobile.activeBtnClass );

					// The code below is a workaround to fix #1181
					$( document ).one( "pagehide", function() {
						activeBtn.removeClass( $.mobile.activeBtnClass );
					});
				}
			}
		});

		// Deprecated in 1.5
		// Buttons in the navbar with ui-state-persist class should regain their active state before page show
		$navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			$navbtns.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	},

	_createNavRows: function(){
		var rowCount, row, pos, buttonItem, overflowNav,
			$navbar = this.element,
			$navButtons = $navbar.find( "a" ),
			$navItems = $navbar.find( "li" ),
			buttonCount = $navButtons.length,
			maxButton = this.options.maxbutton,
			iconpos = this.options.iconpos;

		rowCount = (buttonCount % maxButton) === 0 ?
						(buttonCount / maxButton) :
						Math.floor( buttonCount / maxButton ) + 1;

		// prep for new rows
		for ( pos = 1; pos < rowCount ; pos++ ) {
			$( "<ul>" )
				.addClass( "ui-navbar-row ui-navbar-row-" + pos )
				.appendTo($navbar);
		}

		// enhance buttons and move to new rows
		for( pos = 0; pos < buttonCount ; pos++ ) {
			buttonItem = $navItems.eq(pos);
			this._makeNavButton( buttonItem.find( "a" ), iconpos );
			if ( pos + 1 > maxButton) {
				buttonItem.detach();
				row = ((pos + 1) % maxButton) === 0 ?
						Math.floor((pos) / maxButton) :
						Math.floor((pos + 1) / maxButton);
				overflowNav = "ul.ui-navbar-row-" + row;
				$navbar.find(overflowNav).append(buttonItem);
			}
		}
	},

	_makeNavButton: function(button, iconpos) {
		var icon = $.mobile.getAttribute( button, "icon" ),
			theme = $.mobile.getAttribute( button, "theme" ),
			classes = "ui-btn";

		if ( theme ) {
			classes += " ui-btn-" + theme;
		}
		if ( icon ) {
			classes += " ui-icon-" + icon + " ui-btn-icon-" + iconpos;
		}
		$( button ).addClass( classes );
	},

	refresh: function() {
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
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
