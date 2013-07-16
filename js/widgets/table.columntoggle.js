//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>label: Table: Column Toggle
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.css


define( [
	"jquery",
	"./table",
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
		var o = this.options;

		this._super();

		if( o.mode !== "columntoggle" ) {
			return;
		}

		$.extend( this, {
			// will be set inside _enhance() or by referenceClass
			_menu: undefined
		});

		if( !o.enhanced ) {

			this.element.addClass( o.classes.columnToggleTable );

			this._enhanceColToggle();

		} else {
			// NOTE: need a better way to access elements pre-enhanced by the user
			this._menu = $( "." + o.referenceClass );
		}

		this._setupEvents();

		this._setToggleState();
	},

	_setupEvents: function () {
		//NOTE: inputs are bound in bindToggles,
		// so it can be called on refresh, too

		// update column toggles on resize
		this._on( $.mobile.window, {
			throttledresize: "_setToggleState"
		});

		// bind to refresh call of table
		this._on( this.element, {
			refresh: "_refreshColToggle"
		});
	},

	_bindToggles: function() {
		var inputs = this._menu.find( "input" );

		this._on( inputs, {
			change: "_menuInputChange"
		});
	},

	_addToggles: function( menu ) {
		var o = this.options;
		// allow update of menu on refresh (fixes #5880)
		menu.empty();

		// create the hide/show toggles
		this.headers.not( "td" ).each( function() {

			var $this = $( this ),
				priority = $.mobile.getAttribute( this, "priority", true ),
				$cells = $this.add( $this.data( "cells" ) );

			if( priority ) {
				$cells.addClass( o.classes.priorityPrefix + priority );

				$("<label><input type='checkbox' checked />" + $this.text() + "</label>" )
					.appendTo( menu )
					.children( 0 )
					.data( "cells", $cells )
					.checkboxradio( {
						theme: o.columnPopupTheme
					});
			}

		});

		// set bindings here
		this._bindToggles();
	},

	_menuInputChange: function( e ) {
		var that = e.target,
			$that = $( that ),
			checked = that.checked,
			locked = that.getAttribute("locked");

		$that.data( "cells" )
			.toggleClass( "ui-table-cell-hidden", !checked )
			.toggleClass( "ui-table-cell-visible", checked );

		if ( locked ) {
			$that.removeAttr( "locked" );

			this._unlockCells( $that.data( "cells" ) );
		} else {
			$that.attr( "locked" , true);
		}
	},

	_unlockCells: function( cells ) {
		// allow hide/show via CSS only = remove all toggle-locks
		cells.removeClass( "ui-table-cell-hidden ui-table-cell-visible");
	},

	_enhanceColToggle: function() {
		var id , $menuButton, $popup, $menu,
			$table = this.element,
			o = this.options,
			ns = $.mobile.ns;

		id = ( $table.attr( "id" ) || o.classes.popup ) + "-popup"; //TODO BETTER FALLBACK ID HERE
		$menuButton = $( "<a href='#" + id + "' class='" + o.classes.columnBtn + "' data-" + ns + "rel='popup' data-" + ns + "mini='true'>" + o.columnBtnText + "</a>" );
		$popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + o.classes.popup + "' id='" + id + "'></div>" );
		$menu = $( "<fieldset data-" + ns + "role='controlgroup'></fieldset>" );

		this._menu = $menu;

		// set extension here
		this._addToggles( this._menu );

		this._menu.appendTo( $popup );

		$popup
			.insertBefore( $table )
			.popup();

		$menuButton
			.addClass( "ui-btn ui-btn-" + ( o.columnBtnTheme || "a" ) + " ui-corner-all ui-shadow ui-mini" )
			.insertBefore( $table );
	},

	_refreshColToggle: function () {
		// columns not being replaced must be cleared from input toggle-locks
		this._unlockCells( this.allHeaders );

		// update columntoggles and $cells
		this._addToggles( this._menu );

		// check/uncheck
		this._setToggleState();
	},

	_setToggleState: function() {
		this._menu.find( "input" ).each( function() {
			var $this = $( this );

			this.checked = $this.data( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			$this.checkboxradio( "refresh" );
		});
	},

	_destroy: function() {
		this._super();
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
