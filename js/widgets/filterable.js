//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Renders the children of an element filterable via a callback and a textinput
//>>label: Filterable
//>>group: Widgets

define( [ "jquery" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	// TODO rename filterCallback/deprecate and default to the item itself as the first argument
	var defaultFilterCallback = function( index, searchValue ) {
		return ( ( "" + ( $.mobile.getAttribute( this, "filtertext", true ) || $( this ).text() ) )
			.toLowerCase().indexOf( searchValue ) === -1 );
	};

	$.widget( "mobile.filterable", {

			options: {

				// DEPRECATED and must be removed in 1.5.0, because the idea is that
				// filterable DOES NOT create any textinput. Instead, the MUST provide
				// a textinput as part of the original markup. The "inputSelector"
				// option below can then be set to a jQuery selector that will retrieve
				// the input to be used as the source of filter text.
				filterPlaceholder: "Filter items...",
				filterReveal: false,
				filterCallback: defaultFilterCallback,
				enhanced: false,
				input: null,
				children: "> li, > option, tbody tr, .ui-controlgroup-controls .ui-btn"
			},

			_onKeyUp: function() {
				var search = this._search[ 0 ],
					val = search.value.toLowerCase(),
					lastval = $.mobile.getAttribute( search, "lastval", true ) + "";

				if ( lastval && lastval === val ) {
					// Execute the handler only once per value change
					return;
				}

				if ( this._timer ) {
					window.clearTimeout( this._timer );
				}

				this._timer = this._delay( function() {
					this._trigger( "beforefilter", "beforefilter", { input: search } );

					// Change val as lastval for next execution
					search.setAttribute( "data-" + $.mobile.ns + "lastval", val );

					this._filterItems( val );
					this._timer = 0;
				}, 250 );
			},

			_getFilterableItems: function() {
				var elem = this.element,
					children = this.options.children,
					items = !children ? { length: 0 }:
						children.nodeName ? $( children ):
						children.jquery ? children:
						this.element.find( children );

				if ( items.length === 0 ) {
					items = elem.children();
				}

				return items;
			},

			_filterItems: function( val ) {
				var idx, show, hide, callback, length,
					opts = this.options,
					filterItems = this._getFilterableItems();

				if ( val ) {

					show = [];
					hide = [];
					callback = opts.filterCallback || defaultFilterCallback;
					length = filterItems.length;

					// Partition the items into those to be hidden and those to be shown
					for ( idx = 0 ; idx < length ; idx++ ) {
						if ( callback.call( filterItems[ idx ], idx, val ) ) {
							hide.push( filterItems[ idx ] );
						} else {
							show.push( filterItems[ idx ] );
						}
					}

					$( hide ).addClass( "ui-screen-hidden" );
					$( show ).removeClass( "ui-screen-hidden" );
				} else {
					filterItems[ opts.filterReveal ? "addClass" : "removeClass" ]( "ui-screen-hidden" );
				}
			},
			
			_isSearchInternal: function() {
				return ( this._search && this._search.jqmData( "ui-filterable-" + this.uuid + "-internal" ) );
			},

			// TODO: When the input is not internal, do not even store it in this._search
			_setInput: function ( selector ) {
				var search, bindEvents, id, uniqid,
					isCurrentInternal = this._isSearchInternal();

				// Stop a pending filter operation
				if ( this._timer ) {
					clearTimeout( this._timer );
					this._timer = 0;
				}

				if ( selector ) {
					search = selector.jquery ? selector:
						selector.nodeName ? $( selector ):
						this.document.find( selector );
					bindEvents = true;
					if ( isCurrentInternal ) {
						this._search.remove();
					}
				} else {
					if ( isCurrentInternal ) {
						search = this._search;
						selector = "#" + uniqid;
					} else {
						id = this.element.attr( "id" );
						uniqid = id ? ( id + "-filterable" ) : ( "ui-filterable-" + this.uuid );
						search = $( "<input " +
							"data-" + $.mobile.ns + "type='search' " +
							"class='ui-filterable' " +
							"id='" + uniqid + "'" +
							"></input>" )
							.jqmData( "ui-filterable-" + this.uuid + "-internal", true )
							.insertBefore( this.element );
						selector = "#" + uniqid;
						if ( $.mobile.textinput ) {
							search.textinput({ wrapperClass: "ui-filterable" });
						}
						bindEvents = true;
					}
				}

				if ( bindEvents ) {
					this._on( search, {
						keyup: "_onKeyUp",
						change: "_onKeyUp",
						input: "_onKeyUp"
					});
				}

				this._search = search;

				return selector;
			},

			_create: function() {
				var opts = this.options;

				$.extend( this, {
					_search: null,
					_timer: 0
				});
				
				if ( opts.enhanced ) {
					this._applyOptions( opts, true );
				} else {
					this._setOptions( opts );
				}
			},

			_applyOptions: function( options, internal ) {
				var newInputSel = ( options.input ? ( options.input + "" ) : "" ),
					refilter = !( options.filterReveal === undefined &&
					options.filterCallback === undefined &&
					newInputSel && options.children === undefined );

				// If we end up instantiating a textinput internally, then we set the
				// value of the input option to the ID we have generated for the
				// textinput widget we have instantiated.
				options.input = this._setInput( newInputSel );

				if ( !internal ) {
					if ( options.filterPlaceholder !== undefined ) {
						this._search.attr( "placeholder", options.filterPlaceholder );
					}

					if ( refilter ) {
						this._getFilterableItems().removeClass( "ui-screen-hidden" );
						this._filterItems( ( this._search.val() || "" ).toLowerCase() );
					}
				}

				return this;
			},

			_setOptions: function( options ) {
				return this
					._applyOptions( options )
					._super( options );
			},

			_destroy: function() {
				if ( this._isSearchInternal() ) {
					this._search.remove();
				}
			}

	});

	$.mobile.filterable.initSelector = ":jqmData(filter='true')";

	//auto self-init widgets
	$.mobile._enhancer.add( "mobile.filterable" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
