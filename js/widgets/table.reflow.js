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
		classes: $.extend( $.mobile.table.prototype.options.classes, {
			reflowTable: "ui-table-reflow",
			cellLabels: "ui-table-cell-label"
		})
	},

	_create: function() {
		this._super();

		// If it's not reflow mode, return here.
		if ( this.options.mode !== "reflow" ) {
			return;
		}

		if ( !this.options.enhanced ) {
			this.element.addClass( this.options.classes.reflowTable );

			this._updateReflow();
		}
	},

	rebuild: function() {
		this._super();

		if ( this.options.mode === "reflow" ) {
			this._refresh( false );
		}
	},

	_refresh: function( create ) {
		this._super( create );
		if ( !create && this.options.mode === "reflow" ) {
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

				if ( contents.length > 0  ) {

					if ( hierarchyClass ) {
						iteration = parseInt( this.getAttribute( "colspan" ), 10 );
						filter = "";

						if ( iteration ) {
							filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
						}

						table._addLabels( cells.filter( filter ),
							opts.classes.cellLabels + hierarchyClass, contents );
					} else {
						table._addLabels( cells, opts.classes.cellLabels, contents );
					}

				}
		});
	},

	_addLabels: function( cells, label, contents ) {
		if ( contents.length === 1 && contents[ 0 ].nodeName.toLowerCase() === "abbr" ) {
			contents = contents.eq( 0 ).attr( "title" );
		}
		// .not fixes #6006
		cells
			.not( ":has(b." + label + ")" )
				.prepend( $( "<b class='" + label + "'></b>" ).append( contents ) );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
