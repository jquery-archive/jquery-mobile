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
                lastval=$(this).jqmData('lastval')+"";
				var val = this.value.toLowerCase(),listItems=null;
                //change val as lastval for next execution  
                $(this).jqmData('lastval',val);
                  
                change=val.replace(new RegExp("^"+lastval),"");
                  
                if(val.length<lastval.length || change.length!=(val.length-lastval.length)){
                    //removed chars or pasted something totaly different, check all items
                    listItems = list.children()
                }else{
                    //only chars added, not removed, only use visible subset
                    listItems = list.children(':visible');
                }
				if ( val ) {
					// This handles hiding regular rows without the text we search for
					// and any list dividers without regular rows shown under it
					var childItems = false,
							item,itemtext="";

					for (var i = listItems.length; i >= 0; i--) {
						item = $(listItems[i]);
                        itemtext=item.jqmData('filtertext') || item.text();
						if (item.is("li:jqmData(role=list-divider)")) {
							if (!childItems) {
								item.hide();
                            }else{
                                item.show();
                            }
							// New bucket!
							childItems = false;
						} else if (itemtext.toLowerCase().indexOf( val ) === -1) {
							item.hide();
						} else {
                            item.show();
							// There's a shown item in the bucket
							childItems = true;
						}
					}
                }else{
                    listItems.show();
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
