/*!
 * jQuery Mobile Table @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>label: Table: Column Toggle
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.popup.css

( function( factory ) {

		if ( typeof define === "function" && define.amd ) {

			// AMD. Register as an anonymous module.
			define( [
			"jquery",
			"./table.columntoggle",
			"./popup",
			"./controlgroup",
			"./forms/button",
			"./widget.theme",
			"./forms/checkboxradio" ], factory );
		} else {

			// Browser globals
			factory( jQuery );
		}
} )( function( $, undefined ) {

return $.widget( "mobile.table", $.mobile.table, {
	options: {
		columnButton: true,
		columnButtonTheme: null,
		columnPopupTheme: null,
		columnButtonText: "Columns...",
		columnUi: true,
		classes: {
			"ui-table-columntoggle-popup": "",
			"ui-table-columntoggle-btn": "ui-corner-all ui-shadow ui-mini"
		}
	},

	_create: function() {
		var id, popup;

		this.options.columnButtonTheme =
		this.options.columnButtonTheme ? this.options.columnButtonTheme : "inherit";

		this._super();


		if ( this.options.mode !== "columntoggle" || !this.options.columnUi ) {
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
			this._updateHeaderPriorities( { keep: true } );
		}
	},

	_updateVariableColumn: function( header, cells, priority, state ) {
		var input;

		if ( this.options.columnUi || ( state && state.turningOnUI ) ) {

			// Make sure the (new?) checkbox is associated with its header via .jqmData() and that,
			// vice versa, the header is also associated with the checkbox
			input = ( state.keep ? state.inputs.eq( state.checkboxIndex++ ) :
				$( "<label><input type='checkbox' checked />" +
					( header.children( "abbr" ).first().attr( "title" ) || header.text() ) +
					"</label>" )
					.appendTo( state.container )
					.children( 0 )
					.checkboxradio( {
						theme: this.options.columnPopupTheme
					} ) );

			// Associate the header with the checkbox
			input
				.jqmData( "header", header )
				.jqmData( "cells", cells );

			// Associate the checkbox with the header
			header.jqmData( "input", input );
		}

		return ( state && state.turningOnUI ) ? this : this._superApply( arguments );
	},

	_updateHeaderPriorities: function( state ) {
		var inputs, container, returnValue;

		state = state || {};

		if ( this.options.columnUi || state.turningOnUI ) {
			container = this._ui.menu.controlgroup( "container" );

			// Allow update of menu on refresh (fixes #5880)
			if ( state.keep ) {
				inputs = container.find( "input" );
			} else {
				container.empty();
			}

			returnValue = this._super( $.extend( state, {
				checkboxIndex: 0,
				container: container,
				inputs: inputs
			} ) );

			// The controlgroup can only be refreshed after having called the superclass, because
			// the superclass ultimately ends up instantiating the checkboxes inside the
			// controlgroup's container
			if ( !state.keep ) {
				this._ui.menu.controlgroup( "refresh" );
			}

			this._setupEvents();
			this._setToggleState();
		} else {
			returnValue = this._superApply( arguments );
		}

		return returnValue;
	},

	_id: function() {
		return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
	},

	_themeClassFromOption: function( prefix, value ) {
		return ( value ? ( value === "none" ? "" : prefix + value ) : "" );
	},

	_removeColumnUi: function( detachOnly ) {
		var inputs = this._ui.menu.find( "input" );

		inputs.each( function() {
			var input = $( this ),
				header = input.jqmData( "header" );

			// If we're simply detaching, the checkboxes will be left alone, but the jqmData()
			// attached to them has to be removed
			if ( detachOnly ) {
				input
					.jqmRemoveData( "cells" )
					.jqmRemoveData( "header" );
			}

			// The reference from the header to the input has to be removed whether we're merely
			// detaching, or whether we're removing altogether
			header.jqmRemoveData( "input" );
		} );

		if ( !detachOnly ) {
			this._ui.menu.remove();
			this._ui.popup.remove();
			if ( this._ui.button ) {
				this._ui.button.remove();
			}
		}
	},

	_setOptions: function( options ) {
		var haveUi = this.options.columnUi;

		if ( this.options.mode === "columntoggle" ) {

			if ( options.columnUi != null ) {
				if ( this.options.columnUi && !options.columnUi ) {
					this._removeColumnUi( false );
				} else if ( !this.options.columnUi && options.columnUi ) {
					this._addColumnUI( {
						callback: this._updateHeaderPriorities,
						callbackContext: this,
						callbackArguments: [ { turningOnUI: true } ]
					} );
				}

				haveUi = options.columnUi;
			}

			if ( haveUi ) {
				if ( options.disabled != null ) {
					this._ui.popup.popup( "option", "disabled", options.disabled );
					if ( this._ui.button ) {
						this._toggleClass( this._ui.button,
							"ui-state-disabled", null, options.disabled );
						if ( options.disabled ) {
							this._ui.button.attr( "tabindex", -1 );
						} else {
							this._ui.button.removeAttr( "tabindex" );
						}
					}
				}
				if ( options.columnButtonTheme != null && this._ui.button ) {
					this._removeClass( this._ui.button, null,
						this._themeClassFromOption(
							"ui-button-",
							this.options.columnButtonTheme ) );
					this._addClass( this._ui.button, null,
						this._themeClassFromOption(
							"ui-button-",
							options.columnButtonTheme ) );
				}
				if ( options.columnPopupTheme != null ) {
					this._ui.popup.popup( "option", "theme", options.columnPopupTheme );
				}
				if ( options.columnButtonText != null && this._ui.button ) {
					this._ui.button.text( options.columnButtonText );
				}
				if ( options.columnButton != null ) {
					if ( options.columnButton ) {
						if ( !this._ui.button || this._ui.button.length === 0 ) {
							this._ui.button = this._columnsButton();
						}
						this._ui.button.insertBefore( this.element );
					} else if ( this._ui.button ) {
						this._ui.button.detach();
					}
				}
			}
		}

		return this._superApply( arguments );
	},

	_setColumnVisibility: function( header, visible, /* INTERNAL */ fromInput ) {
		var input;

		if ( !fromInput && this.options.columnUi ) {
			input = header.jqmData( "input" );

			if ( input ) {
				input.prop( "checked", visible ).checkboxradio( "refresh" );
			}
		}

		return this._superApply( arguments );
	},

	_setupEvents: function() {

		//NOTE: inputs are bound in bindToggles,
		// so it can be called on refresh, too

		// Update column toggles on resize
		this._on( this.window, {
			throttledresize: "_setToggleState"
		} );
		this._on( this._ui.menu, {
			"change input": "_menuInputChange"
		} );
	},

	_menuInputChange: function( event ) {
		var input = $( event.target );

		this._setColumnVisibility( input.jqmData( "header" ), input.prop( "checked" ), true );
	},

	_columnsButton: function() {
		var id = this._id(),
			options = this.options,
			button = $( "<a href='#" + id + "-popup' " +
				"id='" + id + "-button' " +
				"data-" + $.mobile.ns + "rel='popup' data-theme='" +
				options.columnButtonTheme + "'>" + options.columnButtonText + "</a>" );

		button.button();
		this._addClass( button, "ui-table-columntoggle-btn" );

		this._on( button, {
			click: "_handleButtonClicked"
		} );

		return button;
	},

	_addColumnUI: function( updater ) {
		var ui, id, popupId, table, options, popupThemeAttr, fragment, returnValue;

		id = this._id();
		popupId = id + "-popup";
		table = this.element;
		options = this.options;
		popupThemeAttr = options.columnPopupTheme ?
			( " data-" + $.mobile.ns + "theme='" + options.columnPopupTheme + "'" ) : "";
		fragment = this.document[ 0 ].createDocumentFragment();
		ui = this._ui = {
			button: this.options.columnButton ? this._columnsButton() : null,
			popup: $( "<div id='" + popupId + "'" +
				popupThemeAttr + "></div>" ),
			menu: $( "<fieldset></fieldset>" ).controlgroup()
		};

		this._addClass( ui.popup, "ui-table-columntoggle-popup" );

		// Call the updater before we attach the menu to the DOM, because its job is to populate
		// the menu with checkboxes, and we don't want to do that when it's already attached to
		// the DOM because we want to avoid causing reflows
		returnValue = updater.callback.apply( updater.callbackContext, updater.callbackArguments );

		ui.menu.appendTo( ui.popup );

		fragment.appendChild( ui.popup[ 0 ] );
		if ( ui.button ) {
			fragment.appendChild( ui.button[ 0 ] );
		}
		table.before( fragment );

		ui.popup.popup();

		return returnValue;
	},

	_enhanceColumnToggle: function() {
		return this.options.columnUi ?
			this._addColumnUI( {
				callback: this._superApply,
				callbackContext: this,
				callbackArguments: arguments
			} ) :
			this._superApply( arguments );
	},

	_handleButtonClicked: function( event ) {
		$.mobile.popup.handleLink( this._ui.button );
		event.preventDefault();
	},

	_setToggleState: function() {
		this._ui.menu.find( "input" ).each( function() {
			var checkbox = $( this );

			checkbox
				.prop( "checked",
					( checkbox.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell" ) )
				.checkboxradio( "refresh" );
		} );
	},

	// Use the .jqmData() stored on the checkboxes to determine which columns have show/hide
	// overrides, and make a list of the indices of those that have such overrides
	_recordLockedColumns: function() {
		var headers = this.headers,
			lockedColumns = [];

		// Find the index of the column header associated with each old checkbox among the
		// post-refresh headers and, if the header is still there, make sure the corresponding
		// column will be hidden if the pre-refresh checkbox indicates that the column is
		// hidden by recording its index in the array of hidden columns.
		this._ui.menu.find( "input" ).each( function() {
			var input = $( this ),
				header = input.jqmData( "header" ),
				index = -1;

			if ( header ) {
				index = headers.index( header[ 0 ] );
			}

			if ( index > -1 ) {

				// The column header associated with /this/ checkbox is still present in the
				// post-refresh table and it is locked, so the column associated with this column
				// header is also currently locked. Let's record that.
				lockedColumns = lockedColumns.concat(
					header.hasClass( "ui-table-cell-visible" ) ?
						[ { index: index, visible: true } ] :
					header.hasClass( "ui-table-cell-hidden" ) ?
						[ { index: index, visible: false } ] : [] );

				lockedColumns.push( index );
			}
		} );

		return lockedColumns;
	},

	_restoreLockedColumns: function( lockedColumns ) {
		var index, lockedStatus, input;

		// At this point all columns are visible, so programmatically check/uncheck all the
		// checkboxes that correspond to columns that were previously unlocked so as to ensure that
		// the unlocked status is restored
		for ( index = lockedColumns.length - 1 ; index > -1 ; index-- ) {
			lockedStatus = lockedColumns[ index ];
			input = this.headers.eq( lockedStatus.index ).jqmData( "input" );

			if ( input ) {
				input
					.prop( "checked", lockedStatus.visible )
					.checkboxradio( "refresh" )
					.trigger( "change" );
			}
		}
	},

	_destroy: function() {
		if ( this.options.mode === "columntoggle" && this.options.columnUi ) {
			this._removeColumnUi( this.options.enhanced );
		}
		return this._superApply( arguments );
	}
} );

} );
