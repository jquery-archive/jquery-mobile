asyncTest( "resetActivePageHeight() will be called when page is initialized late", function() {
	var resetActivePageHeightCallCount = 0;

	expect( 1 );

	$( document ).on( "mobileinit", function() {
		$.mobile.autoInitializePage = false;

		$.mobile.resetActivePageHeight = ( function( original ) {
			return function resetActivePageHeight() {
				resetActivePageHeightCallCount++;
				return original.apply( this, arguments );
			};
		})( $.mobile.resetActivePageHeight );
	});

	require([ "jquery", "./init" ]
		.concat( ( window.location.search.indexOf( "transitions" ) > -1 ) ?
			[ "./widgets/pagecontainer.transitions" ] : [] ), function() {
		$.testHelper.detailedEventCascade([
			function() {
				$.mobile.initializePage();
			},
			{
				pagecontainershow: { src: $( "body" ), event: "pagecontainershow.noAutoinit1" }
			},
			function() {
				deepEqual( resetActivePageHeightCallCount, 1,
					"$.mobile.resetActivePageHeight() was called from delayed initializePage()" );
				start();
			}
		]);
	});

});
