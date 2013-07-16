//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Responsive presentation and behavior for HTML data tables
//>>label: Table
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.css
//>>css.theme: ../css/themes/default/jquery.mobile.theme.css

define( [ "jquery", "../jquery.mobile.widget", "./page", "../jquery.mobile.registry" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", {

	options: {
		classes: {
			table: "ui-table"
		},
		referenceClass: "",
		enhanced: false
	},

	_create: function() {
		var o = this.options;

		if ( !o.enhanced ) {
			this.element.addClass( this.options.classes.table );
		}

		// extend here, assign on refresh > _setHeaders
		$.extend( this, {

			// Expose headers and allHeaders properties on the widget
			// headers references the THs within the first TR in the table
			headers: undefined,

			// allHeaders references headers, plus all THs in the thead, which may include several rows, or not
			allHeaders: undefined
		});

		this.refresh( true );
	},

	_setHeaders: function() {
		var trs = this.element.find( "thead tr" );

		this.headers = this.element.find( "tr:eq(0)" ).children();
		this.allHeaders = this.headers.add( trs.children() );
	},

	refresh: function( create ) {
		var $el = this.element,
			trs = $el.find( "thead tr" );

		// updating headers on refresh (fixes #5880)
		this._setHeaders();

		trs.each( function() {
			var coltally = 0,
				$this = $( this );

			$this.children().each( function() {
				var that = this,
					span = parseInt( $.mobile.getAttribute( that, "colspan", true), 10 ),
					sel = ":nth-child(" + ( coltally + 1 ) + ")",
					j;

				that.setAttribute( "data-colstart", coltally + 1 );

				if( span ) {
					for( j = 0; j < span - 1; j++ ) {
						coltally++;
						sel += ", :nth-child(" + ( coltally + 1 ) + ")";
					}
				}

				// Store "cells" data on header as a reference to all cells in the 
				// same column as this TH
				$( that ).data( "cells", $el.find( "tr" ).not( trs.eq( 0 ) ).not( that ).children( sel ) );

				coltally++;
			});
		});

		// propagate refresh on reflow/columntoggle
		if ( create === undefined ) {
			this.element.trigger( "refresh" );
		}
}

});

$.mobile.table.initSelector = ":jqmData(role='table')";

//auto self-init widgets
$.mobile._enhancer.add( "mobile.table" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");

