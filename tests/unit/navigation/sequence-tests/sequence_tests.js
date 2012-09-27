(function($) {

	$.testHelper.setPushState();

	asyncTest( "Returning from a dialog results in the page from which it opened", function() {
		expect( 2 );

		$.testHelper.detailedEventCascade([
			function() {
			},
			{
				navigate: { src: $( document ), event: "navigate.returningFromADialogStep0" }
			},
			function() {
				$( "#openBasicDialog" ).click();
			},
			{
				navigate: { src: $( document ), event: "hashchange.returningFromADialogStep1" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.returningFromADialogStep1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "a", $.mobile.activePage[ 0 ] ).click();
			},
			{
				navigate: { src: $( document ), event: "hashchange.returningFromADialogStep2" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.returningFromADialogStep2" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				start();
			}
		]);
	});

})( jQuery );
