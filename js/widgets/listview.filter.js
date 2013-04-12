//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the listview to add a search box to filter lists
//>>label: Listview: Filter
//>>group: Widgets


define( [ "jquery", "./listview", "./forms/textinput" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

// TODO rename callback/deprecate and default to the item itself as the first argument
var defaultFilterCallback = function( text, searchValue /*, item */) {
	return text.toString().toLowerCase().indexOf( searchValue ) === -1;
};

$.widget( "mobile.listview", $.mobile.listview, {
	options: {
		filter: false,
		filterPlaceholder: "Filter items...",
		filterTheme: "c",
		filterReveal: false,
		filterCallback: defaultFilterCallback
	},

	_onKeyUp: function(/* e */) {
		var search = this._search,
			o = this.options,
			list = this.element,
			val = search[ 0 ].value.toLowerCase(),
			listItems = null,
			li = list.children(),
			lastval = search.jqmData( "lastval" ) + "",
			childItems = false,
			itemtext = "",
			item, i,
			// Check if a custom filter callback applies
			isCustomFilterCallback = o.filterCallback !== defaultFilterCallback;

		if ( lastval && lastval === val ) {
			// Execute the handler only once per value change
			return;
		}

		this._trigger( "beforefilter", "beforefilter", { input: search[ 0 ] } );

		// Change val as lastval for next execution
		search.jqmData( "lastval" , val );
		if ( isCustomFilterCallback || val.length < lastval.length || val.indexOf( lastval ) !== 0 ) {

			// Custom filter callback applies or removed chars or pasted something totally different, check all items
			listItems = list.children();
		} else {

			// Only chars added, not removed, only use visible subset
			listItems = list.children( ":not(.ui-screen-hidden)" );

			if ( !listItems.length && o.filterReveal ) {
				listItems = list.children( ".ui-screen-hidden" );
			}
		}

		if ( val ) {

			// This handles hiding regular rows without the text we search for
			// and any list dividers without regular rows shown under it

			for ( i = listItems.length - 1; i >= 0; i-- ) {
				item = $( listItems[ i ] );
				itemtext = item.jqmData( "filtertext" ) || item.text();

				if ( item.is( "li:jqmData(role=list-divider)" ) ) {

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

			// Show items, not marked to be hidden
			listItems
				.filter( ":not(.ui-filter-hidequeue)" )
				.toggleClass( "ui-screen-hidden", false );

			// Hide items, marked to be hidden
			listItems
				.filter( ".ui-filter-hidequeue" )
				.toggleClass( "ui-screen-hidden", true )
				.toggleClass( "ui-filter-hidequeue", false );

		} else {

			//filtervalue is empty => show all
			listItems.toggleClass( "ui-screen-hidden", !!o.filterReveal );
		}
		this._addFirstLastClasses( li, this._getVisibles( li, false ), false );
	},

	_create: function() {
		var list, wrapper, search,
			o = this.options;

		this._super();

		if ( !o.filter ) {
			return;
		}

		list = this.element;

		if ( o.filterReveal ) {
			list.children().addClass( "ui-screen-hidden" );
		}

		wrapper = $( "<form>", {
			"class": "ui-listview-filter ui-bar-" + o.filterTheme,
			"role": "search"
		}).submit( function(/* e */) {
			search.blur();
			return false;
		});
		search = $( "<input>", {
			placeholder: o.filterPlaceholder
		})
		.attr( "data-" + $.mobile.ns + "type", "search" )
		.jqmData( "lastval", "" )
		.appendTo( wrapper )
		.textinput();

		this._on( search, { keyup: "_onKeyUp", change: "_onKeyUp", input: "_onKeyUp" } );

		$.extend( this, {
			_search: search
		});

		if ( o.inset ) {
			wrapper.addClass( "ui-listview-filter-inset" );
		}

		wrapper.insertBefore( list );
	}
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
