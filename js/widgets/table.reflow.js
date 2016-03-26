/*!
 * jQuery Mobile Reflow Table @VERSION
 * http://jquerymobile.com
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license.
 * http://jquery.org/license
 */

//>>label: Table: reflow
//>>group: Widgets
//>>description: Extends the table widget to reflow on narrower screens
//>>docs: http://api.jquerymobile.com/table/
//>>demos: http://demos.jquerymobile.com/@VERSION/table-reflow/
//>>css.structure: ../css/structure/jquery.mobile.table.reflow.css

( function( factory ) {
	if ( typeof define === "function" && define.amd ) {

		// AMD. Register as an anonymous module.
		define( [
			"jquery",
			"./table" ], factory );
	} else {

		// Browser globals
		factory( jQuery );
	}
} )( function( $ ) {

return $.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "reflow",
		classes: {
			"ui-table-reflow": "",
			"ui-table-cell-label": "",
			"ui-table-cell-label-top": ""
		}
	},

	_create: function() {
		if ( this.options.mode === "reflow" && !this.options.enhanced ) {
			this._addClass( "ui-table-reflow" );
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
			labelClasses = "ui-table-cell-label";
			cells = header.jqmData( "cells" );
			colstart = $.mobile.getAttribute( headerCell, "colstart" );

			if ( cells.not( headerCell ).filter( "thead th" ).length > 0 ) {
				labelClasses = labelClasses + ( " " + "ui-table-cell-label-top" );
				iteration = parseInt( headerCell.getAttribute( "colspan" ), 10 );

				if ( iteration ) {
					cells = cells.filter( "td:nth-child(" + iteration + "n + " + colstart + ")" );
				}
			}

			this._addLabels( cells, labelClasses, contents );
		}
	},

	_addLabels: function( cells, labelClasses, contents ) {
		var b = $( "<b>" );
		if ( contents.length === 1 && contents[ 0 ].nodeName.toLowerCase() === "abbr" ) {
			contents = contents.eq( 0 ).attr( "title" );
		}

		// .not fixes #6006
		this._addClass( b, labelClasses );
		b.append( contents );
		cells
			.not( ":has(b." + labelClasses.split( " " ).join( "." ) + ")" )
				.prepend( b );
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
					.children( "tbody" )
						.find( "b.ui-table-cell-label"  )
							.remove();
			}
		}

		return this._superApply( arguments );
	}
} );

} );
