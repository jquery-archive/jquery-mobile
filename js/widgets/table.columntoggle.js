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

	_id: function() {
		return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
	},

	_create: function() {
		var opts = this.options;

		this._super();

		if( opts.mode !== "columntoggle" ) {
			return;
		}

		$.extend( this, {
			_menu: null
		});

		if( opts.enhanced ) {
			this._menu = this.document.find( this._id() + "-popup" ).children().first();
		} else {
			this._menu = this._enhanceColToggle();
			this.element.addClass( opts.classes.columnToggleTable );
		}

		this._setupEvents();

		this._setToggleState();
	},

	_setupEvents: function() {
		//NOTE: inputs are bound in bindToggles,
		// so it can be called on refresh, too

		// update column toggles on resize
		this._on( $.mobile.window, {
			throttledresize: "_setToggleState"
		});
	},

	_bindToggles: function( menu ) {
		var inputs = menu.find( "input" );

		this._on( inputs, {
			change: "_menuInputChange"
		});
	},

	_addToggles: function( menu, keep ) {
		var opts = this.options;

		// allow update of menu on refresh (fixes #5880)
		if ( !keep ) {
			menu.empty();
		}

		// create the hide/show toggles
		this.headers.not( "td" ).each( function() {
			var $this = $( this ),
				priority = $.mobile.getAttribute( this, "priority", true ),
				$cells = $this.add( $this.data( "cells" ) );

			if( priority ) {
				$cells.addClass( opts.classes.priorityPrefix + priority );

				if ( !keep ) {
					$("<label><input type='checkbox' checked />" + $this.text() + "</label>" )
						.appendTo( menu )
						.children( 0 )
						.data( "cells", $cells )
						.checkboxradio( {
							theme: opts.columnPopupTheme
						});
				}
			}
		});

		// set bindings here
		if ( !keep ) {
			this._bindToggles( menu );
		}
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
			opts = this.options,
			ns = $.mobile.ns,
			fragment = $.mobile.document[ 0 ].createDocumentFragment();

		id = this._id() + "-popup";
		$menuButton = $( "<a href='#" + id + "' " +
			"class='" + opts.classes.columnBtn + " ui-btn ui-btn-" + ( opts.columnBtnTheme || "a" ) + " ui-corner-all ui-shadow ui-mini' " +
			"data-" + ns + "rel='popup' " +
			"data-" + ns + "mini='true'>" + opts.columnBtnText + "</a>" );
		$popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + opts.classes.popup + "' id='" + id + "'></div>" );
		$menu = $( "<fieldset data-" + ns + "role='controlgroup'></fieldset>" );

		// set extension here, send "false" to trigger build/rebuild
		this._addToggles( $menu, false );

		$menu.appendTo( $popup );

		fragment.appendChild( $popup[ 0 ] );
		fragment.appendChild( $menuButton[ 0 ] );
		$table.before( fragment );

		$popup.popup();

		return $menu;
	},

	rebuild: function() {
		this._super();

		if ( this.options.mode === "columntoggle" ) {
			// NOTE: rebuild passes "false", while refresh passes "undefined"
			// both refresh the table, but inside addToggles, !false will be true,
			// so a rebuild call can be indentified
			this._refresh( false );
		}
	},

	_refresh: function( create ) {
		this._super( create );

		if ( !create && this.options.mode === "columntoggle" ) {
			// columns not being replaced must be cleared from input toggle-locks
			this._unlockCells( this.allHeaders );

			// update columntoggles and $cells
			this._addToggles( this._menu, create );

			// check/uncheck
			this._setToggleState();
		}
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
