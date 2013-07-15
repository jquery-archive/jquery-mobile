//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Adds a filterbar to an element collection
//>>label: Filter
//>>group: Widgets


define( [ "jquery", "./forms/textinput" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

	// TODO rename filterCallback/deprecate and default to the item itself as the first argument
	var defaultfilterCallback = function( text, searchValue /*, item */) {
		return text.toString().toLowerCase().indexOf( searchValue ) === -1;
	};

	$.widget( "mobile.filterbar", $.extend( {

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
					o = this.options,
					getAttrFixed = $.mobile.getAttribute,
					val = search.value.toLowerCase(),
					lastval = getAttrFixed( search, "lastval", true ) + "";

				if ( lastval && lastval === val ) {
					// Execute the handler only once per value change
					return;
				}

				if (o.timer !== undefined) {
					window.clearTimeout(o.timer);
				}

				o.timer = this._delay(function() {
					this._trigger( "beforefilter", "beforefilter", { input: search } );

					// Change val as lastval for next execution
					search.setAttribute( "data-" + $.mobile.ns + "lastval" , val );

					this._filterItems( search, val, lastval );
				}, 250 );
			},

			_getFilterableItems: function() {
				var el = this.element,
					o = this.options,
					items = [];

				if (typeof o.selector === "string") {
					items = $("." + o.selector).children();
				} else {
					items = el.find("> li, > option, tbody tr, .ui-controlgroup-controls .ui-btn");
				}
				return items;
			},
			
			_setFilterableItems: function(val, lastval) {
				var o = this.options,
					filterItems = [],
					isCustomfilterCallback = o.filterCallback !== defaultfilterCallback,
					_getFilterableItems = this._getFilterableItems();
				
				if ( isCustomfilterCallback || val.length < lastval.length || val.indexOf( lastval ) !== 0 ) {

					// Custom filter callback applies or removed chars or pasted something totally different, check all items
					filterItems = _getFilterableItems;
				} else {

					// Only chars added, not removed, only use visible subset
					filterItems = _getFilterableItems.filter( ":not(.ui-screen-hidden)" );

					if ( !filterItems.length && o.filterReveal ) {
						filterItems = _getFilterableItems.filter( ".ui-screen-hidden" );
					}
				}
				return filterItems;
			},
			
			_filterItems: function( search, val, lastval ){
				var o = this.options,
					getAttrFixed = $.mobile.getAttribute,
					filterItems = this._setFilterableItems(val, lastval),
					_getFilterableItems = this._getFilterableItems(),
					childItems = false,
					itemtext = "",
					item,
					select = this.element.parents( ".ui-select" ),
					i;

				this._setOption( "timer", undefined );

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

						} else if ( o.filterCallback( itemtext, val, item ) ) {

							//mark to be hidden
							item.toggleClass( "ui-filter-hidequeue" , true );
						} else {

							// There's a shown item in the bucket
							childItems = true;
						}
					}
					
					this._toggleFilterableItems( filterItems, select, o.filterReveal , true);
				} else {
					this._toggleFilterableItems( filterItems, select, o.filterReveal );
				}

				this._addFirstLastClasses( _getFilterableItems, this._getVisibles( _getFilterableItems, false ), false );
			},
			
			_toggleFilterableItems: function( filterItems, select, reveal, isVal )	{

				if (isVal) {
					// Show items, not marked to be hidden
					filterItems
						.filter( ":not(.ui-filter-hidequeue)" )
						.toggleClass( "ui-screen-hidden", false );

					// Hide items, marked to be hidden
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
					o = this.options,
					wrapper = $( "<div>", {
						"class":  "ui-filter " + o.wrapperClass,
						"role": "search",
						"id" : "ui-filter-" + this.uuid
					}),
					search = $( "<input>", {
						placeholder: o.filterPlaceholder
					})
					.attr( "data-" + $.mobile.ns + "type", "search" )
					.appendTo( wrapper )
					.textinput({
						theme: o.filterTheme,
						mini: o.mini
					});

				if ( o.inset ) {
					wrapper.addClass( "ui-filter-inset" );
				}

				if ( o.filterReveal ) {
					items.addClass( "ui-screen-hidden" );
				}

				if ( typeof o.target === "string" ) {
					wrapper.prependTo( $( "." + o.target + "" ) );
				} else {
					wrapper.insertBefore( el );
				}
				
				return search;
			},

			_create: function() {
				var search,
					o = this.options,
					items = this._getFilterableItems();

				this._setOption( "timer", undefined );

				if ( !o.enhanced ) {
					search = this._enhance( items );
				} else {
					search = $( "." + o.wrapperClass ).find( "input" );
				}

				this._on( search, {
					keyup: "_onKeyUp",
					change: "_onKeyUp",
					input: "_onKeyUp"
				});
				
				$.extend( this, {
					_search: search
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
				this._addFirstLastClasses( items, this._getVisibles( items, true ), true );
			},
			
			_setOption: function( key, value ) {
				var o = this.options,
					wrapper = document.getElementById( "ui-filter-" + this.uuid ),
					$input = $( wrapper ).find( "input" );

				// always update
				o[ key ] = value;

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
				var o = this.options,
					wrapper = document.getElementById( "ui-filter-" + this.uuid );

				if ( !o.enhanced ) {
					wrapper.parentNode.removeChild( wrapper );
				}
				this._toggleFilterableItems( this._getFilterableItems(), false, false );
			}

	}, $.mobile.behaviors.addFirstLastClasses ) );

	$.mobile.filterbar.initSelector = ":jqmData(filter='true')";

	//auto self-init widgets
	$.mobile._enhancer.add( "mobile.filterbar" );

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
