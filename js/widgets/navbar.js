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
			navbar = self.element,
			navButtons = navbar.find( "a" ),
			numButtons = navButtons.length,
			maxButton = this.options.maxbutton,
			iconpos = navButtons.filter( ":jqmData(icon)" ).length ? self.options.iconpos : undefined;

		navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable();

		$.extend(self, {
			navbar: navbar,
			navButtons: navButtons,
			numButtons: numButtons,
			maxButton: maxButton,
			iconpos: iconpos
		});

		 if ( numButtons <= maxButton ) {
			navButtons.each(function() {
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

					navButtons.removeClass( $.mobile.activeBtnClass );
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
		navbar.closest( ".ui-page" ).bind( "pagebeforeshow", function() {
			navButtons.filter( ".ui-state-persist" ).addClass( $.mobile.activeBtnClass );
		});
	},

	_createNavRows: function(){
		var rowCount, row, pos, buttonItem, overflowNav,
			navItems = this.navbar.find( "li" ),
			buttonCount = this.numButtons,
			maxButton = this.maxButton;

		rowCount = (buttonCount % maxButton) === 0 ?
						(buttonCount / maxButton) :
						Math.floor( buttonCount / maxButton ) + 1;

		// prep for new rows
		for ( pos = 1; pos < rowCount ; pos++ ) {
			$( "<ul>" )
				.addClass( "ui-navbar-row ui-navbar-row-" + pos )
				.appendTo(this.navbar);
		}

		// enhance buttons and move to new rows
		for( pos = 0; pos < buttonCount ; pos++ ) {
			buttonItem = navItems.eq(pos);
			this._makeNavButton( buttonItem.find( "a" ), this.iconpos );
			if ( pos + 1 > maxButton) {
				buttonItem.detach();
				row = ((pos + 1) % maxButton) === 0 ?
						Math.floor((pos) / maxButton) :
						Math.floor((pos + 1) / maxButton);
				overflowNav = "ul.ui-navbar-row-" + row;
				this.navbar.find(overflowNav).append(buttonItem);
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
		var self = this;

		self.navbar.addClass( "ui-navbar" )
			.attr( "role", "navigation" )
			.find( "ul" )
			.jqmEnhanceable();

		 if ( self.numButtons <= self.maxButton ) {
			self.navButtons.each(function() {
				self._makeNavButton(this, self.iconpos);
			});
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

		self.navButtons.each(function() {
			var icon = $.mobile.getAttribute( this, "icon" ),
				theme = $.mobile.getAttribute( this, "theme" ),
				classes = "ui-btn";

			if ( theme ) {
				classes += " ui-btn-" + theme;
			}
			if ( icon ) {
				classes += " ui-icon-" + icon + " ui-btn-icon-" + self.iconpos;
			}
			$( this ).removeClass( classes );
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
