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
		var id, $menuButton, $popup, $menu,
			$table = this.element,
			o = this.options,
			ns = $.mobile.ns,
			menuInputChange = function(/* e */) {
				var checked = this.checked;
				$( this ).jqmData( "cells" )
					.toggleClass( "ui-table-cell-hidden", !checked )
					.toggleClass( "ui-table-cell-visible", checked );
			};

		this._super();

		if( o.mode !== "columntoggle" ) {
			return;
		}

		this.element.addClass( o.classes.columnToggleTable );

		id = ( $table.attr( "id" ) || o.classes.popup ) + "-popup"; //TODO BETTER FALLBACK ID HERE
		$menuButton = $( "<a href='#" + id + "' class='" + o.classes.columnBtn + "' data-" + ns + "rel='popup' data-" + ns + "mini='true'>" + o.columnBtnText + "</a>" );
		$popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + o.classes.popup + "' id='" + id + "'></div>" );
		$menu = $( "<fieldset data-" + ns + "role='controlgroup'></fieldset>" );

		// create the hide/show toggles
		this.headers.not( "td" ).each( function() {
			var $this = $( this ),
				priority = $this.jqmData( "priority" ),
				$cells = $this.add( $this.jqmData( "cells" ) );

			if( priority ) {
				$cells.addClass( o.classes.priorityPrefix + priority );

				$("<label><input type='checkbox' checked />" + $this.text() + "</label>" )
					.appendTo( $menu )
					.children( 0 )
					.jqmData( "cells", $cells )
					.checkboxradio( {
						theme: o.columnPopupTheme
					});
			}
		});
		$menu.appendTo( $popup );

		// bind change event listeners to inputs - TODO: move to a private method?
		$menu.on( "change", "input", menuInputChange );

		$menuButton
			.insertBefore( $table )
			.buttonMarkup( {
				theme: o.columnBtnTheme
			});

		$popup
			.insertBefore( $table )
			.popup();

		// refresh method

		this._on( $.mobile.window, { "throttledresize": "refresh" } );

		$.extend( this, {
			_menu: $menu,
			_menuInputChange: menuInputChange
		});

		this.refresh();
	},

	_destroy: function() {
		this._menu.off( "change", "input", this._menuInputChange );
		this._super();
	},

	refresh: function() {
		this._menu.find( "input" ).each( function() {
			var $this = $( this );

			this.checked = $this.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			$this.checkboxradio( "refresh" );
		});
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
