//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data tables
//>>label: Table
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", {
	options: {
		classes: {
			table: "ui-table"
		},
		enhanced: false
	},

	_create: function() {
		if ( !this.options.enhanced ) {
			this.element.addClass( this.options.classes.table );
		}

		// extend here, assign on refresh > _setHeaders
		$.extend( this, {

			// Expose headers and allHeaders properties on the widget
			// headers references the THs within the first TR in the table
			headers: undefined,

			// allHeaders references headers, plus all THs in the thead, which may
			// include several rows, or not
			allHeaders: undefined
		});

		this._refresh( true );
	},

	_setHeaders: function() {
		var trs = this.element.find( "thead tr" );

		this.headers = this.element.find( "tr:eq(0)" ).children();
		this.allHeaders = this.headers.add( trs.children() );
	},

	refresh: function() {
		this._refresh();
	},

	rebuild: $.noop,

	_refresh: function( /* create */ ) {
		var table = this.element,
			trs = table.find( "thead tr" );

		// updating headers on refresh (fixes #5880)
		this._setHeaders();

		// Iterate over the trs
		trs.each( function() {
			var columnCount = 0;

			// Iterate over the children of the tr
			$( this ).children().each( function() {
				var span = parseInt( this.getAttribute( "colspan" ), 10 ),
					selector = ":nth-child(" + ( columnCount + 1 ) + ")",
					j;

				this.setAttribute( "data-" + $.mobile.ns + "colstart", columnCount + 1 );

				if ( span ) {
					for( j = 0; j < span - 1; j++ ) {
						columnCount++;
						selector += ", :nth-child(" + ( columnCount + 1 ) + ")";
					}
				}

				// Store "cells" data on header as a reference to all cells in the
				// same column as this TH
				$( this ).jqmData( "cells", table.find( "tr" ).not( trs.eq( 0 ) ).not( this ).children( selector ) );

				columnCount++;
			});
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

