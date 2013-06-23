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
		var o = this.options;

		this._super();

		// If it's not reflow mode, return here.
		if( o.mode !== "reflow" ) {
			return;
		}

		this.element.addClass( o.classes.reflowTable );

		// get headers in reverse order so that top-level headers are appended last
		$( this.allHeaders.get().reverse() ).each( function() {
			// create the hide/show toggles
			var $cells = $( this ).jqmData( "cells" ),
				colstart = $( this ).jqmData( "colstart" ),
				hierarchyClass = $cells.not( this ).filter( "thead th" ).length && " ui-table-cell-label-top",
				text = $(this).text(),
				iteration, filter;

				if( text !== ""  ) {

					if( hierarchyClass ) {
						iteration = parseInt( $( this ).attr( "colspan" ), 10 );
						filter = "";

						if( iteration ){
							filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
						}
						$cells.filter( filter ).prepend( "<b class='" + o.classes.cellLabels + hierarchyClass + "'>" + text + "</b>"  );
					}
					else {
						$cells.prepend( "<b class='" + o.classes.cellLabels + "'>" + text + "</b>"  );
					}

				}
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
