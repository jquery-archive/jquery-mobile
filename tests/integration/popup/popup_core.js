/*
 * mobile popup unit tests
 */
( function( $ ) {

var urlObject = $.mobile.path.parseLocation(),
	home = urlObject.pathname + urlObject.search,
	originalAnimationComplete = $.fn.animationComplete,
	animationCompleteCallCount = 0,
	opensAndCloses = function( eventNs, popupId, linkSelector, contentSelector ) {
		var popup = $( "#" + popupId ),
			link = $( linkSelector )[ 0 ];

		expect( 17 );

		$.testHelper.detailedEventCascade( [
			function() {
				deepEqual( popup.parent()[ 0 ].hasAttribute( "tabindex" ), false,
					"Popup container does not have attribute tabindex" );
				deepEqual( link.getAttribute( "aria-haspopup" ), "true", popupId + ": 'aria-haspopup' attribute is set to true on link that opens the popup" );
				deepEqual( link.getAttribute( "aria-owns" ), popupId, popupId + ": 'aria-owns' attribute is set to the ID of the owned popup ('test-popup')" );
				deepEqual( link.getAttribute( "aria-expanded" ), "false", popupId + ": 'aria-expanded' attribute is set to false when the popup is not open" );
				popup.popup( "open" );
			},

			{
				opened: { src: popup, event: "popupafteropen" + eventNs },
				navigate: { src: $( window ), event: $.event.special.navigate.originalEventName + eventNs }
			},

			function( result ) {
				deepEqual( link.getAttribute( "aria-expanded" ), "true", popupId + ": 'aria-expanded' attribute is set to true when the popup is open" );
				ok( !popup.parent().prev().hasClass( "ui-screen-hidden" ),
					popupId + ": Open popup screen is not hidden" );
				ok( popup.attr( "class" ).match( /( |^)ui-body-([a-z]|inherit)( |$)/ ),
					popupId + ": Open popup has a valid theme" );

				popup.popup( "option", "overlayTheme", "a" );
				ok( popup.parent().prev().hasClass( "ui-overlay-a" ),
					popupId + ": Setting an overlay theme while the popup is open causes " +
					"the theme to be applied and the screen to be faded in" );
				ok( popup.parent().prev().hasClass( "in" ),
					popupId + ": Setting an overlay theme while the popup is open causes " +
					"the theme to be applied and the screen to be faded in" );
				ok( popup.parent().hasClass( "ui-popup-active" ),
					popupId + ": Open popup has the 'ui-popup-active' class" );

				deepEqual( popup.parent().attr( "tabindex" ), "0",
					"Popup container has attribute tabindex" );

				animationCompleteCallCount = 0;
				$.mobile.back();
			},

			{
				closed: { src: popup, event: "popupafterclose" + eventNs + "2" },
				navigate: { src: $( window ), event: $.event.special.navigate.originalEventName + eventNs + "2" }
			},

			function( result ) {
				deepEqual( animationCompleteCallCount, 1, "animationComplete called only once" );
				deepEqual( link.getAttribute( "aria-expanded" ), "false", "'aria-expanded' attribute is set to false when the popup is not open" );
				ok( !popup.parent().hasClass( "in" ),
					"Closed popup container does not have class 'in'" );
				ok( popup.parent().prev().hasClass( "ui-screen-hidden" ),
					"Closed popup screen is hidden" );
				ok( !popup.parent().hasClass( "ui-popup-active" ),
					"Open popup dos not have the 'ui-popup-active' class" );
				deepEqual( popup.parent()[ 0 ].hasAttribute( "tabindex" ), false,
					"Popup container does not have attribute tabindex" );
			},

			{ timeout: { length: 500 } },
			start
		] );
	};

module( "popup", {
	setup: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
		$.testHelper.navReset( home );
		$.fn.animationComplete = $.extend( function() {
			animationCompleteCallCount++;
			return originalAnimationComplete.apply( this, arguments );
		}, $.fn.animationComplete );
	},
	teardown: function() {
		$.fn.animationComplete = originalAnimationComplete;
	}
} );

asyncTest( "Popup emits popupafterclose exactly once", function() {
	var eventNs = ".doubleClose",
		popup = $( "#double-close" ),
		link = $( "#open-double-close" );

	expect( 2 );

	$.testHelper.detailedEventCascade( [
		function() {
			link.click();
		},

		{
			popupafteropen: { src: popup, event: "popupafteropen" + eventNs + "1" }
		},

		function() {
			var outerTimeout = setTimeout( function() {
				ok( false, "The popup did not emit a single 'popupafterclose' event." );
				start();
			}, 5000 );

			popup.one( "popupafterclose" + eventNs + "2", function() {
				var timeoutId = setTimeout( function() {
					ok( true, "Waiting for a second 'popupafterclose' event has timed out." );
					start();
				}, 5000 );
				clearTimeout( outerTimeout );
				ok( true, "The popup emitted a 'popupafterclose' event" );
				popup.one( "popupafterclose" + eventNs + "3", function() {
					ok( false, "The popup emitted a second 'popupafterclose' event" );
					clearTimeout( timeoutId );
					start();
				} );
			} );

			$( "#double-close-screen" ).click();
		}
	] );
} );

asyncTest( "Popup does not go back in history twice when opening on separate page", function() {
	var eventNs = ".backTwice",
		popup = function() {
			return $( "#back-twice-test-popup" );
		};
	$.testHelper.detailedEventCascade( [
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
	] );
} );

asyncTest( "Popup opens and closes", function() {
	opensAndCloses( ".opensandcloses", "test-popup", "a#open-test-popup", "#test-popup p" );
} );

asyncTest( "Already-enhanced popup opens and closes", function() {
	opensAndCloses( ".alreadyenhancedopensandcloses", "already-enhanced", "a#open-already-enhanced", "#already-enhanced p" );
} );

asyncTest( "Link that launches popup is deactivated", function() {

	expect( 4 );

	$.testHelper.detailedEventCascade( [
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
			ok( !$( "a#open-test-popup" ).closest( ".ui-button" ).hasClass( "ui-button-active" ), "Opening a popup removes active class from link that launched it" );
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
			ok( !$( "a#open-xyzzy-popup" ).closest( ".ui-button" ).hasClass( "ui-button-active" ), "Opening a non-existing popup removes active class from link that attempted to launch it" );
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
	] );
} );

asyncTest( "Popup interacts correctly with hashchange", function() {
	var baseUrl, activeIndex,
		$popup = $( "#test-popup" );

	if ( !$popup.data( "mobile-popup" ).options.history ) {
		expect( 1 );
		ok( true, "hash change disabled" );
		start();
		return;
	}

	expect( 5 );

	$.testHelper.detailedEventCascade( [
		function() {
			baseUrl = decodeURIComponent( location.href );
			activeIndex = $.mobile.navigate.history.activeIndex;
			$popup.popup( "open" );
		},

		{
			opened: { src: $( "#test-popup" ), event: "popupafteropen.hashInteractStep1" },
			hashchange: { src: $( window ), event: "hashchange.hashInteractStep1" }
		},

		function( result ) {
			ok( !result.hashchange.timedOut, "Opening a popup from a non-dialogHashKey location causes a hashchange event" );
			equal( decodeURIComponent( location.href ), baseUrl + ( ( baseUrl.indexOf( "#" ) > -1 ) ? "" : "#" ) + $.mobile.dialogHashKey, "location.href has been updated correctly" );
			ok( $.mobile.navigate.history.activeIndex === activeIndex + 1, "$.mobile.navigate.history has been advanced correctly" );
			$( "#test-popup" ).popup( "close" );
		},

		{
			closed: { src: $( "#test-popup" ), event: "popupafterclose.hashInteractStep2" }
		},

		function( result ) {
			ok( decodeURIComponent( location.href ) === baseUrl, "location.href has been restored after the popup" );
			ok( $.mobile.navigate.history.activeIndex === activeIndex, "$.mobile.navigate.history has been restored correctly" );
		},

		{ timeout: { length: 500 } },
		start
	] );
} );

// This test assumes that the popup opens into a state that does not include dialogHashKey.
// This should be the case if the previous test has cleaned up correctly.
asyncTest( "Opening another page from the popup leaves no trace of the popup in history", function() {
	var initialActive = $.extend( {}, {}, $.mobile.navigate.history.getActive() ),
		initialHRef = $.mobile.path.parseUrl( decodeURIComponent( location.href ) ),
		initialBase = initialHRef.protocol + initialHRef.doubleSlash + initialHRef.authority + initialHRef.directory,
		$popup = $( "#test-popup" );

	if ( !$popup.data( "mobile-popup" ).options.history ) {
		expect( 1 )
		ok( true, "hash change disabled" );
		start();
		return;
	}

	expect( 6 );

	$.testHelper.detailedEventCascade( [
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
			var active = $.mobile.navigate.history.getActive(),
				identical = true;

			$.each( initialActive, function( key, value ) {
				if ( active[ key ] !== value ) {
					identical = false;
					return false;
				}
			} );

			if ( identical ) {
				$.each( active, function( key, value ) {
					if ( initialActive[ key ] !== value ) {
						identical = false;
						return false;
					}
				} );
			}


			ok( decodeURIComponent( location.href ) === initialHRef.href, "Going back once places the browser on the initial page" );
			ok( identical, "Going back returns $.mobile.navigate.history to its initial value" );
			ok( $.mobile.navigate.history.activeIndex === $.mobile.navigate.history.stack.length - 3, "Going back leaves exactly two entries ahead in $.mobile.navigate.history" );
		},

		{ timeout: { length: 500 } },

		start
	] );
} );

// The test below adds an input, gives it focus, then opens the popup,
// and makes sure the input has been blurred.
asyncTest( "Popup assures previous element is blurred", function() {
	var link = $( "#open-test-popup" ),
		popup = $( "#test-popup" ),
		textinput = $( "#test-input" );

	expect( 7 );

	$.testHelper.detailedEventCascade( [
		function() {

			// First focus on the text input
			textinput.focus();
		},

		{
			focus: { src: textinput, event: "focus.popupFocusedAfterOpen0" }
		},

		function( result ) {
			deepEqual( document.activeElement, textinput[ 0 ],
				"Textinput focused before popup is opened" );
			deepEqual( result.focus.timedOut, false );
			popup.popup( "open" );
		},

		{
			blur: { src: textinput, event: "blur.popupFocusedAfterOpen1" },
			opened: { src: popup, event: "popupafteropen.popupFocusedAfterOpen1" }
		},

		function( result ) {
			ok( !result.opened.timedOut, "popup emitted 'popupafteropen'" );
			deepEqual( result.blur.timedOut, false, "The blur event is fired after the popup opens" );

			// Try to focus on the textinput again
			textinput.focus();
		},

		{
			focus: { src: textinput, event: "focus.popupFocusedAfterOpen2" }
		},

		function( result ) {
			deepEqual( result.focus.timedOut, false, "Focus event received" );
			deepEqual( document.activeElement === textinput[ 0 ], false,
				"An input outside the popup does not receive focus while the popup is open" );
			popup.popup( "close" );
		},

		{
			closed: { src: popup, event: "popupafterclose.popupFocusedAfterOpen2" }
		},

		function( result ) {
			ok( !result.closed.timedOut, "popup emitted 'popupafterclose'" );
		},

		{ timeout: { length: 500 } },
		start
	] );
} );

asyncTest( "Popup doesn't alter the url when the history option is disabled", function() {
	var $popup = $( "#test-history-popup" ),
		hash = $.mobile.path.parseLocation().hash;

	$.testHelper.detailedEventCascade( [
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
	] );
} );

asyncTest( "Navigating away from the popup page closes the popup without history enabled", function() {
	var $popup = $( "#test-history-popup" );

	expect( 3 );

	$.testHelper.detailedEventCascade( [
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
			hashchange: { src: $( window ), event: "hashchange.historyOffTestStep2" },
			close: { src: $popup, event: "popupafterclose.historyOffTestStep2" }
		},

		function( result ) {
			ok( !result.close.timedOut, "close happened" );
			ok( !result.close.timedOut, "hashchange happened" );

			// TODO make sure that the afterclose is fired after the nav finishes
		},

		{ timeout: { length: 500 } },
		start
	] );
} );

// TODO would be nice to avoid checking the internal representation
//      of "openness" but :visible didn't seem to be working in this case
//      (offscreen?)
asyncTest( "Close links work on a history disabled popup", function() {
	var $popup = $( "#test-history-popup" );

	expect( 3 );

	ok( !$popup.data( "mobile-popup" )._isOpen, "popup is initially closed" );

	$.testHelper.detailedEventCascade( [
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
	] );
} );

asyncTest( "Destroy closes open popup first", function() {
	var $popup = $( "#test-destroy-popup" );

	expect( 1 );

	$.testHelper.detailedEventCascade( [
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
	] );
} );

asyncTest( "Cannot close a non-dismissible popup by clicking on the screen", function() {
	var $popup = $( "#test-popup-dismissible" ),
		eventNs = ".cannotCloseNonDismissiblePopup";

	$.testHelper.detailedEventCascade( [
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
	] );
} );

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
	] );
} );

asyncTest( "A popup is closed when it becomes disabled, and cannot be opened while it is disabled", function() {
	var $popup = $( "#disabled-popup" ),
		$link = $( "a#open-disabled-popup" ),
		eventNs = ".apopupisclosedwhendisabled";

	expect( 3 );

	$.testHelper.detailedEventCascade( [
		function() {
			$link.click();
		},

		{
			popupafteropen: { src: $popup, event: "popupafteropen" + eventNs + "1" }
		},

		function( result ) {
			deepEqual( result.popupafteropen.timedOut, false, "Received 'popupafteropen' event" );
			$popup.popup( "disable" );
		},

		{
			popupafterclose: { src: $popup, event: "popupafterclose" + eventNs + "2" }
		},

		function( result ) {
			deepEqual( result.popupafterclose.timedOut, false, "Received 'popupafterclose' event after calling disable()" );
			$link.click();
		},

		{
			popupafteropen: { src: $popup, event: "popupafteropen" + eventNs + "3" }
		},

		function( result ) {
			deepEqual( result.popupafteropen.timedOut, true, "Did not receive 'popupafteropen' when opening a disabled popup" );
			start();
		}
	] );
} );
} )( jQuery );
