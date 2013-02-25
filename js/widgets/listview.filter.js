//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
//>>description: Extends the listview to add a search box to filter lists
//>>label: Listview: Filter
//>>group: Widgets


define( [ "jquery", "./listview", "./forms/textinput" ], function( jQuery ) {
//>>excludeEnd("jqmBuildExclude");
(function( $, undefined ) {

$.mobile.listview.prototype.options.filter = false;
$.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";
$.mobile.listview.prototype.options.filterTheme = "c";
$.mobile.listview.prototype.options.filterReveal = false;
// TODO rename callback/deprecate and default to the item itself as the first argument
var defaultFilterCallback = function( text, searchValue, item ) {
		return text.toString().toLowerCase().indexOf( searchValue ) === -1;
	};

$.mobile.listview.prototype.options.filterCallback = defaultFilterCallback;

$.mobile.document.delegate( "ul, ol", "listviewcreate", function() {
	var list = $( this ),
		listview = list.data( "mobile-listview" );

	if ( !listview || !listview.options.filter ) {
		return;
	}

	if ( listview.options.filterReveal ) {
		list.children().addClass( "ui-screen-hidden" );
	}

	var wrapper = $( "<form>", {
			"class": "ui-listview-filter ui-bar-" + listview.options.filterTheme,
			"role": "search"
		}).submit( function( e ) {
			e.preventDefault();
			search.blur();
		}),
		onKeyUp = function( e ) {
			var $this = $( this ),
				val = this.value.toLowerCase(),
				listItems = null,
				li = list.children(),
				lastval = $this.jqmData( "lastval" ) + "",
				childItems = false,
				itemtext = "",
				item,
				// Check if a custom filter callback applies
				isCustomFilterCallback = listview.options.filterCallback !== defaultFilterCallback;

			if ( lastval && lastval === val ) {
				// Execute the handler only once per value change
				return;
			}

			listview._trigger( "beforefilter", "beforefilter", { input: this } );

			// Change val as lastval for next execution
			$this.jqmData( "lastval" , val );
			if ( isCustomFilterCallback || val.length < lastval.length || val.indexOf( lastval ) !== 0 ) {

				// Custom filter callback applies or removed chars or pasted something totally different, check all items
				listItems = list.children();
			} else {

				// Only chars added, not removed, only use visible subset
				listItems = list.children( ":not(.ui-screen-hidden)" );

				if ( !listItems.length && listview.options.filterReveal ) {
					listItems = list.children( ".ui-screen-hidden" );
				}
			}

			if ( val ) {

				// This handles hiding regular rows without the text we search for
				// and any list dividers without regular rows shown under it

				for ( var i = listItems.length - 1; i >= 0; i-- ) {
					item = $( listItems[ i ] );
					itemtext = item.jqmData( "filtertext" ) || item.text();

					if ( item.is( "li:jqmData(role=list-divider)" ) ) {

						item.toggleClass( "ui-filter-hidequeue" , !childItems );

						// New bucket!
						childItems = false;

					} else if ( listview.options.filterCallback( itemtext, val, item ) ) {

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
				listItems.toggleClass( "ui-screen-hidden", !!listview.options.filterReveal );
			}
			listview._addFirstLastClasses( li, listview._getVisibles( li, false ), false );
		},
		search = $( "<input>", {
			placeholder: listview.options.filterPlaceholder
		})
		.attr( "data-" + $.mobile.ns + "type", "search" )
		.jqmData( "lastval", "" )
		.bind( "keyup change input", onKeyUp )
		.appendTo( wrapper )
		.textinput();

	if ( listview.options.inset ) {
		wrapper.addClass( "ui-listview-filter-inset" );
	}

	wrapper.bind( "submit", function() {
		return false;
	})
	.insertBefore( list );
});

})( jQuery );
//>>excludeStart("jqmBuildExclude", pragmas.jqmBuildExclude);
});
//>>excludeEnd("jqmBuildExclude");
