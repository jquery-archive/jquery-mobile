(function($) {

	$.testHelper.setPushState();

	asyncTest( "Returning from a dialog results in the page from which it opened", function() {
		expect( 2 );

		$.testHelper.detailedEventCascade([
			// This empty function and the following "navigate" event test is necessary to ensure
			// that, when the initial URL contains the path to a page to be loaded via AJAX, the loading
			// process which is done via a synthetic hashchange event completes.
			function() { },
			{ navigate: { src: $( document ), event: "navigate.returningFromADialogStep0" } },

			function() { $( "#openBasicDialog" ).click(); },
			{
				navigate: { src: $( document ), event: "navigate.returningFromADialogStep1" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.returningFromADialogStep1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "a:first", $.mobile.activePage[ 0 ] ).click();
			},
			{
				navigate: { src: $( document ), event: "navigate.returningFromADialogStep2" },
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
			// This empty function and the following "navigate" event test is necessary to ensure
			// that, when the initial URL contains the path to a page to be loaded via AJAX, the loading
			// process which is done via a synthetic hashchange event completes.
			function() { },
			{ navigate: { src: $( document ), event: "navigate.returningFromADialogStep0" } },

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

	asyncTest( "Going from a dialog to another page works", function() {
		$.testHelper.detailedEventCascade([
			// This empty function and the following "navigate" event test is necessary to ensure
			// that, when the initial URL contains the path to a page to be loaded via AJAX, the loading
			// process which is done via a synthetic hashchange event completes.
			function() { },
			{ navigate: { src: $( document ), event: "navigate.GoingFromADialogToAnotherPageStep0" } },

			function() { $( "#openBasicDialog" ).click(); },
			{
				navigate: { src: $( document ), event: "navigate.GoingFromADialogToAnotherPageStep1" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.GoingFromADialogToAnotherPageStep1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "#fromDialogToAnotherPage" ).click();
			},
			{
				navigate: { src: $( document ), event: "navigate.GoingFromADialogToAnotherPageStep2" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.GoingFromADialogToAnotherPageStep2" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				navigate: { src: $( document ), event: "navigate.GoingFromADialogToAnotherPageStep3" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.GoingFromADialogToAnotherPageStep3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works" );
				start();
			}
		]);
	});

})( jQuery );
