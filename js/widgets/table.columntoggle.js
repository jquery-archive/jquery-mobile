//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the table widget to a column toggle menu and responsive column visibility
//>>label: Table: Column Toggle
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.table.columntoggle.css

define( [
	"jquery",
	"./table",
	"./popup",
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
		this._super();

		if ( this.options.mode !== "columntoggle" ) {
			return;
		}

		$.extend( this, {
			_menu: null
		});

		if ( this.options.enhanced ) {
			this._menu = $( this.document[ 0 ].getElementById( this._id() + "-popup" ) ).children().first();
			this._addToggles( this._menu, true );
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
		this._on( this.window, {
			throttledresize: "_setToggleState"
		});
		this._on( this._menu, {
			"change input": "_menuInputChange"
		});
	},

	_addToggles: function( menu, keep ) {
		var inputs,
			checkboxIndex = 0,
			opts = this.options,
			container = menu.controlgroup( "container" );

		// allow update of menu on refresh (fixes #5880)
		if ( keep ) {
			inputs = menu.find( "input" );
		} else {
			container.empty();
		}

		// create the hide/show toggles
		this.headers.not( "td" ).each( function() {
			var input, cells,
				header = $( this ),
				priority = $.mobile.getAttribute( this, "priority" );

			if ( priority ) {
				cells = header.add( header.jqmData( "cells" ) );
				cells.addClass( opts.classes.priorityPrefix + priority );

				// Make sure the (new?) checkbox is associated with its header via .jqmData() and
				// that, vice versa, the header is also associated with the checkbox
				input = ( keep ? inputs.eq( checkboxIndex++ ) :
					$("<label><input type='checkbox' checked />" +
						( header.children( "abbr" ).first().attr( "title" ) ||
							header.text() ) +
						"</label>" )
						.appendTo( container )
						.children( 0 )
						.checkboxradio( {
							theme: opts.columnPopupTheme
						}) )

						// Associate the header with the checkbox
						.jqmData( "header", header )
						.jqmData( "cells", cells );

				// Associate the checkbox with the header
				header.jqmData( "input", input );
			}
		});

		// set bindings here
		if ( !keep ) {
			menu.controlgroup( "refresh" );
		}
	},

	_menuInputChange: function( evt ) {
		var input = $( evt.target ),
			checked = input[ 0 ].checked;

		input.jqmData( "cells" )
			.toggleClass( "ui-table-cell-hidden", !checked )
			.toggleClass( "ui-table-cell-visible", checked );
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
			fragment = this.document[ 0 ].createDocumentFragment();

		id = this._id() + "-popup";
		menuButton = $( "<a href='#" + id + "' " +
			"class='" + opts.classes.columnBtn + " ui-btn " +
			"ui-btn-" + ( opts.columnBtnTheme || "a" ) +
			" ui-corner-all ui-shadow ui-mini' " +
			"data-" + ns + "rel='popup'>" + opts.columnBtnText + "</a>" );
		popup = $( "<div class='" + opts.classes.popup + "' id='" + id + "'></div>" );
		menu = $( "<fieldset></fieldset>" ).controlgroup();

		// set extension here, send "false" to trigger build/rebuild
		this._addToggles( menu, false );

		menu.appendTo( popup );

		fragment.appendChild( popup[ 0 ] );
		fragment.appendChild( menuButton[ 0 ] );
		table.before( fragment );

		popup.popup();

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
		var headers, hiddenColumns, index;

		// Calling _super() here updates this.headers
		this._super( create );

		if ( !create && this.options.mode === "columntoggle" ) {
			headers = this.headers;
			hiddenColumns = [];

			// Find the index of the column header associated with each old checkbox among the
			// post-refresh headers and, if the header is still there, make sure the corresponding
			// column will be hidden if the pre-refresh checkbox indicates that the column is
			// hidden by recording its index in the array of hidden columns.
			this._menu.find( "input" ).each( function() {
				var input = $( this ),
					header = input.jqmData( "header" ),
					index = headers.index( header[ 0 ] );

				if ( index > -1 && !input.prop( "checked" ) ) {

					// The column header associated with /this/ checkbox is still present in the
					// post-refresh table and the checkbox is not checked, so the column associated
					// with this column header is currently hidden. Let's record that.
					hiddenColumns.push( index );
				}
			});

			// columns not being replaced must be cleared from input toggle-locks
			this._unlockCells( this.element.find( ".ui-table-cell-hidden, " +
				".ui-table-cell-visible" ) );

			// update columntoggles and cells
			this._addToggles( this._menu, create );

			// At this point all columns are visible, so uncheck the checkboxes that correspond to
			// those columns we've found to be hidden
			for ( index = hiddenColumns.length - 1 ; index > -1 ; index-- ) {
				headers.eq( hiddenColumns[ index ] ).jqmData( "input" )
					.prop( "checked", false )
					.checkboxradio( "refresh" )
					.trigger( "change" );
			}
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
