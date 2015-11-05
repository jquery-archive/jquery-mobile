// Pagecreate will fire for each of the pages in this demo
// but we only need to bind once so we use "one()"
$( document ).one( "pagecreate", ".demo-page", function() {
	// Initialize the external persistent header and footer, and the footer controlgroup
	$( "#header" ).toolbar({ theme: "b" });
	$( "#footer" ).toolbar({ theme: "b" });
	$( "#footer" ).find( ".control" ).controlgroup({ mini: true });

	// Handler for navigating to the next page
	function navnext( next ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", next + ".html", {
			transition: "slide"
		});
	}

	// Handler for navigating to the previous page
	function navprev( prev ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "change", prev + ".html", {
			transition: "slide",
			reverse: true
		});
	}

	// Navigate to the next page on swipeleft
	$( document ).on( "swipeleft", ".ui-page", function( event ) {
		// Get the filename of the next page. We stored that in the data-next
		// attribute in the original markup.
		var next = $( this ).jqmData( "next" );

		// Check if there is a next page and
		// swipes may also happen when the user highlights text, so ignore those.
		// We're only interested in swipes on the page.
		if ( next && ( event.target === $( this )[ 0 ] ) ) {
			navnext( next );
		}
	});

	// Navigate to the next page when the "next" button in the footer is clicked
	$( document ).on( "click", ".next", function() {
		var next = $( ".ui-page-active" ).jqmData( "next" );

		// Check if there is a next page
		if ( next ) {
			navnext( next );
		}
	});

	// The same for the navigating to the previous page
	$( document ).on( "swiperight", ".ui-page", function( event ) {
		var prev = $( this ).jqmData( "prev" );

		if ( prev && ( event.target === $( this )[ 0 ] ) ) {
			navprev( prev );
		}
	});

	$( document ).on( "click", ".prev", function() {
		var prev = $( ".ui-page-active" ).jqmData( "prev" );

		if ( prev ) {
			navprev( prev );
		}
	});
});

$( document ).on( "pageshow", ".demo-page", function() {
	var thePage = $( this ),
		title = thePage.jqmData( "title" ),
		next = thePage.jqmData( "next" ),
		prev = thePage.jqmData( "prev" );

	// Point the "Trivia" button to the popup for the current page.
	$( "#trivia-button" ).attr( "href", "#" + thePage.find( ".trivia" ).attr( "id" ) );

	// We use the same header on each page
	// so we have to update the title
	$( "#header h1" ).text( title );

	// Prefetch the next page
	// We added data-dom-cache="true" to the page so it won't be deleted
	// so there is no need to prefetch it
	if ( next ) {
		$( ":mobile-pagecontainer" ).pagecontainer( "load", next + ".html" );
	}

	// We disable the next or previous buttons in the footer
	// if there is no next or previous page
	// We use the same footer on each page
	// so first we remove the disabled class if it is there
	$( ".next.ui-state-disabled, .prev.ui-state-disabled" ).removeClass( "ui-state-disabled" );

	if ( ! next ) {
		$( ".next" ).addClass( "ui-state-disabled" );
	}
	if ( ! prev ) {
		$( ".prev" ).addClass( "ui-state-disabled" );
	}
});
