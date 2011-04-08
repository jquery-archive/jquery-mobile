/*
* jQuery Mobile Framework : "listview" filter extension
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.mobile.listview.prototype.options.filter = false;
$.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";

$( ":jqmData(role='listview')" ).live( "listviewcreate", function() {
	var list = $( this ),
		listview = list.data( "listview" );

	if ( !listview.options.filter ) {
		return;
	}

	var wrapper = $( "<form>", { "class": "ui-listview-filter ui-bar-c", "role": "search" } ),

		search = $( "<input>", {
				placeholder: listview.options.filterPlaceholder
			})
			.attr( "data-" + $.mobile.ns + "type", "search" )
			.bind( "keyup change", function() {
				var val = this.value.toLowerCase(),
						listItems = list.children();
				listItems.show();
				if ( val ) {
					// This handles hiding regular rows without the text we search for
					// and any list dividers without regular rows shown under it
					var childItems = false,
							item;

					for (var i = listItems.length; i >= 0; i--) {
						item = $(listItems[i]);
						if (item.is("li:jqmData(role=list-divider)")) {
							if (!childItems) {
								item.hide();
							}
							// New bucket!
							childItems = false;
                        } else {
                            var c = item.children();
                            if(c.length && c.filter(':not([data-filtered=false])').text().toLowerCase().indexOf( val ) === -1) {
                                // list is complex - takes text from child elements and do not include direct childs having data-filtered attribute to false
                                item.hide();
                            } else if (item.text().toLowerCase().indexOf( val ) === -1) {
                                // list is simple - take all text directly
                                item.hide();
                            } else {
                                // There's a shown item in the bucket
                                childItems = true;
                            }
                        }
					}
				}
			})
			.appendTo( wrapper )
			.textinput();

	if ($( this ).jqmData( "inset" ) ) {
		wrapper.addClass( "ui-listview-filter-inset" );
	}

	wrapper.insertBefore( list );
});

})( jQuery );
