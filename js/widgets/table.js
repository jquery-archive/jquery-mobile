//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data tables
//>>label: Table
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "./page.sections", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.widget, {
	options: {
		classes: {
			table: "ui-table"
		}
	},

	_create: function() {
		var $el = this.element,
			trs = this.element.find( "thead tr" ),
			headers = this.element.find( "tr:eq(0)" ).children(),
			allHeaders = headers.add( trs.children() );

		this.element.addClass( this.options.classes.table );

		$.extend( this, {

			// Expose headers and allHeaders properties on the widget
			// headers references the THs within the first TR in the table
			headers: headers,

			// allHeaders references headers, plus all THs in the thead, which may include several rows, or not
			allHeaders: allHeaders
		});

		trs.each( function() {
			var coltally = 0,
				$this = $( this );

			$this.children().each( function() {
				var $this = $( this ),
					span = parseInt( $this.attr( "colspan" ), 10 ),
					sel = ":nth-child(" + ( coltally + 1 ) + ")",
					j;

				$this.jqmData( "colstart", coltally + 1 );

				if( span ) {
					for( j = 0; j < span - 1; j++ ) {
						coltally++;
						sel += ", :nth-child(" + ( coltally + 1 ) + ")";
					}
				}

				// Store "cells" data on header as a reference to all cells in the same column as this TH
				$this
					.jqmData( "cells", $el.find( "tr" ).not( trs.eq( 0 ) ).not( this ).children( sel ) );

				coltally++;
			});
		});
	}
});

$.mobile.table.initSelector = ":jqmData(role='table')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.table" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

