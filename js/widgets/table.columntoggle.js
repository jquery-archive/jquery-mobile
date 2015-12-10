
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
			"./table" ], factory );
	} else {

		factory( jQuery );
	}
} )( function( $, undefined ) {

return $.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "columntoggle",
		classes: {
			"ui-table-cell-hidden": "",
			"ui-table-cell-visible": "",
			"ui-table-priority-": "",
			"ui-table-columntoggle": ""
		}
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
			this._enhanceColumnToggle();
		}

		// Cause refresh() to revert to normal operation
		this._instantiating = false;
	},

	_enhanceColumnToggle: function() {
		this._addClass( "ui-table-columntoggle" );
		this._updateHeaderPriorities();
	},

	_updateVariableColumn: function( header, cells, priority ) {
		this._addClass( cells, "ui-table-priority-" + priority );
	},

	_updateHeaderPriorities: function( state ) {
		this.headers.each( $.proxy( function( index, element ) {
			var header = $( element ),
				priority = $.mobile.getAttribute( element, "priority" );

			if ( priority ) {
				this._updateVariableColumn(
					header,
					header.add( header.jqmData( "cells" ) ),
					priority,
					state );
			}
		}, this ) );
	},

	_setColumnVisibility: function( header, visible ) {
		var cells = header.jqmData( "cells" );

		if ( cells ) {
			cells = cells.add( header );
			this._unlock( cells );
			this._addClass( cells,
				visible ? "ui-table-cell-visible" : "ui-table-cell-hidden" );
		}
	},

	setColumnVisibility: function( cell, visible ) {
		var header;

		// If cell is a number, then simply index into the headers array
		if ( $.type( cell ) === "number" ) {
			header = this.headers.eq( cell );

		// Otherwise it's assumed to be a jQuery collection object
		} else if ( cell.length > 0 ) {

			// If it's one of the headers, then we already have the header we wanted
			if ( this.headers.index( cell[ 0 ] ) >= 0 ) {
				header = cell.first();

			// Otherwise we assume it's one of the cells, so look for it in the "cells" data for
			// each header
			} else {
				this.headers.each( $.proxy( function( index, singleHeader ) {
					var possibleHeader = $( singleHeader ),
						cells = possibleHeader.jqmData( "cells" );

					if ( ( cells ? cells.index( cell[ 0 ] ) : -1 ) >= 0 ) {
						header = possibleHeader;
						return false;
					}
				}, this ) );
			}
		}

		if ( header ) {
			this._setColumnVisibility( header, visible );
		}
	},

	_unlock: function( cells ) {

		// Allow hide/show via CSS only = remove all toggle-locks
		var locked = ( cells ||
			this.element
				.children( "thead, tbody" )
					.children( "tr" )
						.children( ".ui-table-cell-hidden, .ui-table-cell-visible" ) );
		this._removeClass( locked, "ui-table-cell-hidden ui-table-cell-visible" );
	},

	_recordLockedColumns: $.noop,
	_restoreLockedColumns: $.noop,

	refresh: function() {
		var lockedColumns;

		// Calling _super() here updates this.headers
		this._super();

		if ( !this._instantiating && this.options.mode === "columntoggle" ) {

			// Record which columns are locked
			lockedColumns = this._recordLockedColumns();

			// Columns not being replaced must be cleared from input toggle-locks
			this._unlock();

			// Update priorities
			this._updateHeaderPriorities();

			// Make sure columns that were locked before this refresh, and which are still around
			// after the refresh, are restored to their locked state
			this._restoreLockedColumns( lockedColumns );
		}
	},

	_destroy: function() {
		if ( this.options.mode === "columntoggle" ) {
			if ( !this.options.enhanced ) {
				this.headers.each( $.proxy( function( index, element ) {
					var header,
						priority = $.mobile.getAttribute( element, "priority" );

					if ( priority ) {
						header = $( element );
						header
							.add( header.jqmData( "cells" ) );
					}
				}, this ) );
			}
		}
		return this._superApply( arguments );
	}
} );

} );
