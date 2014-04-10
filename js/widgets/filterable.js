//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Renders the children of an element filterable via a callback and a textinput
//>>label: Filterable
//>>group: Widgets
//>>css.structure: ../css/structure/jquery.mobile.filterable.css

define( [
	"jquery",
	"../jquery.mobile.widget"
], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// TODO rename filterCallback/deprecate and default to the item itself as the first argument
var defaultFilterCallback = function( index, searchValue ) {
	return ( ( "" + ( $.mobile.getAttribute( this, "filtertext" ) || $( this ).text() ) )
		.toLowerCase().indexOf( searchValue ) === -1 );
};

$.widget( "mobile.filterable", {

	initSelector: ":jqmData(filter='true')",

	options: {
		filterReveal: false,
		filterCallback: defaultFilterCallback,
		enhanced: false,
		input: null,
		children: "> li, > option, > optgroup option, > tbody tr, > .ui-controlgroup-controls > .ui-btn, > .ui-controlgroup-controls > .ui-checkbox, > .ui-controlgroup-controls > .ui-radio"
	},

	_create: function() {
		var opts = this.options;

		$.extend( this, {
			_search: null,
			_timer: 0
		});

		this._setInput( opts.input );
		if ( !opts.enhanced ) {
			this._filterItems( ( ( this._search && this._search.val() ) || "" ).toLowerCase() );
		}
	},

	_onKeyUp: function() {
		var val, lastval,
			search = this._search;

		if ( search ) {
			val = search.val().toLowerCase(),
			lastval = $.mobile.getAttribute( search[ 0 ], "lastval" ) + "";

			if ( lastval && lastval === val ) {
				// Execute the handler only once per value change
				return;
			}

			if ( this._timer ) {
				window.clearTimeout( this._timer );
				this._timer = 0;
			}

			this._timer = this._delay( function() {
				if ( this._trigger( "beforefilter", null, { input: search } ) === false ) {
					return false;
				}

				// Change val as lastval for next execution
				search[ 0 ].setAttribute( "data-" + $.mobile.ns + "lastval", val );

				this._filterItems( val );
				this._timer = 0;
			}, 250 );
		}
	},

	_getFilterableItems: function() {
		var elem = this.element,
			children = this.options.children,
			items = !children ? { length: 0 }:
				$.isFunction( children ) ? children():
				children.nodeName ? $( children ):
				children.jquery ? children:
				this.element.find( children );

		if ( items.length === 0 ) {
			items = elem.children();
		}

		return items;
	},

	_filterItems: function( val ) {
		var idx, callback, length, dst,
			show = [],
			hide = [],
			opts = this.options,
			filterItems = this._getFilterableItems();

		if ( val != null ) {
			callback = opts.filterCallback || defaultFilterCallback;
			length = filterItems.length;

			// Partition the items into those to be hidden and those to be shown
			for ( idx = 0 ; idx < length ; idx++ ) {
				dst = ( callback.call( filterItems[ idx ], idx, val ) ) ? hide : show;
				dst.push( filterItems[ idx ] );
			}
		}

		// If nothing is hidden, then the decision whether to hide or show the items
		// is based on the "filterReveal" option.
		if ( hide.length === 0 ) {
			filterItems[ ( opts.filterReveal && val.length === 0 ) ?
				"addClass" : "removeClass" ]( "ui-screen-hidden" );
		} else {
			$( hide ).addClass( "ui-screen-hidden" );
			$( show ).removeClass( "ui-screen-hidden" );
		}

		this._refreshChildWidget();

		this._trigger( "filter", null, {
			items: filterItems
		});
	},

	// The Default implementation of _refreshChildWidget attempts to call
	// refresh on collapsibleset, controlgroup, selectmenu, or listview
	_refreshChildWidget: function() {
		var widget, idx,
			recognizedWidgets = [ "collapsibleset", "selectmenu", "controlgroup", "listview" ];

		for ( idx = recognizedWidgets.length - 1 ; idx > -1 ; idx-- ) {
			widget = recognizedWidgets[ idx ];
			if ( $.mobile[ widget ] ) {
				widget = this.element.data( "mobile-" + widget );
				if ( widget && $.isFunction( widget.refresh ) ) {
					widget.refresh();
				}
			}
		}
	},

	// TODO: When the input is not internal, do not even store it in this._search
	_setInput: function ( selector ) {
		var search = this._search;

		// Stop a pending filter operation
		if ( this._timer ) {
			window.clearTimeout( this._timer );
			this._timer = 0;
		}

		if ( search ) {
			this._off( search, "keyup change input" );
			search = null;
		}

		if ( selector ) {
			search = selector.jquery ? selector:
				selector.nodeName ? $( selector ):
				this.document.find( selector );

			this._on( search, {
				keydown: "_onKeyDown",
				keypress: "_onKeyPress",
				keyup: "_onKeyUp",
				change: "_onKeyUp",
				input: "_onKeyUp"
			});
		}

		this._search = search;
	},

	// Prevent form submission
	_onKeyDown: function( event ) {
		if ( event.keyCode === $.ui.keyCode.ENTER ) {
			event.preventDefault();
			this._preventKeyPress = true;
		}
	},

	_onKeyPress: function( event ) {
		if ( this._preventKeyPress ) {
			event.preventDefault();
			this._preventKeyPress = false;
		}
	},

	_setOptions: function( options ) {
		var refilter = !( ( options.filterReveal === undefined ) &&
				( options.filterCallback === undefined ) &&
				( options.children === undefined ) );

		this._super( options );

		if ( options.input !== undefined ) {
			this._setInput( options.input );
			refilter = true;
		}

		if ( refilter ) {
			this.refresh();
		}
	},

	_destroy: function() {
		var opts = this.options,
			items = this._getFilterableItems();

		if ( opts.enhanced ) {
			items.toggleClass( "ui-screen-hidden", opts.filterReveal );
		} else {
			items.removeClass( "ui-screen-hidden" );
		}
	},

	refresh: function() {
		if ( this._timer ) {
			window.clearTimeout( this._timer );
			this._timer = 0;
		}
		this._filterItems( ( ( this._search && this._search.val() ) || "" ).toLowerCase() );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
