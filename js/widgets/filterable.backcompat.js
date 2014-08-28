//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Links options present in the widget to be filtered to the input
//>>label: Filterable-widgetlink
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.filterable.css

define( [
	"jquery",
	"./listview.hidedividers",
	"./filterable" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// Create a function that will replace the _setOptions function of a widget,
// and will pass the options on to the input of the filterable.
var replaceSetOptions = function( self, orig ) {
		return function( options ) {
			orig.call( this, options );
			self._syncTextInputOptions( options );
		};
	},
	rDividerListItem = /(^|\s)ui-li-divider(\s|$)/,
	origDefaultFilterCallback = $.mobile.filterable.prototype.options.filterCallback;

// Override the default filter callback with one that does not hide list dividers
$.mobile.filterable.prototype.options.filterCallback = function( index, searchValue ) {
	return !this.className.match( rDividerListItem ) &&
		origDefaultFilterCallback.call( this, index, searchValue );
};

$.widget( "mobile.filterable", $.mobile.filterable, {
	options: {
		filterPlaceholder: "Filter items...",
		filterTheme: null
	},

	_create: function() {
		var idx, widgetName,
			elem = this.element,
			recognizedWidgets = [ "collapsibleset", "selectmenu", "controlgroup", "listview" ],
			createHandlers = {};

		this._super();

		$.extend( this, {
			_widget: null
		});

		for ( idx = recognizedWidgets.length - 1 ; idx > -1 ; idx-- ) {
			widgetName = recognizedWidgets[ idx ];
			if ( $.mobile[ widgetName ] ) {
				if ( this._setWidget( elem.data( "mobile-" + widgetName ) ) ) {
					break;
				} else {
					createHandlers[ widgetName + "create" ] = "_handleCreate";
				}
			}
		}

		if ( !this._widget ) {
			this._on( elem, createHandlers );
		}
	},

	_handleCreate: function( evt ) {
		this._setWidget( this.element.data( "mobile-" + evt.type.substring( 0, evt.type.length - 6 ) ) );
	},

	_trigger: function( type, event, data ) {
		if ( this._widget && this._widget.widgetFullName === "mobile-listview" &&
			type === "beforefilter" ) {

			// Also trigger listviewbeforefilter if this widget is also a listview
			this._widget._trigger( "beforefilter", event, data );
		}

		// Passing back the response enables calling preventDefault()
		return this._super( type, event, data );
	},

	_setWidget: function( widget ) {
		if ( !this._widget && widget ) {
			this._widget = widget;
			this._widget._setOptions = replaceSetOptions( this, this._widget._setOptions );
		}

		if ( !!this._widget ) {
			this._syncTextInputOptions( this._widget.options );
			if ( this._widget.widgetName === "listview" ) {
				this._widget.options.hideDividers = true;
				this._widget.element.listview( "refresh" );
			}
		}

		return !!this._widget;
	},

	_isSearchInternal: function() {
		return ( this._search && this._search.jqmData( "ui-filterable-" + this.uuid + "-internal" ) );
	},

	_setInput: function( selector ) {
		var opts = this.options,
			updatePlaceholder = true,
			textinputOpts = {};

		if ( !selector ) {
			if ( this._isSearchInternal() ) {

				// Ignore the call to set a new input if the selector goes to falsy and
				// the current textinput is already of the internally generated variety.
				return;
			} else {

				// Generating a new textinput widget. No need to set the placeholder
				// further down the function.
				updatePlaceholder = false;
				selector = $( "<input " +
					"data-" + $.mobile.ns + "type='search' " +
					"placeholder='" + opts.filterPlaceholder + "'></input>" )
					.jqmData( "ui-filterable-" + this.uuid + "-internal", true );
				$( "<form class='ui-filterable'></form>" )
					.append( selector )
					.submit( function( evt ) {
						evt.preventDefault();
						selector.blur();
					})
					.insertBefore( this.element );
				if ( $.mobile.textinput ) {
					if ( this.options.filterTheme != null ) {
						textinputOpts[ "theme" ] = opts.filterTheme;
					}

					selector.textinput( textinputOpts );
				}
			}
		}

		this._super( selector );

		if ( this._isSearchInternal() && updatePlaceholder ) {
			this._search.attr( "placeholder", this.options.filterPlaceholder );
		}
	},

	_setOptions: function( options ) {
		var ret = this._super( options );

		// Need to set the filterPlaceholder after having established the search input
		if ( options.filterPlaceholder !== undefined ) {
			if ( this._isSearchInternal() ) {
				this._search.attr( "placeholder", options.filterPlaceholder );
			}
		}

		if ( options.filterTheme !== undefined && this._search && $.mobile.textinput ) {
			this._search.textinput( "option", "theme", options.filterTheme );
		}

		return ret;
	},

	// The listview implementation accompanying this filterable backcompat layer will call
	// filterable.refresh() after it's done refreshing the listview to make sure the filterable
	// filters out any new items added. However, when the listview refresh has been initiated by
	// the filterable itself, then such filtering has already taken place, and calling the
	// filterable's refresh() method will cause an infinite recursion. We stop this by setting a
	// flag that will cause the filterable's refresh() method to short-circuit.
	_refreshChildWidget: function() {
		this._refreshingChildWidget = true;
		this._superApply( arguments );
		this._refreshingChildWidget = false;
	},

	refresh: function() {
		if ( !this._refreshingChildWidget ) {
			this._superApply( arguments );
		}
	},

	_destroy: function() {
		if ( this._isSearchInternal() ) {
			this._search.remove();
		}
		this._super();
	},

	_syncTextInputOptions: function( options ) {
		var idx,
			textinputOptions = {};

		// We only sync options if the filterable's textinput is of the internally
		// generated variety, rather than one specified by the user.
		if ( this._isSearchInternal() && $.mobile.textinput ) {

			// Apply only the options understood by textinput
			for ( idx in $.mobile.textinput.prototype.options ) {
				if ( options[ idx ] !== undefined ) {
					if ( idx === "theme" && this.options.filterTheme != null ) {
						textinputOptions[ idx ] = this.options.filterTheme;
					} else {
						textinputOptions[ idx ] = options[ idx ];
					}
				}
			}
			this._search.textinput( "option", textinputOptions );
		}
	}
});

// Instantiate a filterable on a listview that has the data-filter="true" attribute
// This is not necessary for static content, because the auto-enhance takes care of instantiating
// the filterable upon encountering data-filter="true". However, because of 1.3.x it is expected
// that a listview with data-filter="true" will be filterable even if you just instantiate a
// listview on it. The extension below ensures that this continues to happen in 1.4.x.
$.widget( "mobile.listview", $.mobile.listview, {
	options: {
		filter: false
	},
	_create: function() {
		if ( this.options.filter === true &&
				!this.element.data( "mobile-filterable" ) ) {
			this.element.filterable();
		}
		return this._super();
	},

	refresh: function() {
		var filterable;

		this._superApply( arguments );

		if ( this.options.filter === true ) {
			filterable = this.element.data( "mobile-filterable" );

			if ( filterable ) {
				filterable.refresh();
			}
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
