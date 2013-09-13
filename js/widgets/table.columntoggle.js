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
	var tableClasses = $.mobile.table.prototype.options.classes;
	tableClasses.popup = "ui-table-columntoggle-popup";
	tableClasses.columnBtn = "ui-table-columntoggle-btn";
	tableClasses.priorityPrefix = "ui-table-priority-";
	tableClasses.columnToggleTable = "ui-table-columntoggle";

$.widget( "mobile.table", $.mobile.table, {
	options: {
		mode: "columntoggle",
		columnBtnTheme: null,
		columnPopupTheme: null,
		columnBtnText: "Columns...",
		classes: tableClasses
	},

	_create: function() {
		this._super();

		if( this.options.mode !== "columntoggle" ) {
			return;
		}

		this._menu = null;

		if( this.options.enhanced ) {
			this._menu = this.document.find( this._id() + "-popup" ).children().first();
		} else {
			this._menu = this._enhanceColToggle();
			this.element.addClass( this.options.classes.columnToggleTable );
		}

		this._setupEvents();

		this._setToggleState();
	},

	_id: function() {
		return ( this.element.attr( "id" ) || ( this.widgetName + this.uuid ) );
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
			var header = $( this ),
				priority = $.mobile.getAttribute( this, "priority" ),
				cells = header.add( header.jqmData( "cells" ) );

			if( priority ) {
				cells.addClass( opts.classes.priorityPrefix + priority );

				if ( !keep ) {
					$("<label><input type='checkbox' checked />" +
						( header.children( "abbr" ).first().attr( "title" ) ||
							header.text() ) +
						"</label>" )
						.appendTo( menu )
						.children( 0 )
						.jqmData( "cells", cells )
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

	_menuInputChange: function( evt ) {
		var input = $( evt.target ),
			checked = input[ 0 ].checked;

		input.jqmData( "cells" )
			.toggleClass( "ui-table-cell-hidden", !checked )
			.toggleClass( "ui-table-cell-visible", checked );

		if ( input[ 0 ].getAttribute( "locked" ) ) {
			input.removeAttr( "locked" );

			this._unlockCells( input.jqmData( "cells" ) );
		} else {
			input.attr( "locked", true );
		}
	},

	_unlockCells: function( cells ) {
		// allow hide/show via CSS only = remove all toggle-locks
		cells.removeClass( "ui-table-cell-hidden ui-table-cell-visible");
	},

	_enhanceColToggle: function() {
		var id , menuButton, popup, menu,
			table = this.element,
			opts = this.options,
			ns = $.mobile.ns,
			fragment = $.mobile.document[ 0 ].createDocumentFragment();

		id = this._id() + "-popup";
		menuButton = $( "<a role='button' href='#" + id + "' " +
			"class='" + opts.classes.columnBtn + " ui-btn ui-btn-" + ( opts.columnBtnTheme || "a" ) + " ui-corner-all ui-shadow ui-mini' " +
			"data-" + ns + "rel='popup' " +
			"data-" + ns + "mini='true'>" + opts.columnBtnText + "</a>" );
		popup = $( "<div data-" + ns + "role='popup' data-" + ns + "role='fieldcontain' class='" + opts.classes.popup + "' id='" + id + "'></div>" );
		menu = $( "<fieldset data-" + ns + "role='controlgroup'></fieldset>" );

		// set extension here, send "false" to trigger build/rebuild
		this._addToggles( menu, false );

		menu.appendTo( popup );

		fragment.appendChild( popup[ 0 ] );
		fragment.appendChild( menuButton[ 0 ] );
		table.before( fragment );

		popup.popup().enhanceWithin();

		return menu;
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

			// update columntoggles and cells
			this._addToggles( this._menu, create );

			// check/uncheck
			this._setToggleState();
		}
	},

	_setToggleState: function() {
		this._menu.find( "input" ).each( function() {
			var checkbox = $( this );

			this.checked = checkbox.jqmData( "cells" ).eq( 0 ).css( "display" ) === "table-cell";
			checkbox.checkboxradio( "refresh" );
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
