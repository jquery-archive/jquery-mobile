/*
* jQuery Mobile Framework : "listview" filter extension
* Copyright (c) jQuery Project
* Dual licensed under the MIT or GPL Version 2 licenses.
* http://jquery.org/license
*/
(function($, undefined ) {

$.mobile.listview.prototype.options.filter = false;

$( "[data-role='listview']" ).live( "listviewcreate", function() {
	var list = $( this ),
		listview = list.data( "listview" );
	if ( !listview.options.filter ) {
		return;
	}

    // using custom style faster than iterating over list and calling .hide()
    // http://www.learningjquery.com/2010/05/now-you-see-me-showhide-performance
    var head = document.getElementsByTagName("head")[0] || document.documentElement,
				style = document.createElement("style");
	style.type = "text/css";
	style.appendChild( document.createTextNode( "li.ui-listview-filter-hide { display: none; }" ) );
	head.insertBefore( style, head.firstChild );

	var wrapper = $( "<form>", { "class": "ui-listview-filter ui-bar-c", "role": "search" } ),

		search = $( "<input>", {
				placeholder: "Filter results...",
				"data-type": "search"
			})
			.bind( "keyup change", function() {
				var val = this.value.toLowerCase(),
						listItems = list.children();
				style.disabled = true;
				listItems.removeClass("ui-listview-filter-hide");
				if ( val ) {
					// This handles hiding regular rows without the text we search for
					// and any list dividers without regular rows shown under it
					var childItems = false,
							item,
							itemtext;

					for (var i = listItems.length; i >= 0; i--) {
						item = $(listItems[i]);
						// look for custom attribute for text to filter on before getting text from DOM
						itemtext = item.data("filtertext") || item.text();
						if (item.is("li[data-role=list-divider]")) {
							if (!childItems) {
								item.addClass("ui-listview-filter-hide");
							}
							// New bucket!
							childItems = false;
						} else if (itemtext.toLowerCase().indexOf( val ) === -1) {
							item.addClass("ui-listview-filter-hide");
						} else {
							// There's a shown item in the bucket
							childItems = true;
						}
					}
				}
				style.disabled = false;
			})
			.appendTo( wrapper )
			.textinput();

	if ($(this).data("inset") == true ) {
		wrapper.addClass("ui-listview-filter-inset");
	}
	
	wrapper.insertBefore( list );
});

})( jQuery );
