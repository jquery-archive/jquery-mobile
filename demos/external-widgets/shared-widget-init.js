/* You can place the code for initializing widgets that are shared by the various pages of your
   application and which reside outside your application's jQuery Mobile pages into an external
   script which you can then reference from all your application's documents. This way, no matter
   which document ends up being your application's startup page, the shared widgets will always be
   functional and correctly enhanced. */
$( function() {
	function updateActivePage( href ) {
		$( "a.ui-btn" )
			.removeClass( "ui-btn-active" )
			.filter( "[href='" + href + "']" )
				.addClass( "ui-btn-active" );
	}

	$( "[data-role='navbar']" ).navbar();
	$( "[data-role='header'], [data-role='footer']" ).toolbar();
	$( "#nav-menu" ).popup();
	$( "#nav-menu-links" ).listview();
	$( "#shared-panel" ).panel();

	/* Since the navbar we use is outside the page, it does not update itself to indicate the currently
	   active page. We manually update the navbar whenever the page changes. */
	$( document ).on( "pagecontainerchange", function( event, data ) {
		updateActivePage( $.mobile.path.parseUrl( data.toPage.jqmData( "url" ) ).filename );
	});

	updateActivePage( $.mobile.path.parseLocation().filename );
});
