/*!
 * jQuery Mobile Column-toggling Table @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Table: Column Toggle
//>>group: Widgets
//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>docs: http://api.jquerymobile.com/table-columntoggle/
//>>demos: http://demos.jquerymobile.com/@VERSION/table-column-toggle/
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./table",
			"./popup",
			"./controlgroup",
			"../jquery-ui/checkboxradio" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "columntoggle",
		columnBtnTheme: null,
		columnPopupTheme: null,
		columnBtnText: "Columns...",
		classes: $.extend( $.mobile.table.prototype.options.classes, {
			popup: "ui-table-columntoggle-popup",
			columnBtn: "ui-table-columntoggle-button",
			priorityPrefix: "ui-table-priority-",
			columnToggleTable: "ui-table-columntoggle"
		} )
	},

	_create: function() {
		var id, popup;

		this._instantiating = true;

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
			this._addToggles( this._ui.menu, true );
		} else {
			this._ui = this._enhanceColToggle();
			this.element.addClass( this.options.classes.columnToggleTable );
		}

		this._setupEvents();

		this._setToggleState();

		this._instantiating = false;
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

		return this._super( options );
	},

	_id: function() {
		return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
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
		} );
	},

	_addToggles: function( menu, keep ) {
		var inputs,
			checkboxIndex = 0,
			opts = this.options,
			container = menu.controlgroup( "container" );

		// allow update of menu on refresh (fixes #5880)
		if ( keep ) {
			inputs = menu.find( "input" );
		} else {
			container.empty();
		}

		// create the hide/show toggles
		this.headers.not( "td" ).each( function() {
			var input, cells,
				header = $( this ),
				priority = $.mobile.getAttribute( this, "priority" ),
				makeInput = function( text ) {
					var input = $( "<input type='checkbox' checked='checked' />" ).uniqueId(),
						label = $( "<label>" ).text( text ).attr( "for", input.attr( "id" ) );

					return input.add( label );
				};

			if ( priority ) {
				cells = header.add( header.jqmData( "cells" ) );
				cells.addClass( opts.classes.priorityPrefix + priority );

				// Make sure the (new?) checkbox is associated with its header via .jqmData() and
				// that, vice versa, the header is also associated with the checkbox
				input = ( keep ? inputs.eq( checkboxIndex++ ) :
					makeInput( ( header.children( "abbr" ).first().attr( "title" ) ||
						header.text() ) )
						.appendTo( container )
						.first()
							.checkboxradio( {
								theme: opts.columnPopupTheme
							} ) )

					// Associate the header with the checkbox
					.jqmData( "header", header )
					.jqmData( "cells", cells );

				// Associate the checkbox with the header
				header.jqmData( "input", input );
			}
		} );

		// set bindings here
		if ( !keep ) {
			menu.controlgroup( "refresh" );
		}
	},

	_menuInputChange: function( evt ) {
		var input = $( evt.target ),
			checked = input[ 0 ].checked;

		input.jqmData( "cells" )
			.toggleClass( "ui-table-cell-hidden", !checked )
			.toggleClass( "ui-table-cell-visible", checked );
	},

	unlock: function() {
		// allow hide/show via CSS only = remove all toggle-locks
		this.element
			.children( "thead, tbody" )
				.children( "tr" )
					.children( ".ui-table-cel-hidden, .ui-table-cell-visible" )
						.removeClass( "ui-table-cell-hidden ui-table-cell-visible" );
	},

	_enhanceColToggle: function() {
		var id , menuButton, popup, menu,
			table = this.element,
			opts = this.options,
			ns = $.mobile.ns,
			buttonTheme = this._themeClassFromOption( "ui-btn-", opts.columnBtnTheme ),
			popupThemeAttr = opts.columnPopupTheme ?
				( " data-" + $.mobile.ns + "theme='" + opts.columnPopupTheme + "'" ) : "",
			fragment = this.document[ 0 ].createDocumentFragment();

		id = this._id() + "-popup";
		menuButton = $( "<a href='#" + id + "' " +
			"id='" + this._id() + "-button' " +
			" ui-corner-all ui-shadow ui-mini' " +
			"class='ui-btn ui-corner-all ui-shadow ui-mini" +
				( opts.classes.columnBtn ? " " + opts.classes.columnBtn : "" ) +
				( buttonTheme ? " " + buttonTheme : "" ) + "' " +
			"data-" + ns + "rel='popup'>" + opts.columnBtnText + "</a>" );
		popup = $( "<div class='" + opts.classes.popup + "' id='" + id + "'" +
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
		});

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

	refresh: function() {
		var lockedColumns;

		// Calling _super() here updates this.headers
		this._super();

		if ( !this._instantiating && this.options.mode === "columntoggle" ) {

			// Record which columns are locked
			lockedColumns = this._recordLockedColumns();

			// columns not being replaced must be cleared from input toggle-locks
			this.unlock();

			// update columntoggles and cells
			this._addToggles( this._ui.menu, false );

			// Make sure columns that were locked before this refresh, and which are still around
			// after the refresh, are restored to their locked state
			this._restoreLockedColumns( lockedColumns );
		}
	},

	_setToggleState: function() {
		this._ui.menu.find( "input" ).each( function() {
			var checkbox = $( this );

			this.checked = checkbox.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			checkbox.checkboxradio( "refresh" );
		} );
	},

	_destroyHeader: function( index, headerElement ) {
		var priority, cells,
			header = $( headerElement );

		if ( !this.options.enhanced ) {
			priority = $.mobile.getAttribute( headerElement, "priority" );
			cells = header.add( header.jqmData( "cells" ) );

			if ( priority ) {
				cells.removeClass( this.options.classes.priorityPrefix + priority );
			}
		}

		// This data has to be removed whether or not the widget is pre-rendered
		header.jqmRemoveData( "input" );
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
				this.element.removeClass( this.options.classes.columnToggleTable );
				this._ui.popup.remove();
				this._ui.button.remove();
			}
			this.headers.not( "td" ).each( $.proxy( this, "_destroyHeader" ) );
		}
		return this._superApply( arguments );
	}
} );

} );
