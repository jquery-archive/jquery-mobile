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
		classes: $.extend( $.mobile.table.prototype.options.classes, {
			reflowTable: "ui-table-reflow",
			cellLabels: "ui-table-cell-label"
		} )
	},

	_create: function() {
		if ( this.options.mode === "reflow" && !this.options.enhanced ) {
			this.element.addClass( this.options.classes.reflowTable );
		}

		return this._superApply( arguments );
	},

	rebuild: function() {
		this._super();

		if ( this.options.mode === "reflow" ) {
			this._refresh( false );
		}
	},

	_refreshHeadCell: function( cellIndex, element, columnCount ) {
		element.setAttribute( "data-" + $.mobile.ns + "colstart", columnCount + 1 );
		return this._superApply( arguments );
	},

	_refresh: function() {
		this._superApply( arguments );
		if ( this.options.mode === "reflow" ) {
			this._updateReflow( );
		}
	},

	_updateReflow: function() {
		var table = this,
			opts = this.options;

		// get headers in reverse order so that top-level headers are appended last
		$( table.allHeaders.get().reverse() ).each( function() {
			var cells = $( this ).jqmData( "cells" ),
				colstart = $.mobile.getAttribute( this, "colstart" ),
				hierarchyClass = cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
				contents = $( this ).clone().contents(),
				iteration, filter;

			if ( hierarchyClass ) {
				iteration = parseInt( this.getAttribute( "colspan" ), 10 );
				filter = "";

				if ( iteration ) {
					filter = "td:nth-child(" + iteration + "n + " + ( colstart ) + ")";
				}

				table._addLabels( cells.filter( filter ),
					opts.classes.cellLabels + hierarchyClass, contents );
			} else {
				table._addLabels( cells, opts.classes.cellLabels, contents );
			}
		} );
	},

	_addLabels: function( cells, label, contents ) {
		if ( contents.length === 1 && contents[ 0 ].nodeName.toLowerCase() === "abbr" ) {
			contents = contents.eq( 0 ).attr( "title" );
		}
		// .not fixes #6006
		cells
			.not( ":has(b." + label + ")" )
				.prepend( $( "<b class='" + label + "'></b>" ).append( contents ) );
	},

	_destroy: function() {
		var colstartAttr;

		if ( this.options.mode === "reflow" ) {
			colstartAttr = "data-" + $.mobile.ns + "colstart";

			// We remove these attributes because they're added during refresh, so we can't tell
			// whether they've been present in the initial markup or not
			this.element
				.children( "thead" )
					.find( "[" + colstartAttr + "]" )
						.removeAttr( colstartAttr );

			if ( !this.options.enhanced ) {
				this.element
					.removeClass( this.options.classes.reflowTable )
					.children( "tbody" )
						.find( "b." + this.options.classes.cellLabels )
						.remove();
			}
		}

		return this._superApply( arguments );
	}
} );

} );
