/*
 * mobile popup unit tests
 */
(function($){

	var urlObject = $.mobile.path.parseLocation(),
		home = urlObject.pathname + urlObject.search;

	module( "jquery.mobile.popup.js", {
		setup: function() {
			$.mobile.navigate.history.stack = [];
			$.mobile.navigate.history.activeIndex = 0;
			$.testHelper.navReset( home );
		}
	});

	function popupEnhancementTests( $sel, prefix ) {
		var $container = $sel.parent(), $screen = $sel.parent().prev();

		ok( $sel.data( "mobile-popup" ),  prefix + ", popup div is associated with a popup widget" );
		ok( $sel.hasClass( "ui-popup" ),  prefix + ", popup payload has class 'ui-popup'" );
		ok( $container.hasClass( "ui-popup-container" ), prefix + ", popup div parent has class ui-popup-container" );
		ok( $container.parent().hasClass( "ui-page" ), prefix + ", popup container parent is the page" );
		ok( $screen.hasClass( "ui-popup-screen" ), prefix + ", popup div is preceded by its screen" );
		ok( $container.attr( "id" ) === $sel.attr( "id" ) + "-popup", prefix + ", popup container has the id of the payload + '-popup'" );
		ok( $screen.attr( "id" ) === $sel.attr( "id" ) + "-screen", prefix + ", popup screen has the id of the payload + '-screen'" );
	}

	function tolTest( el, popup, val, expected ) {
		el.popup( "option", "tolerance", val );
		deepEqual( popup._tolerance, expected, "Popup tolerance: '" + val + "' results in expected tolerances" );
	}

	test( "Popup tolerances are parsed correctly", function() {
		var tolTestElement = $( "#tolerance-test" ),
			tolTestPopup = tolTestElement.data( "mobile-popup" ),
			defaultValues = tolTestPopup._tolerance;

		ok( (
			$.type( defaultValues.t ) === "number" && !isNaN( defaultValues.t ) &&
			$.type( defaultValues.r ) === "number" && !isNaN( defaultValues.r ) &&
			$.type( defaultValues.b ) === "number" && !isNaN( defaultValues.b ) &&
			$.type( defaultValues.l ) === "number" && !isNaN( defaultValues.l ) ), "Default tolerances are numbers and not NaN" );

		tolTest( tolTestElement, tolTestPopup, "", defaultValues );
		tolTest( tolTestElement, tolTestPopup, "0", { t: 0, r: 0, b: 0, l: 0 } );
		tolTest( tolTestElement, tolTestPopup, "14,12", { t: 14, r: 12, b: 14, l: 12 } );
		tolTest( tolTestElement, tolTestPopup, "9,4,11,5", { t: 9, r: 4, b: 11, l: 5 } );
		tolTest( tolTestElement, tolTestPopup, null, defaultValues );
	});

	test( "Popup is enhanced correctly", function() {
		popupEnhancementTests( $( "#test-popup" ), "When autoenhanced" );
		ok( $( "#page-content" ).children().first().html() === "<!-- placeholder for test-popup -->", "When autoenhanced, there is a placeholder in the popup div's original location" );
	});

	test( "Popup rearranges DOM elements correctly when it is destroyed and again when it is re-created", function() {
		$( "#test-popup" ).popup( "destroy" );

		ok( $( "#page-content" ).children().first().attr( "id" ) === "test-popup", "After destroying a popup, its payload is returned to its original location" );
		ok( $( "#page-content" ).children().first().prev().html() !== "<!-- placeholder for test-popup -->", "No placeholder precedes the restored popup" );
		ok( $( "#page-content" ).children().first().next().html() !== "<!-- placeholder for test-popup -->", "No placeholder succeedes the restored popup" );

		$( "#test-popup" ).popup();

		popupEnhancementTests( $( "#test-popup" ), "When re-created" );
		ok( $( "#page-content" ).children().first().html() === "<!-- placeholder for test-popup -->", "When re-created, there is a placeholder in the popup div's original location" );
	});

	test( "On-the-fly popup is enhanced and de-enhanced correctly", function() {
		var $container = $( "<div></div>" ).appendTo( $( "#page-content" ) ),
			$payload = $( "<p id='otf-popup'>This is an on-the-fly-popup</p>" ).appendTo( $container );

		$payload.popup();

		popupEnhancementTests( $payload, "When created on-the-fly" );
		ok( $container.children().first().html() === "<!-- placeholder for otf-popup -->", "When created on-the-fly, there is a placeholder in the popup div's original location" );
		$payload.popup( "destroy" );
		ok( !$payload.attr( "class" ), "After destroying on-the-fly popup, the payload has no 'class' attribute" );
		ok( $container.children().is( $payload ), "After destroying on-the-fly popup, its payload is returned to its original location" );
	});

	asyncTest( "Popup does not go back in history twice when opening on separate page", function() {
		var eventNs = ".backTwice", popup = function() { return $( "#back-twice-test-popup" ); };
		$.testHelper.detailedEventCascade([
			function() {
				$( "#go-to-another-page" ).click();
			},
			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange" + eventNs + "1" }
			},
			function() {
				deepEqual( $.mobile.activePage.attr( "id" ), "another-page", "Reached another page" );
				$( "#open-back-twice-test-popup" ).click();
			},
			{
				popupafteropen: { src: popup, event: "popupafteropen" + eventNs + "2" }
			},
			function( result ) {
				deepEqual( result.popupafteropen.timedOut, false, "popupafteropen event did arrive" );
				$( "#back-twice-test-popup-screen" ).click();
			},
			{
				popupafterclose: { src: popup, event: "popupafterclose" + eventNs + "3" },
				pagechange: { src: $( document ), event: "pagechange" + eventNs + "3" }
			},
			function( result ) {
				deepEqual( result.popupafterclose.timedOut, false, "popupafterclose event did arrive" );
				deepEqual( result.pagechange.timedOut, true, "pagechange event did not arrive" );
				deepEqual( $.mobile.activePage.attr( "id" ), "another-page", "Back to another page" );
				$.mobile.back();
			},
			{
				pagechange: { src: $( document ), event: "pagechange" + eventNs + "4" }
			},
			function( result ) {
				deepEqual( result.pagechange.timedOut, false, "pagechange event did arrive" );
				deepEqual( $.mobile.activePage.attr( "id" ), "start-page", "Back to start page" );
				start();
			}
		]);
	});

	asyncTest( "Popup opens and closes", function() {
		var $popup = $( "#test-popup" );
		expect( 9 );

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				opened: { src: $popup, event: "popupafteropen.opensandcloses" },
				navigate: { src: $(window), event: $.event.special.navigate.originalEventName + ".opensandcloses" }
			},

			function( result ) {
				var theOffset = $( "#test-popup p" ).offset();
				ok( !$popup.parent().prev().hasClass( "ui-screen-hidden" ), "Open popup screen is not hidden" );
				ok( $popup.attr( "class" ).match( /( |^)ui-body-[a-z]( |$)/ ), "Open popup has a valid overlay theme" );
				ok( theOffset.left >= 15 && theOffset.top >= 30, "Open popup top left coord is at least (10, 30)" );

				$popup.popup( "option", "overlayTheme", "a" );
				ok( $popup.parent().prev().hasClass( "ui-overlay-a" ), "Setting an overlay theme while the popup is open causes the theme to be applied and the screen to be faded in" );
				ok( $popup.parent().prev().hasClass( "in" ), "Setting an overlay theme while the popup is open causes the theme to be applied and the screen to be faded in" );
				ok( $popup.parent().hasClass( "ui-popup-active" ), "Open popup has the 'ui-popup-active' class" );

				$popup.popup( "close" );
			},

			{
				closed: { src: $popup, event: "popupafterclose.opensandcloses2" },
				navigate: { src: $(window), event: $.event.special.navigate.originalEventName + ".opensandcloses2" }
			},

			function( result) {
				ok( !$popup.parent().hasClass( "in" ), "Closed popup container does not have class 'in'" );
				ok( $popup.parent().prev().hasClass( "ui-screen-hidden" ), "Closed popup screen is hidden" );
				ok( !$popup.parent().hasClass( "ui-popup-active" ), "Open popup dos not have the 'ui-popup-active' class" );
			},

			{ timeout: { length: 500 } },
			start
		]);
	});


	asyncTest( "Link that launches popup is deactivated", function() {

		expect( 4 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "a#open-test-popup" ).click();
			},

			{
				opened: { src: $( "#test-popup" ), event: "popupafteropen.linkActiveTestStep1" },
				navigate: { src: $( window ), event: $.event.special.navigate.originalEventName + ".linkActive" },
				timeout: { length: 1000 }
			},

			function( result ) {
				ok( !result.opened.timedOut, "Opening a popup did cause 'opened' event" );
				ok( !$( "a#open-test-popup" ).closest( ".ui-btn" ).hasClass( "ui-btn-active" ), "Opening a popup removes active class from link that launched it" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "popupafterclose.linkActiveTestStep2" },
				navigate: { src: $( window ), event: $.event.special.navigate.originalEventName + ".linkActive2" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "Opening a popup did cause 'closed' event" );
				$( "a#open-xyzzy-popup" ).click();
			},

			{
				timeout: { length: 1000 }
			},

			function( result ) {
				ok( !$( "a#open-xyzzy-popup" ).closest( ".ui-btn" ).hasClass( "ui-btn-active" ), "Opening a non-existing popup removes active class from link that attempted to launch it" );
				$( "a#open-test-popup-li-link" ).click();
			},

			{
				opened: { src: $( "#test-popup" ), event: "popupafteropen.linkActiveTestStep4" },
				navigate: { src: $( window ), event: $.event.special.navigate.originalEventName + ".linkActive4" }
			},

			function() {
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "popupafterclose.linkActiveTestStep4" },
				navigate: { src: $( window ), event: $.event.special.navigate.originalEventName + ".linkActive4" },
				timeout: { length: 500 }
			},

			start
		]);
	});

	asyncTest( "Popup interacts correctly with hashchange", function() {
		var baseUrl, activeIndex, $popup = $( "#test-popup" );

		if( !$popup.data( "mobile-popup" ).options.history ) {
			expect( 1 );
			ok( true, "hash change disabled" );
			start();
			return;
		}

		expect( 5 );

		$.testHelper.detailedEventCascade([
			function() {
				baseUrl = decodeURIComponent( location.href );
				activeIndex = $.mobile.urlHistory.activeIndex;
				$popup.popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "popupafteropen.hashInteractStep1" },
				hashchange: { src: $( window ), event: "hashchange.hashInteractStep1" }
			},

			function( result ) {
				ok( !result.hashchange.timedOut, "Opening a popup from a non-dialogHashKey location causes a hashchange event" );
				equal( decodeURIComponent( location.href ), baseUrl + ( ( baseUrl.indexOf( "#" ) > -1 ) ? "" : "#" ) + $.mobile.dialogHashKey, "location.href has been updated correctly" );
				ok( $.mobile.urlHistory.activeIndex === activeIndex + 1, "$.mobile.urlHistory has been advanced correctly" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "popupafterclose.hashInteractStep2" }
			},

			function( result ) {
				ok( decodeURIComponent( location.href ) === baseUrl, "location.href has been restored after the popup" );
				ok( $.mobile.urlHistory.activeIndex === activeIndex, "$.mobile.urlHistory has been restored correctly" );
			},

			{ timeout: { length: 500 } },
			start
		]);
	});

	// This test assumes that the popup opens into a state that does not include dialogHashKey.
	// This should be the case if the previous test has cleaned up correctly.
	asyncTest( "Opening another page from the popup leaves no trace of the popup in history", function() {
		var initialActive = $.extend( {}, {}, $.mobile.urlHistory.getActive()),
			initialHRef = $.mobile.path.parseUrl( decodeURIComponent( location.href ) ),
			initialBase = initialHRef.protocol + initialHRef.doubleSlash + initialHRef.authority + initialHRef.directory,
			$popup = $( "#test-popup" );

		if( !$popup.data( "mobile-popup" ).options.history ) {
			expect( 1 )
			ok( true, "hash change disabled" );
			start();
			return;
		}

		expect( 6 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "popupafteropen.anotherPageStep1" },
				hashchange: { src: $( window ), event: "hashchange.anotherPageStep1" }
			},

			function() {
				$( "#test-popup a" ).click();
			},

			{
				closed: { src: $( "#test-popup" ), event: "popupafterclose.anotherPageStep2" },
				hashchange: { src: $( window ), event: "hashchange.anotherPageStep2" }
			},

			function( result ) {
				var hRef = $.mobile.path.parseUrl( decodeURIComponent( location.href ) );
				ok( !result.closed.timedOut, "Popup closed" );
				ok( !result.hashchange.timedOut, "hashchange did occur" );
				ok( decodeURIComponent( location.href ) === initialBase + hRef.filename, "New location is exactly the previous location (up to and including path) and the new filename" );
				window.history.back();
			},

			{
				hashchange: { src: $( window ), event: $.event.special.navigate.originalEventName + ".anotherPageStep3" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.anotherPageStep3" }
			},

			function( result ) {
				var active = $.mobile.urlHistory.getActive(),
						identical = true;

				$.each( initialActive, function( key, value ) {
					if ( active[key] !== value ) {
						identical = false;
						return false;
					}
				});

				if ( identical ) {
					$.each( active, function( key, value ) {
						if ( initialActive[key] !== value ) {
							identical = false;
							return false;
						}
					});
				}


				ok( decodeURIComponent( location.href ) === initialHRef.href, "Going back once places the browser on the initial page" );
				ok( identical, "Going back returns $.mobile.urlHistory to its initial value" );
				ok( $.mobile.urlHistory.activeIndex === $.mobile.urlHistory.stack.length - 3, "Going back leaves exactly two entries ahead in $.mobile.urlHistory" );
			},

			{ timeout: { length: 500 } },

			start
		]);
	});

	asyncTest( "Popup focused after open", function() {
		var $link = $( "#open-test-popup" ), $popup = $( "#test-popup" );

		expect( 3 );

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				focus: { src: $popup.parent(), event: "focus.popupFocusedAfterOpen1" },
				opened: { src: $popup, event: "popupafteropen.popupFocusedAfterOpen1" }
			},

			function( result ) {
				ok( !result.opened.timedOut, "popup emitted 'popupafteropen'" );
				ok( !result.focus.timedOut, "focus fired after the popup opens" );
				$popup.popup( "close" );
			},

			{
				closed: { src: $popup, event: "popupafterclose.popupFocusedAfterOpen2" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "popup emitted 'popupafterclose'" );
			},

			{ timeout: { length: 500 } },
			start
		]);
	});

	asyncTest( "Popup doesn't alter the url when the history option is disabled", function() {
		var $popup = $( "#test-history-popup" ), hash = $.mobile.path.parseLocation().hash;

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				opened: { src: $popup, event: "popupafteropen.popupDoesntAlertUrl1" }
			},

			function( result ) {
				equal( hash, $.mobile.path.parseLocation().hash, "the hash remains the same" );
				ok( $popup.is( ":visible" ), "popup is indeed visible" );
				$popup.popup( "close" );
			},

			{
				closed: { src: $popup, event: "popupafterclose.popupDoesntAlertUrl2" },
				timeout: { length: 1000 }
			},

			start
		]);
	});

	asyncTest( "Navigating away from the popup page closes the popup without history enabled", function() {
		var $popup = $( "#test-history-popup" );

		expect( 3 );

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				open: { src: $popup, event: "popupafteropen.historyOffTestStep1" }
			},

			function() {
				ok( $popup.is( ":visible" ), "popup is indeed visible" );
				$.mobile.changePage( "#no-popups" );
			},

			{
				hashchange: { src: $(window), event: "hashchange.historyOffTestStep2" },
				close: { src: $popup, event: "popupafterclose.historyOffTestStep2" }
			},

			function( result ){
				ok( !result.close.timedOut, "close happened" );
				ok( !result.close.timedOut, "hashchange happened" );

				// TODO make sure that the afterclose is fired after the nav finishes
			},

			{ timeout: { length: 500 } },
			start
		]);
	});

	// TODO would be nice to avoid checking the internal representation
	//      of "openness" but :visible didn't seem to be working in this case
	//      (offscreen?)
	asyncTest( "Close links work on a history disabled popup", function() {
		var $popup = $( "#test-history-popup" );

		expect( 3 );

		ok( !$popup.data( "mobile-popup" )._isOpen, "popup is initially closed" );

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				opened: { src: $popup, event: "popupafteropen.closeLinksWorks1" }
			},

			function() {
				ok( $popup.data( "mobile-popup" )._isOpen, "popup is opened with open method" );
				$popup.find( "a" ).click();
			},

			{
				closed: { src: $popup, event: "popupafterclose.closeLinksWorks2" }
			},

			function() {
				ok( !$popup.data( "mobile-popup" )._isOpen, "popup is closed on link click" );
			},

			{ timeout: { length: 500 } },
			start
		]);
	});

	asyncTest( "Destroy closes open popup first", function() {
		var $popup = $( "#test-destroy-popup" );

		expect( 1 );

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				opened: { src: $popup, event: "popupafteropen.destroyClosesOpenPopupFirst1" }
			},

			function() {
				$popup.popup( "destroy" );
			},

			{
				closed: { src: $popup, event: "popupafterclose.destroyClosesOpenPopupFirst2" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "closed on destroy" );
			},

			{ timeout: { length: 500 } },
			start
		]);
	});

	asyncTest( "Cannot close a non-dismissible popup by clicking on the screen", function() {
		var $popup = $( "#test-popup-dismissible" ), eventNs = ".cannotCloseNonDismissiblePopup";

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				popupafteropen: { src: $popup, event: "popupafteropen" + eventNs + "0" }
			},

			function( results ) {
				ok( !results.popupafteropen.timedOut, "The popup has emitted a 'popupafteropen' event" );
				// Click on popup screen
				$popup.parent().prev().click();
			},

			{
				popupafterclose: { src: $popup, event: "popupafterclose" + eventNs + "1" }
			},

			function( results ) {
				ok( results.popupafterclose.timedOut, "The popup has not emitted a 'popupafterclose' event" );
				$.mobile.back();
			},

			{
				popupafterclose: { src: $popup, event: "popupafterclose" + eventNs + "2" }
			},

			function( results ) {
				ok( !results.popupafterclose.timedOut, "The popup has emitted a 'popupafterclose' event" );
				start();
			}
		]);
	});

	asyncTest( "Elements inside the popup lose focus when the popup is closed", function() {

		expect( 5 );

		var $popup = $( "#popupLogin" ),
			$popupContainer = $( "#popupLogin-popup" ),
			$textBox = $( "#textBox" ),
			eventSuffix = ".ElementsInsideThePopupLoseFocus";

		$.testHelper.detailedEventCascade( [
			function() {
				$popup.popup( "open" );
			},
			{
				popupafteropen: { src: $popup, event: "popupafteropen" + eventSuffix + "1" }
			},
			function( result ) {
				deepEqual( result.popupafteropen.timedOut, false, "Popup did open" );
				$textBox.focus();
			},
			{
				focusevent: { src: $textBox, event: "focus" + eventSuffix + "2" }
			},
			function( result ) {
				deepEqual( result.focusevent.timedOut, false, "Text box did experience focus event" );
				$popup.popup( "close" );
			},
			{
				popupafterclose: { src: $popup, event: "popupafterclose" + eventSuffix + "3" }
			},
			function( result ) {
				deepEqual( result.popupafterclose.timedOut, false, "Popup did close" );
				deepEqual( $popupContainer.is( ":focus" ), false, "The popup container is not focused" );
				deepEqual( $popupContainer.find( ":focus" ).length, 0, "The popup container contains no focused elements" );
				start();
			}
		]);
	});
})( jQuery );
