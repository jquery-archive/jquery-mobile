$( document ).on( "pagecreate", "[data-role='page'].demo-page", function() {
	var page = "#" + $( this ).attr( "id" ),

		// Get the filename of the next page. We stored that in the data-next
		// attribute in the original markup.
		next = $( this ).jqmData( "next" ),

		// Get the filename of the previous page. We stored that in the data-prev
		// attribute in the original markup.
		prev = $( this ).jqmData( "prev" );
	
	// Check if we did set the data-next attribute
	if ( next ) {

		// Prefetch the next page
		$.mobile.loadPage( next + ".html" );

		// Navigate to next page on swipe left
		$( document ).on( "swipeleft", page, function( event ) {

			// Swipes may also happen when the user highlights text, so ignore those.
			// We're only interested in swipes on the page.
			if ( event.target === $( page )[ 0 ] ) {
				$.mobile.changePage( next + ".html", { transition: "slide" });
			}
		});

		// Navigate to next page when the "next" button is clicked
		$( ".control .next", page ).on( "click", function() {
			$.mobile.changePage( next + ".html", { transition: "slide" } );
		});
	}

	// Disable the "next" button if there is no next page
	else {
		$( ".control .next", page ).addClass( "ui-disabled" );
	}

	// The same for the previous page (we set data-dom-cache="true" so there is
	// no need to prefetch)
	if ( prev ) {
		$( document ).on( "swiperight", page, function( event ) {

			// Swipes may also happen when the user highlights text, so ignore those.
			// We're only interested in swipes on the page.
			if ( event.target === $( page )[ 0 ] ) {
				$.mobile.changePage( prev + ".html", {
					transition: "slide",
					reverse: true
				});
			}
		});
		$( ".control .prev", page ).on( "click", function() {
			$.mobile.changePage( prev + ".html", {
				transition: "slide",
				reverse: true
			});
		});
	}
	else {
		$( ".control .prev", page ).addClass( "ui-disabled" );
	}
});
