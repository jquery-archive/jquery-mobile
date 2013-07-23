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
		var opts = this.options;

		this._super();

		// If it's not reflow mode, return here.
		if( opts.mode !== "reflow" ) {
			return;
		}

		if( !opts.enhanced ) {
			this.element.addClass( opts.classes.reflowTable );

			this._updateReflow();
		}
	},

	rebuild: function() {
		this.refresh( false );
	},

	refresh: function( create ) {
		this._super( create );
		if ( !create && this.options.mode === "reflow" ) {
			this._updateReflow( );
		}
	},

	_updateReflow: function() {
		var $el = this,
			opts = this.options;

		// get headers in reverse order so that top-level headers are appended last
		$( $el.allHeaders.get().reverse() ).each( function() {
			var that = this,
				$cells = $( that ).data( "cells" ),
				colstart = $.mobile.getAttribute( this, "colstart", true ),
				hierarchyClass = $cells.not( that ).filter( "thead th" ).length && " ui-table-cell-label-top",
				text = $( that ).text(),
				iteration, filter;

				if( text !== ""  ) {

					if( hierarchyClass ) {
						iteration = parseInt( that.getAttribute( "colspan" ), 10 );
						filter = "";

						if( iteration ){
							filter = "td:nth-child("+ iteration +"n + " + ( colstart ) +")";
						}

						$el._addLabels( $cells.filter( filter ), opts.classes.cellLabels + hierarchyClass, text );
					} else {
						$el._addLabels( $cells, opts.classes.cellLabels, text );
					}

				}
		});
	},

	_addLabels: function( cells, label, text ) {
		// .not fixes #6006
		cells.not( ":has(b." + label + ")").prepend( "<b class='" + label + "'>" + text + "</b>"  );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
