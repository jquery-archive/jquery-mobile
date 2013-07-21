//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Renders the children of an element filterable via a callback and a textinput
//>>label: Filterable
//>>group: Widgets

define( [
	"jquery",
	"./addFirstLastClasses" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	// TODO rename filterCallback/deprecate and default to the item itself as the first argument
	var defaultfilterCallback = function( text, searchValue /*, item */) {
		return text.toString().toLowerCase().indexOf( searchValue ) === -1;
	};

	$.widget( "mobile.filterable", $.extend( {

			options: {

				// DEPRECATED and must be removed in 1.5.0, because the idea is that
				// filterable DOES NOT create any textinput. Instead, the MUST provide
				// a textinput as part of the original markup. The "inputSelector"
				// option below can then be set to a jQuery selector that will retrieve
				// the input to be used as the source of filter text.
				filterPlaceholder: "Filter items...",
				filterReveal: false,
				filterCallback: defaultfilterCallback,
				enhanced: false,
				inputSelector: null
			},

			_onKeyUp: function() {
				var search = this._search[ 0 ],
					getAttrFixed = $.mobile.getAttribute,
					val = search.value.toLowerCase(),
					lastval = getAttrFixed( search, "lastval", true ) + "";

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

					this._filterItems( val, lastval );
				}, 250 );
			},

			_getFilterableItems: function() {
				var elem = this.element,
					items = elem.find( "> li, > option, tbody tr, .ui-controlgroup-controls .ui-btn" );

				if ( items.length === 0 ) {
					items = elem.children();
				}

				return items;
			},
			
			_setFilterableItems: function( val, lastval ) {
				var opts = this.options,
					filterItems = [],
					isCustomfilterCallback = opts.filterCallback !== defaultfilterCallback,
					_getFilterableItems = this._getFilterableItems();
				
				if ( isCustomfilterCallback || val.length < lastval.length || val.indexOf( lastval ) !== 0 ) {

					// Custom filter callback applies or removed chars or pasted something totally different, check all items
					filterItems = _getFilterableItems;
				} else {

					// Only chars added, not removed, only use visible subset
					filterItems = _getFilterableItems.filter( ":not(.ui-screen-hidden)" );

					if ( !filterItems.length && opts.filterReveal ) {
						filterItems = _getFilterableItems.filter( ".ui-screen-hidden" );
					}
				}
				return filterItems;
			},
			
			_filterItems: function( val, lastval ){
				var opts = this.options,
					getAttrFixed = $.mobile.getAttribute,
					filterItems = this._setFilterableItems( val, lastval ),
					_getFilterableItems = this._getFilterableItems(),
					childItems = false,
					itemtext = "",
					item,
					select = this.element.parents( ".ui-select" ),
					i;

				if ( val ) {

					for ( i = filterItems.length - 1; i >= 0; i-- ) {
						item = $( filterItems[ i ] );
						// NOTE: should itemtext be stored somewhere? Will text() change much
						// and does this need to be re-parsed on every iteration? Also, no 
						// chance to run data-filtertext on anything that JQM wraps, because 
						// we filter the wrapper and can't access the input/a. Can we?
						itemtext = getAttrFixed(filterItems[ i ], "filtertext", true) || item.text();

						if ( item.is( ".ui-li-divider" ) ) {

							item.toggleClass( "ui-filterable-hidequeue" , !childItems );

							// New bucket!
							childItems = false;

						} else if ( opts.filterCallback( itemtext, val, item ) ) {

							//mark to be hidden
							item.toggleClass( "ui-filterable-hidequeue" , true );
						} else {

							// There's a shown item in the bucket
							childItems = true;
						}
					}
					
					this._toggleFilterableItems( filterItems, select, opts.filterReveal, true);
				} else {
					this._toggleFilterableItems( filterItems, select, opts.filterReveal );
				}
				this._addFirstLastClasses( _getFilterableItems, this._getVisibles( _getFilterableItems, false ), false );
			},
			
			_toggleFilterableItems: function( filterItems, select, reveal, isVal )	{

				if ( isVal ) {
					// Show items not marked to be hidden
					filterItems
						.filter( ":not(.ui-filterable-hidequeue)" )
						.toggleClass( "ui-screen-hidden", false );

					// Hide items marked to be hidden
					filterItems
						.filter( ".ui-filterable-hidequeue" )
						.toggleClass( "ui-screen-hidden", true )
						.toggleClass( "ui-filterable-hidequeue", false );

					// select - hide parent when no options match?
					if ( select ) {
						if ( filterItems.length === filterItems.filter( ".ui-screen-hidden").length ) {
							select.addClass( "ui-screen-hidden" );
						}
					}
				} else {
					//filtervalue is empty => show all
					filterItems.toggleClass( "ui-screen-hidden", !!reveal );
					// select
					if ( select ) {
						select.removeClass( "ui-screen-hidden", !!reveal );
					}
				}
			},

			_isSearchInternal: function() {
				return ( this._search && this._search.jqmData( "ui-filterable-" + this.uuid + "-internal" ) );
			},

			_setInput: function ( selector ) {
				var search, bindEvents,
					uniqid = "ui-filterable-" + this.uuid,
					isCurrentInternal = this._isSearchInternal();

				if ( selector ) {
					search = $( "" + selector );
					bindEvents = true;
					if ( isCurrentInternal ) {
						this._search.remove();
						if ( this._timer ) {
							clearTimeout( this._timer );
						}
					}
				} else {
					if ( isCurrentInternal ) {
						search = this._search;
						selector = "#" + uniqid;
					} else {
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
				var newInputSel = ( options.inputSelector ? ( options.inputSelector + "" ) : "" ),
					refilter = !( options.filterReveal === undefined &&
					options.filterCallback === undefined &&
					newInputSel );

				// If we end up instantiating a textinput internally, then we set the
				// value of the inputSelector option to the ID we have generated for
				// the textinput widget we have instantiated.
				options.inputSelector = this._setInput( newInputSel );

				if ( !internal ) {
					if ( options.filterPlaceholder !== undefined ) {
						this._search.attr( "placeholder", options.filterPlaceholder );
					}

					if ( refilter ) {
						this._getFilterableItems().removeClass( "ui-screen-hidden" );
						this._filterItems( ( this._search.val() || "" ).toLowerCase(), "" );
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

	}, $.mobile.behaviors.addFirstLastClasses ) );

	$.mobile.filterable.initSelector = ":jqmData(filter='true')";

	//auto self-init widgets
	$.mobile._enhancer.add( "mobile.filterable" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
