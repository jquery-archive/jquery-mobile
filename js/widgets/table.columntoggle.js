//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>label: Table: Column Toggle
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.css


define( [
	"jquery",
	"./table",
	"../jquery.mobile.buttonMarkup",
	"./popup",
	"../jquery.mobile.fieldContain",
	"./controlgroup",
	"./forms/checkboxradio" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "columntoggle",
		columnBtnTheme: null,
		columnPopupTheme: null,
		columnBtnText: "Columns...",
		classes: $.extend( $.mobile.table.prototype.options.classes, {
			popup: "ui-table-columntoggle-popup",
			columnBtn: "ui-table-columntoggle-btn",
			priorityPrefix: "ui-table-priority-",
			columnToggleTable: "ui-table-columntoggle"
		})
	},

	_create: function() {
		this.refresh();
	},

	refresh: function( create ) {
		var id, $menuButton, $popup, $menu,
			$table = this.element,
			o = this.options,
			ns = $.mobile.ns,
			menuInputChange = function( e ) {
				var checked = this.checked;
				$( this ).jqmData( "cells" )
					.toggleClass( "ui-table-cell-hidden", !checked )
					.toggleClass( "ui-table-cell-visible", checked );
			},
			id = ( $table.attr( "id" ) || o.classes.popup ) + "-popup"; //TODO BETTER FALLBACK ID HERE

		this._super();
		
		if( o.mode !== "columntoggle" ) {
			return;
		}

		if ( o.set ) {
			this.element.addClass( o.classes.columnToggleTable );

			$menuButton = $( "<a href='#" + id + "' class='" + o.classes.columnBtn + "' data-" + ns + "rel='popup' data-" + ns + "mini='true'>" + o.columnBtnText + "</a>" );
			$popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + o.classes.popup + "' id='" + id + "'></div>" );
			$menu = $( "<fieldset data-" + ns + "role='controlgroup'></fieldset>" );
		}

		// create the hide/show toggles
		this.headers.not( "td" ).each( function( i ) {
			var $this = $( this ),
				priority = $this.jqmData( "priority" ),
				$cells = $this.add( $this.jqmData( "cells" ) );

			if( priority ) {
				$cells.addClass( o.classes.priorityPrefix + priority );
				if ( o.set ) {
					$("<label><input type='checkbox' checked />" + $this.text() + "</label>" )
						.appendTo( $menu )
						.children( 0 )
						.jqmData( "cells", $cells )
						.checkboxradio( {
							theme: o.columnPopupTheme
						});
				} else {
					$('#' + id + ' fieldset div:eq(' + i +')').find('input').jqmData("cells", $cells);
				}
			}
		});
		if ( o.set ) {
			$menu.appendTo( $popup );
		}

		if ( $menu === undefined ) {
			$menu = $('#' + id + ' fieldset');
		}

		// bind change event listeners to inputs - TODO: move to a private method?
		if ( o.set ) {
			$menu.on( "change", "input", menuInputChange );

			$menuButton
				.insertBefore( $table )
				.buttonMarkup( {
					theme: o.columnBtnTheme
				});

			$popup
				.insertBefore( $table )
				.popup();
		}

		// update method - renamed, else conflict with table("refresh")
		this._on( $.mobile.window, { "throttledresize": "update" } );

		$.extend( this, {
			_menu: $menu,
			_menuInputChange: menuInputChange
		});

		this.update();

		// table is ready, set to false
		o.set = false;
	},

	_destroy: function() {
		this._menu.off( "change", "input", this._menuInputChange );
		this._super();
	},

	update: function() {
		var o = this.options;
		this._menu.find( "input" ).each( function() {
			var $this = $( this );

			if (this.checked) {
				if ( !o.set ) {
					$( this ).jqmData( "cells" ).addClass('ui-table-cell-visible');
				}
				$this.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			} else {
				$this.jqmData( "cells" ).addClass('ui-table-cell-hidden');
			}
			$this.checkboxradio( "refresh" );
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
