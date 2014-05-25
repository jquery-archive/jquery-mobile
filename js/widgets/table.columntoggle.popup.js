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

	_create: function() {
		var id, popup;

		this._super();

		if ( this.options.mode !== "columntoggle" ) {
			return;
		}

		if ( this.options.enhanced ) {
			id = this._id();
			popup = $( this.document[ 0 ].getElementById( id + "-popup" ) );
			this._ui = {
				popup: popup,
				menu: popup.children().first(),
				button: $( this.document[ 0 ].getElementById( id + "-button" ) )
			};
			this._updateHeaderPriorities({ keep: true });
		}

		this._setupEvents();

		this._setToggleState();

	},

	_updateSingleHeaderPriority: function( header, cells, priority, state ) {
		var input;

		if ( priority ) {

			// Make sure the (new?) checkbox is associated with its header via .jqmData() and that,
			// vice versa, the header is also associated with the checkbox
			input = ( state.keep ? state.inputs.eq( state.checkboxIndex++ ) :
				$("<label><input type='checkbox' checked />" +
					( header.children( "abbr" ).first().attr( "title" ) || header.text() ) +
					"</label>" )
					.appendTo( state.container )
					.children( 0 )
					.checkboxradio( {
						theme: this.options.columnPopupTheme
					}));

			// Associate the header with the checkbox
			input
				.jqmData( "header", header )
				.jqmData( "cells", cells );

			// Associate the checkbox with the header
			header.jqmData( "input", input );
		}

		return this._superApply( arguments );
	},

	_updateHeaderPriorities: function( state ) {
		var inputs,
			container = this._ui.menu.controlgroup( "container" );

		state = state || {};

		// allow update of menu on refresh (fixes #5880)
		if ( state.keep ) {
			inputs = container.find( "input" );
		} else {
			container.empty();
		}

		this._super( $.extend( state, {
			checkboxIndex: 0,
			container: container,
			inputs: inputs
		}));

		if ( !state.keep ) {
			this._ui.menu.controlgroup( "refresh" );
		}
	},

	_id: function() {
		return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
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

	_enhanceColumnToggle: function() {
		var ui,
			id = this._id(),
			popupId = id + "-popup",
			table = this.element,
			opts = this.options,
			ns = $.mobile.ns,
			buttonTheme = this._themeClassFromOption( "ui-btn-", opts.columnBtnTheme ),
			popupThemeAttr = opts.columnPopupTheme ?
				( " data-" + $.mobile.ns + "theme='" + opts.columnPopupTheme + "'" ) : "",
			fragment = this.document[ 0 ].createDocumentFragment();

		ui = this._ui = {
			button: $( "<a href='#" + popupId + "' " +
				"id='" + id + "-button' " +
				"class='ui-btn ui-corner-all ui-shadow ui-mini" +
					( opts.classes.columnBtn ? " " + opts.classes.columnBtn : "" ) +
					( buttonTheme ? " " + buttonTheme : "" ) + "' " +
				"data-" + ns + "rel='popup'>" + opts.columnBtnText + "</a>" ),
			popup: $( "<div class='" + opts.classes.popup + "' id='" + popupId + "'" +
				popupThemeAttr + "></div>" ),
			menu: $( "<fieldset></fieldset>" ).controlgroup()
		};

		// Call the superclass before we attach the menu to the DOM, because the superclass calls
		// _updateHeaderPriorities(), which we've overridden to also populate the menu with
		// checkboxes, and we don't want to populate the menu when it's already attached to the DOM
		// because we want to avoid causing reflows
		this._superApply( arguments );

		ui.menu.appendTo( ui.popup );

		fragment.appendChild( ui.popup[ 0 ] );
		fragment.appendChild( ui.button[ 0 ] );
		table.before( fragment );

		ui.popup.popup();
	},

	_setToggleState: function() {
		this._ui.menu.find( "input" ).each( function() {
			var checkbox = $( this );

			this.checked = checkbox.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			checkbox.checkboxradio( "refresh" );
		});
	},

	_destroyHeader: function( header ) {

		// This data has to be removed whether or not the widget is pre-rendered
		header.jqmRemoveData( "input" );

		return this._superApply( arguments );
	},

	_destroy: function() {
		if ( this.options.mode === "columntoggle" ) {
			if ( this.options.enhanced ) {

				// If the widget is enhanced, the checkboxes will be left alone, but the jqmData()
				// attached to them has to be removed
				this._ui.menu.find( "input" ).each( function() {
					$( this )
						.jqmRemoveData( "cells" )
						.jqmRemoveData( "header" );
				});
			} else {
				this._ui.menu.remove();
				this._ui.popup.remove();
				this._ui.button.remove();
			}
		}
		return this._superApply( arguments );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
