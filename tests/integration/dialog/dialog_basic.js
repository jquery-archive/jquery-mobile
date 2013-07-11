(function($) {

	asyncTest( "Returning from a dialog results in the page from which it opened", function() {
		expect( 2 );

		$.testHelper.pageSequence([
			function() {
				$( "#openBasicDialog" ).click();
			},

			function() {
				ok( $.ui.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "a", $.ui.activePage[ 0 ] ).click();
			},

			function() {
				ok( $.ui.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				start();
			}
		]);
	});

})( jQuery );
