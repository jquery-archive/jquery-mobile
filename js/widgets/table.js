//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data tables
//>>label: Table
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../widget", "./page" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", {
	options: {
		classes: {
			table: "ui-table"
		},
		enhanced: false
	},

	// Expose headers and allHeaders properties on the widget headers references the THs within the
	// first TR in the table
	headers: null,

	// allHeaders references headers, plus all THs in the thead, which may or may not include
	// several rows
	allHeaders: null,

	_create: function() {
		var options = this.options;

		if ( !options.enhanced ) {
			this.element.addClass( options.classes.table +
				( options.disabled ? " ui-state-disabled" : "" ) );
		}

		this.refresh();
	},

	_setOptions: function( options ) {
		if ( options.disabled !== undefined ) {
			this.element.toggleClass( "ui-state-disabled", options.disabled );
		}
		return this._super( options );
	},

	_setHeaders: function() {
		this.headerRows = this.element.children( "thead" ).children( "tr" );
		this.headers = this.headerRows.first().children();
		this.allHeaders = this.headerRows.children();
		this.allRowsExceptFirst = this.element
			.children( "thead,tbody" )
				.children( "tr" )
					.not( this.headerRows.eq( 0 ) );
	},

	// Deprecated as of 1.5.0 and will be removed in 1.6.0 - use refresh() instead
	rebuild: function() {
		this.refresh();
	},

	_refreshHeaderCell: function( cellIndex, element, columnCount ) {
		var columnIndex,
			span = parseInt( element.getAttribute( "colspan" ), 10 ),
			selector = ":nth-child(" + ( columnCount + 1 ) + ")";

		if ( span ) {
			for( columnIndex = 0; columnIndex < span - 1; columnIndex++ ) {
				columnCount++;
				selector += ", :nth-child(" + ( columnCount + 1 ) + ")";
			}
		}

		// Store "cells" data on header as a reference to all cells in the same column as this TH
		$( element ).jqmData( "cells",
			this.allRowsExceptFirst
				.not( element )
				.children( selector ) );

		return columnCount;
	},

	_refreshHeaderRow: function( rowIndex, element ) {
		var columnCount = 0;

		// Iterate over the children of the tr
		$( element ).children().each( $.proxy( function( cellIndex, element ) {
			columnCount = this._refreshHeaderCell( cellIndex, element, columnCount ) + 1;
		}, this ) );
	},

	refresh: function() {
		// updating headers on refresh (fixes #5880)
		this._setHeaders();

		// Iterate over the header rows
		this.headerRows.each( $.proxy( this, "_refreshHeaderRow" ) );
	},

	_destroy: function() {
		var table = this.element;

		if ( !this.options.enhanced ) {
			table.removeClass( this.options.classes.table );
		}

		// We have to remove "cells" data even if the table was originally enhanced, because it is
		// added during refresh
		table.find( "thead tr" ).children().each( function() {
			$( this ).jqmRemoveData( "cells" );
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

