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

define( [
	"jquery",
	"./table" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

return $.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "columntoggle",
		classes: $.extend( {}, $.mobile.table.prototype.options.classes, {
			priorityPrefix: "ui-table-priority-",
			columnToggleTable: "ui-table-columntoggle"
		} )
	},

	_create: function() {

		// Needed because the superclass calls refresh() which needs to behave differently if
		// _create() hasn't happened yet
		this._instantiating = true;

		this._super();

		if ( this.options.mode !== "columntoggle" ) {
			return;
		}

		if ( !this.options.enhanced ) {
			this.element.addClass( this.options.classes.columnToggleTable );
		}

		// Cause refresh() to revert to normal operation
		this._instantiating = false;
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

	unlock: function() {
		// allow hide/show via CSS only = remove all toggle-locks
		this.element
			.children( "thead, tbody" )
				.children( "tr" )
					.children( ".ui-table-cel-hidden, .ui-table-cell-visible" )
						.removeClass( "ui-table-cell-hidden ui-table-cell-visible" );
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

	_destroyHeader: function( header ) {
		var priority, cells;

		if ( !this.options.enhanced ) {
			priority = $.mobile.getAttribute( header, "priority" );
			cells = header.add( header.jqmData( "cells" ) );

			if ( priority ) {
				cells.removeClass( this.options.classes.priorityPrefix + priority );
			}
		}
	},

	_destroy: function() {
		if ( this.options.mode === "columntoggle" ) {
			if ( !this.options.enhanced ) {
				this.element.removeClass( this.options.classes.columnToggleTable );
			}
			this.headers.not( "td" ).each( $.proxy( function( index, element ) {
				this._destroyHeader( $( element ) );
			}, this ));
		}
		return this._superApply( arguments );
	}
} );

} );
