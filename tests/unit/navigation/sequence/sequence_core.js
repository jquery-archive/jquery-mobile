(function($) {

	// The following tests are not independent of each other. Thus, if you find
	// that one of them fails, and it causes the failure of the rest of the tests,
	// but that, if you change the order of the tests, it passes, then you should
	// copy the tests over so that both orders are tested here.
	//
	// The more we click around the test pages and the more combinations of paths
	// we try, the better.

	$.testHelper.setPushState();

	// If the start page is not there, wait for it to appear. Otherwise, leave
	// some time before starting the actual run to allow the popstate handler to
	// awaken from its slumber
	function maybeWaitForStartPage( seq, prefix ) {
		if ( $( "#basicTestPage" ).length === 0 ) {
			$.testHelper.detailedEventCascade([
				// This empty function and the following "navigate" event test is
				// necessary to ensure that, when the initial URL contains the path to a
				// page to be loaded via AJAX, the loading process which is done via a
				// synthetic hashchange event completes.
				function() { },
				{ navigate: { src: $( window ), event: "navigate" + prefix + "0" } },
				function() {
					$.testHelper.detailedEventCascade( seq );
				}
			]);
		} else {
			// You can tweak the timeout below to make the tests run faster, but if
			// you do, make sure it greatly exceeds the timeout used for the pushState
			// slumber - i.e., the brief time immediately following an adjustment made
			// by the pushState plugin during which, if the location were to require
			// an adjustment by the pushState plugin, it will not get such an
			// adjustment because the pushState plugin ignores such requests.
			setTimeout( function() { $.testHelper.detailedEventCascade( seq ); }, 500 );
		}
	}

	asyncTest( "Returning from a dialog results in the page from which it opened", function() {
		var eventNs = ".returningFromADialog";
		expect( 2 );

		maybeWaitForStartPage([
			function() {
				$( "#openBasicDialog" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "1" }
			},
			function( result ) {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "a:first", $.mobile.activePage[ 0 ] ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Returning from a popup results in the page from which it opened", function() {
		var origActive, eventNs = ".returningFromAPopup";

		expect( 3 );

		maybeWaitForStartPage([
			function() {
				origActive = $.mobile.activePage;
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#thePopup" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#thePopup" ).parent().prev().click();
			},
			{
				popupafterclose: { src: function() { return $( "#thePopup" ); }, event: "popupafterclose" + eventNs + "2" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( $.mobile.activePage[ 0 ] === origActive[ 0 ], "The active page is the same as it was before opening the popup" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Going from a dialog to another page works", function() {
		var eventNs = ".goingFromADialogToAnotherPage";

		expect( 3 );

		maybeWaitForStartPage([
			function() { $( "#openBasicDialog" ).click(); },
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "#fromDialogToAnotherPage" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},

			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Going from a popup to another page works", function() {
		var eventNs = ".goingFromAPopupToAnotherPage";

		expect( 3 );

		maybeWaitForStartPage([
			function() {
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#thePopup" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#openPageFromPopup" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Opening one dialog followed by opening another dialog works", function() {
		var eventNs = ".openingOneDialogFollowedByAnother";

		expect( 4 );

		maybeWaitForStartPage([
			// NOTE: The first part of this test is a copy of the test above
			function() { $( "#openBasicDialog" ).click(); },
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "a:first", $.mobile.activePage[ 0 ] ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},

			// NOTE: The second part of this test is also a copy of the test above
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				$( "#openAnotherDialog" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherDialog", "Another dialog has opened" );
				$( "a:first", $.mobile.activePage[ 0 ] ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Opening one popup followed by opening another popup works", function() {
		var origActive, eventNs = ".openingOnePopupFollowedByAnother";

		expect( 6 );

		maybeWaitForStartPage([
			// NOTE: This is basically two copies of the "returning from a popup test" one after the other
			function() {
				origActive = $.mobile.activePage;
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#thePopup" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#thePopup" ).parent().prev().click();
			},
			{
				popupafterclose: { src: function() { return $( "#thePopup" ); }, event: "popupafterclose" + eventNs + "2" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( $.mobile.activePage[ 0 ] === origActive[ 0 ], "The active page is the same as it was before opening the popup" );
				$( "#openAnotherPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#anotherPopup" ); }, event: "popupafteropen" + eventNs + "3" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#anotherPopup" ).parent().prev().click();
			},
			{
				popupafterclose: { src: function() { return $( "#anotherPopup" ); }, event: "popupafterclose" + eventNs + "4" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( $.mobile.activePage[ 0 ] === origActive[ 0 ], "The active page is the same as it was before opening the popup" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Opening another page after returning from a dialog works", function() {
		var eventNs = ".openingAnotherPageAfterDialog";

		expect( 4 );

		maybeWaitForStartPage([
			function() { $( "#openBasicDialog" ).click(); },
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "a:first", $.mobile.activePage[ 0 ] ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				$( "#openAnotherPage" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Opening another page after returning from a popup works", function() {
		var origActive, eventNs = ".openingAnotherPageAfterPopup";

		expect( 5 );

		maybeWaitForStartPage([
			function() {
				origActive = $.mobile.activePage;
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#thePopup" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#thePopup" ).parent().prev().click();
			},
			{
				popupafterclose: { src: function() { return $( "#thePopup" ); }, event: "popupafterclose" + eventNs + "2" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( $.mobile.activePage[ 0 ] === origActive[ 0 ], "The active page is the same as it was before opening the popup" );
				$( "#openAnotherPage" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				start();
			}
		], "openingAnotherPageAfterPopup" );
	});

	asyncTest( "Sequence page1 -> dialog1 -> popup1 -> page2 <- back", function() {
		var eventNs = ".page1Dialog1Popup1Page2Back";

		expect( 5 );

		maybeWaitForStartPage([
			function() { $( "#openBasicDialog" ).click(); },
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "#fromDialogToPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#popupFromBasicDialog" ); }, event: "popupafteropen" + eventNs + "2" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#fromDialogPopupToAnotherPage" ).click();
			},
			{
				popupafterclose: { src: function() { return $( "#popupFromBasicDialog" ); }, event: "popupafterclose" + eventNs + "3" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Active page is original page" );
				start();
			}
		]);
	});

	asyncTest( "Sequence page1 -> popup1 -> dialog1 -> page2 <- back", function() {
		var eventNs = ".page1Popup1Dialog1Page2";

		expect( 4 );

		maybeWaitForStartPage([
			function() {
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#thePopup" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#openDialogFromPopup" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "#fromDialogToAnotherPage" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Sequence page -> popup1 -> dialog -> popup2 <- back <- back", function() {
		var eventNs = ".pagePopupDialogPopup";

		expect( 8 );

		maybeWaitForStartPage([
			function() {
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#thePopup" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#openDialogFromPopup" ).click();
			},
			{
				popupafterclose: { src: function() { return $( "#thePopup" ); }, event: "popupafterclose" + eventNs + "2" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "#fromDialogToPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#popupFromBasicDialog" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#popupFromBasicDialog" ).parent().prev().click();
			},
			{
				popupafterclose: { src: function() { return $( "#popupFromBasicDialog" ); }, event: "popupafterclose" + eventNs + "2" }
			},
			function( result ) {
				ok( !result.popupafterclose.timedOut, "Popup emitted 'popupafterclose'" );
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog is active page" );
				$( "a:first", $.mobile.activePage[ 0 ] ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},
			function( result ) {
				ok( !result.pagechange.timedOut, "A pagechange event has occurred as a result of returning from the dialog" );
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Basic test page is active page" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Sequence page1 -> dialog -> page2 <- back -> forward <- back", function() {
		var eventNs = ".pageDialogPageBackForward";

		expect( 5 );

		maybeWaitForStartPage([
			function() { $( "#openBasicDialog" ).click(); },
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "1" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicDialog", "Basic dialog has opened" );
				$( "#fromDialogToAnotherPage" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},

			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works" );
				window.history.forward();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page after going forward" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works again" );
				start();
			}
		], eventNs );
	});

	asyncTest( "Sequence page1 -> popup -> page2 <- back -> forward <- back", function() {
		var eventNs = ".goingFromAPopupToAnotherPage";

		expect( 5 );

		maybeWaitForStartPage([
			function() {
				$( "#openPopup" ).click();
			},
			{
				popupafteropen: { src: function() { return $( "#thePopup" ); }, event: "popupafteropen" + eventNs + "1" }
			},
			function( result ) {
				ok( !result.popupafteropen.timedOut, "Popup emitted 'popupafteropen'" );
				$( "#openPageFromPopup" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "2" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "3" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works" );
				window.history.forward();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "anotherPage", "Landed on another page after going forward" );
				$.mobile.back();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "4" }
			},
			function() {
				ok( $.mobile.activePage.attr( "id" ) === "basicTestPage", "Coming back from another page to the start page works again" );
				start();
			}
		], eventNs );
	});

})( jQuery );
