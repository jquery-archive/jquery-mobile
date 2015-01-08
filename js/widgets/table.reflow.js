//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to reflow on narrower screens
//>>label: Table: reflow
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.reflow.css

define( [ "jquery", "./table" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "reflow",
		classes: $.extend( {}, $.mobile.table.prototype.options.classes, {
			reflowTable: "ui-table-reflow",
			cellLabels: "ui-table-cell-label",
			cellLabelsTop: "ui-table-cell-label-top"
		})
	},

	_create: function() {
		if ( this.options.mode === "reflow" && !this.options.enhanced ) {
			this.element.addClass( this.options.classes.reflowTable );
		}

		return this._superApply( arguments );
	},

	_refreshHeaderCell: function( cellIndex, element, columnCount ) {
		element.setAttribute( "data-" + $.mobile.ns + "colstart", columnCount + 1 );
		return this._superApply( arguments );
	},

	refresh: function() {
		this._superApply( arguments );
		if ( this.options.mode === "reflow" ) {

			// After the refresh completes, we need to iterate over the headers again, but this
			// time in reverse order so that top-level headers are visited last. This causes <b>
			// labels to be added in the correct order using a simple .prepend().
			$( this.allHeaders.get().reverse() ).each( $.proxy( this, "_updateCellsFromHeader" ) );
		}
	},

	_updateCellsFromHeader: function( index, headerCell ) {
		var iteration, cells, colstart, labelClasses,
			header = $( headerCell ),
			contents = header.clone().contents();

		if ( contents.length > 0  ) {

			labelClasses = this.options.classes.cellLabels;
			cells = header.jqmData( "cells" );
			colstart = $.mobile.getAttribute( headerCell, "colstart" );

			if ( cells.not( headerCell ).filter( "thead th" ).length > 0 ) {
				labelClasses = labelClasses + ( " " + this.options.classes.cellLabelsTop );
				iteration = parseInt( headerCell.getAttribute( "colspan" ), 10 );

				if ( iteration ) {
					cells = cells.filter( "td:nth-child("+ iteration + "n + " + colstart + ")" );
				}
			}

			this._addLabels( cells, labelClasses, contents );
		}
	},

	_addLabels: function( cells, labelClasses, contents ) {
		if ( contents.length === 1 && contents[ 0 ].nodeName.toLowerCase() === "abbr" ) {
			contents = contents.eq( 0 ).attr( "title" );
		}

		// .not fixes #6006
		cells
			.not( ":has(b." + labelClasses.split( " " ).join( "." ) + ")" )
				.prepend( $( "<b class='" + labelClasses + "'></b>" ).append( contents ) );
	},

	_destroy: function() {
		var colstartAttr;

		if ( this.options.mode === "reflow" ) {
			colstartAttr = "data-" + $.mobile.ns + "colstart";

			if ( !this.options.enhanced ) {
				this.element
					.children( "thead" )
						.find( "[" + colstartAttr + "]" )
							.removeAttr( colstartAttr )
						.end()
					.end()
					.removeClass( this.options.classes.reflowTable )
					.children( "tbody" )
						.find( "b." + this.options.classes.cellLabels )
							.remove();
			}
		}

		return this._superApply( arguments );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
