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

	asyncTest( "Returning from a popup results in the page from which it opened", function() {
		var origActive;

		expect( 5 );

		$.testHelper.detailedEventCascade([
			function() {
			},
			{
				navigate: { src: $( document ), event: "navigate.returningFromAPopupStep0" }
			},
			function() {
				origActive = $.mobile.activePage;
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: $( "#thePopup" ), event: "popupafteropen.returnFromPopupStep1" },
				navigate: { src: $.mobile.pageContainer, event: "navigate.returnFromPopupStep1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				ok( !result.navigate.timedOut, "A 'navigate' event has occurred as a result of opening the popup" );
				$( "#thePopup" ).parent().prev().click();
			},
			{
				popupafterclose: { src: $( "#thePopup" ), event: "popupafterclose.returnFromPopupStep2" },
				navigate: { src: $.mobile.pageContainer, event: "navigate.returnFromPopupStep2" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( !result.navigate.timedOut, "A 'navigate' event has occurred as a result of opening the popup" );
				ok( $.mobile.activePage[ 0 ] === origActive[ 0 ], "The active page is the same as it was before opening the popup" );
				start();
			},
		]);

	});

})( jQuery );
