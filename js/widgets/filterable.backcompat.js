//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Links options present in the widget to be filtered to the input
//>>label: Filterable-widgetlink
//>>group: Widgets

define( [
	"jquery",
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

	_setWidget: function( widget ) {
		if ( !this._widget && widget ) {
			this._widget = widget;
			this._widget._setOptions = replaceSetOptions( this, this._widget._setOptions );
		}

		if ( !!this._widget ) {
			this._syncTextInputOptions( this._widget.options );
		}

		return !!this._widget;
	},

	_isSearchInternal: function() {
		return ( this._search && this._search.jqmData( "ui-filterable-" + this.uuid + "-internal" ) );
	},

	_setInput: function( selector ) {
		if ( !selector ) {
			if ( this._isSearchInternal() ) {

				// Ignore the call to set a new input if the selector goes to falsy and
				// the current textinput is already of the internally generated variety.
				return;
			} else {
				selector = $( "<input " +
					"data-" + $.mobile.ns + "type='search' " +
					"placeholder='" + this.options.filterPlaceholder + "'></input>" )
					.jqmData( "ui-filterable-" + this.uuid + "-internal", true );
				$( "<form class='ui-filterable'></form>" )
					.append( selector )
					.insertBefore( this.element );
				if ( $.mobile.textinput ) {
					selector.textinput();
				}
			}
		}

		this._super( selector );
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
					textinputOptions[ idx ] = options[ idx ];
				}
			}
			this._search.textinput( "option", textinputOptions );
		}
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
