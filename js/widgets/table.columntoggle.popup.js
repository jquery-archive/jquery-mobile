//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>label: Table: Column Toggle
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.popup.css

define( [
	"jquery",
	"./table.columntoggle",
	"./popup",
	"./controlgroup",
	"./forms/checkboxradio" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.table, {
	options: {
		columnBtnTheme: null,
		columnPopupTheme: null,
		columnBtnText: "Columns...",
		classes: $.extend( {}, $.mobile.table.prototype.options.classes, {
			popup: "ui-table-columntoggle-popup",
			columnBtn: "ui-table-columntoggle-btn"
		})
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
	},

	_setOptions: function( options ) {
		if ( this.options.mode === "columntoggle" ) {
			if ( options.disabled !== undefined ) {
				this._ui.popup.popup( "option", "disabled", options.disabled );
				this._ui.button.toggleClass( "ui-state-disabled", options.disabled );
				if( options.disabled ) {
					this._ui.button.attr( "tabindex", -1 );
				} else {
					this._ui.button.removeAttr( "tabindex" );
				}
			}
			if ( options.columnBtnTheme !== undefined ) {
				this._ui.button
					.removeClass(
						this._themeClassFromOption( "ui-btn-", this.options.columnBtnTheme ) )
					.addClass( this._themeClassFromOption( "ui-btn-", options.columnBtnTheme ) );
			}
			if ( options.columnPopupTheme !== undefined ) {
				this._ui.popup.popup( "option", "theme", options.columnPopupTheme );
			}
			if ( options.columnBtnText !== undefined ) {
				this._ui.button.text( options.columnBtnText );
			}
		}

		return this._superApply( arguments );
	},

	_setupEvents: function() {
		//NOTE: inputs are bound in bindToggles,
		// so it can be called on refresh, too

		// update column toggles on resize
		this._on( this.window, {
			throttledresize: "_setToggleState"
		});
		this._on( this._ui.menu, {
			"change input": "_menuInputChange"
		});
	},

	_menuInputChange: function( evt ) {
		var input = $( evt.target ),
			checked = input[ 0 ].checked;

		input.jqmData( "cells" )
			.toggleClass( "ui-table-cell-hidden", !checked )
			.toggleClass( "ui-table-cell-visible", checked );
	},

	_enhanceColToggle: function() {
		var menuButton, popup, menu,
			id = this._id(),
			popupId = id + "-popup",
			table = this.element,
			opts = this.options,
			ns = $.mobile.ns,
			buttonTheme = this._themeClassFromOption( "ui-btn-", opts.columnBtnTheme ),
			popupThemeAttr = opts.columnPopupTheme ?
				( " data-" + $.mobile.ns + "theme='" + opts.columnPopupTheme + "'" ) : "",
			fragment = this.document[ 0 ].createDocumentFragment();

		menuButton = $( "<a href='#" + popupId + "' " +
			"id='" + id + "-button' " +
			"class='ui-btn ui-corner-all ui-shadow ui-mini" +
				( opts.classes.columnBtn ? " " + opts.classes.columnBtn : "" ) +
				( buttonTheme ? " " + buttonTheme : "" ) + "' " +
			"data-" + ns + "rel='popup'>" + opts.columnBtnText + "</a>" );
		popup = $( "<div class='" + opts.classes.popup + "' id='" + popupId + "'" +
			popupThemeAttr + "></div>" );
		menu = $( "<fieldset></fieldset>" ).controlgroup();

		// set extension here, send "false" to trigger build/rebuild
		this._addToggles( menu, false );

		menu.appendTo( popup );

		fragment.appendChild( popup[ 0 ] );
		fragment.appendChild( menuButton[ 0 ] );
		table.before( fragment );

		popup.popup();

		return {
			menu: menu,
			popup: popup,
			button: menuButton
		};
	},

	_setToggleState: function() {
		this._ui.menu.find( "input" ).each( function() {
			var checkbox = $( this );

			this.checked = checkbox.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			checkbox.checkboxradio( "refresh" );
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
