//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Renders the children of an element filterable via a callback and a textinput
//>>label: Filterable
//>>group: Widgets

define( [
	"jquery",
	"./forms/textinput",
	"./addFirstLastClasses" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	// TODO rename filterCallback/deprecate and default to the item itself as the first argument
	var defaultfilterCallback = function( text, searchValue /*, item */) {
		return text.toString().toLowerCase().indexOf( searchValue ) === -1;
	};

	$.widget( "mobile.filterable", $.extend( {

			options: {
				theme: "a",
				filterPlaceholder: "Filter items...",
				filterReveal: false,
				filterCallback: defaultfilterCallback,
				wrapperClass: "",
				inset: false,
				enhanced: false,
				target: null,
				mini: false,
				selector: null
			},

			_onKeyUp: function() {
				var search = this._search[ 0 ],
					opts = this.options,
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

					this._filterItems( search, val, lastval );
				}, 250 );
			},

			_getFilterableItems: function() {
				var el = this.element,
					opts = this.options,
					items = [];

				if ( typeof opts.selector === "string" ) {
					items = $( "." + opts.selector ).children();
				} else {
					items = el.find( "> li, > option, tbody tr, .ui-controlgroup-controls .ui-btn" );
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
			
			_filterItems: function( search, val, lastval ){
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

							item.toggleClass( "ui-filter-hidequeue" , !childItems );

							// New bucket!
							childItems = false;

						} else if ( opts.filterCallback( itemtext, val, item ) ) {

							//mark to be hidden
							item.toggleClass( "ui-filter-hidequeue" , true );
						} else {

							// There's a shown item in the bucket
							childItems = true;
						}
					}
					
					this._toggleFilterableItems( filterItems, select, opts.filterReveal, true);
				} else {
					this._toggleFilterableItems( filterItems, select, opts.filterReveal );
				}
				if ( typeof opts.selector !== "string" ) {
					this._addFirstLastClasses( _getFilterableItems, this._getVisibles( _getFilterableItems, false ), false );
				}
			},
			
			_toggleFilterableItems: function( filterItems, select, reveal, isVal )	{

				if ( isVal ) {
					// Show items not marked to be hidden
					filterItems
						.filter( ":not(.ui-filter-hidequeue)" )
						.toggleClass( "ui-screen-hidden", false );

					// Hide items marked to be hidden
					filterItems
						.filter( ".ui-filter-hidequeue" )
						.toggleClass( "ui-screen-hidden", true )
						.toggleClass( "ui-filter-hidequeue", false );

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
			
			_enhance: function ( items ) {
				var el = this.element,
					opts = this.options,
					wrapper = $( "<div>", {
						"class":  "ui-filter " + opts.wrapperClass,
						"role": "search",
						"id" : "ui-filter-" + this.uuid
					}),
					search = $( "<input>", {
						placeholder: opts.filterPlaceholder
					})
					.attr( "data-" + $.mobile.ns + "type", "search" )
					.appendTo( wrapper )
					.textinput({
						theme: opts.filterTheme,
						mini: opts.mini
					});

				if ( opts.inset ) {
					wrapper.addClass( "ui-filter-inset" );
				}

				if ( opts.filterReveal ) {
					items.addClass( "ui-screen-hidden" );
				}

				if ( typeof opts.target === "string" ) {
					wrapper.prependTo( $( "." + opts.target + "" ) );
				} else {
					wrapper.insertBefore( el );
				}
				
				return search;
			},

			_create: function() {
				var search,
					opts = this.options,
					items = this._getFilterableItems();

				if ( !opts.enhanced ) {
					search = this._enhance( items );
				} else {
					search = $( "." + opts.wrapperClass ).find( "input" );
				}

				this._on( search, {
					keyup: "_onKeyUp",
					change: "_onKeyUp",
					input: "_onKeyUp"
				});
				
				$.extend( this, {
					_search: search,
					_timer: 0
				});
				
				// NOTE: since the filter was based on the listview, some unit tests seem
				// to listen for the initial addFirstLastClasses call when the listview 
				// is setup (at least I cannot recreate a refreshCornerCount in Qunit
				// without setting first and last classes on the filterable elements on
				// create). If refresh corners is to be run on the filter, I would prefer
				// it being solely called by the filter being triggered and not be the 
				// "_super()-widget" calling it. So 2x input on the filter should trigger
				// 2x addFirstLastClasses vs. currently 3x because of including the call
				// when setting up the parent listview.

				// no classes if multiple datasets are used
				if ( typeof opts.selector !== "string" ) {
					this._addFirstLastClasses( items, this._getVisibles( items, true ), true );
				}
			},
			
			_setOption: function( key, value ) {
				var opts = this.options,
					wrapper = document.getElementById( "ui-filter-" + this.uuid ),
					$input = $( wrapper ).find( "input" );

				// always update
				opts[ key ] = value;

				if ( key === "disabled" ) {
					$input
						.toggleClass( this.widgetFullName + "-disabled ui-state-disabled", !!value )
						.attr( "aria-disabled", value )
						.textinput( value ? "disable" : "enable" );
				}
				return this;
			},
			
			widget: function() {
				return this.element;
			},
			
			_destroy: function() {
				var opts = this.options,
					wrapper = document.getElementById( "ui-filter-" + this.uuid );

				if ( !opts.enhanced ) {
					wrapper.parentNode.removeChild( wrapper );
				}
				this._toggleFilterableItems( this._getFilterableItems(), false, false );
			}

	}, $.mobile.behaviors.addFirstLastClasses ) );

	$.mobile.filterable.initSelector = ":jqmData(filter='true')";

	//auto self-init widgets
	$.mobile._enhancer.add( "mobile.filterable" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
