/*
 * Mobile popup unit tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

var urlObject = $.mobile.path.parseLocation(),
	home = urlObject.pathname + urlObject.search,
	originalAnimationComplete = $.fn.animationComplete,
	animationCompleteCallCount = 0,
	opensAndCloses = function( assert, eventNs, popupId, linkSelector ) {
		var popup = $( "#" + popupId ),
			link = $( linkSelector )[ 0 ];
		var ready = assert.async();

		assert.expect( 17 );

		$.testHelper.detailedEventCascade( [
			function() {
				assert.strictEqual( popup.parent()[ 0 ].hasAttribute( "tabindex" ), false,
					"Popup container does not have attribute tabindex" );
				assert.strictEqual( link.getAttribute( "aria-haspopup" ), "true",
					popupId + ": 'aria-haspopup' is set to true on link that opens the popup" );
				assert.strictEqual( link.getAttribute( "aria-owns" ), popupId,
					popupId + ": 'aria-owns' is set to the ID of the owned popup ('test-popup')" );
				assert.strictEqual( link.getAttribute( "aria-expanded" ), "false",
					popupId + ": 'aria-expanded' is set to false when the popup is not open" );
				popup.popup( "open" );
			},

			{
				opened: {
					src: popup,
					event: "popupafteropen" + eventNs
				},
				navigate: {
					src: $( window ),
					event: $.event.special.navigate.originalEventName + eventNs
				}
			},

			function() {
				assert.strictEqual( link.getAttribute( "aria-expanded" ), "true",
					popupId + ": 'aria-expanded' is set to true when the popup is open" );
				assert.lacksClasses( popup.parent().prev(), "ui-screen-hidden",
					popupId + ": Open popup screen is not hidden" );
				assert.hasClassRegex( popup[ 0 ], /( |^)ui-body-([a-z]|inherit)( |$)/,
					popupId + ": Open popup has a valid theme" );

				popup.popup( "option", "overlayTheme", "a" );
				assert.hasClasses( popup.parent().prev(), "ui-overlay-a",
					popupId + ": Setting an overlay theme while the popup is open causes " +
					"the theme to be applied and the screen to be faded in" );
				assert.hasClasses( popup.parent().prev(), "in",
					popupId + ": Setting an " + "overlay theme while the popup is open " +
					"causes the theme to be applied and the screen to be faded in" );
				assert.hasClasses( popup.parent(), "ui-popup-active",
					popupId + ": Open popup has the 'ui-popup-active' class" );

				assert.strictEqual( popup.parent().attr( "tabindex" ), "0",
					"Popup container has attribute tabindex" );

				animationCompleteCallCount = 0;
				$.mobile.back();
			},

			{
				closed: {
					src: popup,
					event: "popupafterclose" + eventNs + "2"
				},
				navigate: {
					src: $( window ),
					event: $.event.special.navigate.originalEventName + eventNs + "2"
				}
			},

			function() {
				assert.strictEqual( animationCompleteCallCount, 1,
					"animationComplete called only once" );
				assert.strictEqual( link.getAttribute( "aria-expanded" ), "false",
					"'aria-expanded' attribute is set to false when the popup is not open" );
				assert.lacksClasses( popup.parent(), "in",
					"Closed popup container does not have class 'in'" );
				assert.hasClasses( popup.parent().prev(), "ui-screen-hidden",
					"Closed popup screen is hidden" );
				assert.lacksClasses( popup.parent(), "ui-popup-active",
					"Open popup does not have the 'ui-popup-active' class" );
				assert.strictEqual( popup.parent()[ 0 ].hasAttribute( "tabindex" ), false,
					"Popup container does not have attribute tabindex" );
			},

			{ timeout: { length: 500 } },
			ready
		] );
	};

QUnit.module( "popup", {
	beforeEach: function() {
		$.mobile.navigate.history.stack = [];
		$.mobile.navigate.history.activeIndex = 0;
		$.testHelper.navReset( home );
		$.fn.animationComplete = $.extend( function() {
			animationCompleteCallCount++;
			return originalAnimationComplete.apply( this, arguments );
		}, $.fn.animationComplete );
	},
	afterEach: function() {
		$.fn.animationComplete = originalAnimationComplete;
	}
} );

QUnit.test( "Popup emits popupafterclose exactly once", function( assert ) {
	var ready = assert.async();
	var eventNs = ".doubleClose",
		popup = $( "#double-close" ),
		link = $( "#open-double-close" );

	assert.expect( 2 );

	$.testHelper.detailedEventCascade( [
		function() {
			link.click();
		},

		{
			popupafteropen: { src: popup, event: "popupafteropen" + eventNs + "1" }
		},

		function() {
			var outerTimeout = setTimeout( function() {
				assert.ok( false,
					"The popup did not emit a single 'popupafterclose' event." );
				ready();
			}, 5000 );

			popup.one( "popupafterclose" + eventNs + "2", function() {
				var timeoutId = setTimeout( function() {
					assert.ok( true,
						"Waiting for a second 'popupafterclose' event has timed out." );
					ready();
				}, 5000 );
				clearTimeout( outerTimeout );
				assert.ok( true, "The popup emitted a 'popupafterclose' event" );
				popup.one( "popupafterclose" + eventNs + "3", function() {
					assert.ok( false, "The popup emitted a second 'popupafterclose' event" );
					clearTimeout( timeoutId );
					ready();
				} );
			} );

			$( "#double-close-screen" ).click();
		}
	] );
} );

QUnit.test( "Popup does not go back in history twice when opening on separate page",
	function( assert ) {
	var ready = assert.async();
	var eventNs = ".backTwice",
		popup = function() {
			return $( "#back-twice-test-popup" );
		};
	$.testHelper.detailedEventCascade( [
		function() {
			$( "#go-to-another-page" ).click();
		},
		{
			pagechange: { src: $( ".ui-pagecontainer" ), event: "pagechange" + eventNs + "1" }
		},
		function() {
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "another-page",
				"Reached another page" );
			$( "#open-back-twice-test-popup" ).click();
		},
		{
			popupafteropen: { src: popup, event: "popupafteropen" + eventNs + "2" }
		},
		function( result ) {
			assert.strictEqual( result.popupafteropen.timedOut, false,
				"popupafteropen event did arrive" );
			$( "#back-twice-test-popup-screen" ).click();
		},
		{
			popupafterclose: { src: popup, event: "popupafterclose" + eventNs + "3" },
			pagechange: { src: $( document ), event: "pagechange" + eventNs + "3" }
		},
		function( result ) {
			assert.strictEqual( result.popupafterclose.timedOut, false,
				"popupafterclose event did arrive" );
			assert.strictEqual( result.pagechange.timedOut, true,
				"pagechange event did not arrive" );
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "another-page",
				"Back to another page" );
			$.mobile.back();
		},
		{
			pagechange: { src: $( document ), event: "pagechange" + eventNs + "4" }
		},
		function( result ) {
			assert.strictEqual( result.pagechange.timedOut, false,
				"pagechange event did arrive" );
			assert.strictEqual( $.mobile.activePage.attr( "id" ), "start-page",
				"Back to start page" );
			ready();
		}
	] );
} );

QUnit.test( "Popup opens and closes", function( assert ) {
	opensAndCloses( assert, ".opensandcloses", "test-popup", "a#open-test-popup",
		"#test-popup p" );
} );

QUnit.test( "Already-enhanced popup opens and closes", function( assert ) {
	opensAndCloses( assert, ".alreadyenhancedopensandcloses", "already-enhanced",
		"a#open-already-enhanced", "#already-enhanced p" );
} );

QUnit.test( "Link that launches popup is deactivated", function( assert ) {
	var ready = assert.async();

	assert.expect( 5 );

	$.testHelper.detailedEventCascade( [
		function() {
			$( "a#open-test-popup" ).click();
			assert.hasClasses( $( "a#open-test-popup" ).closest( ".ui-button" ),
				"ui-button-active",
				"Active class added in response to click" );
		},

		{
			opened: {
				src: $( "#test-popup" ),
				event: "popupafteropen.linkActiveTestStep1"
			},
			navigate: {
				src: $( window ),
				event: $.event.special.navigate.originalEventName + ".linkActive"
			},
			timeout: { length: 1000 }
		},

		function( result ) {
			assert.ok( !result.opened.timedOut, "Opening a popup did cause 'opened' event" );
			assert.lacksClasses( $( "a#open-test-popup" ).closest( ".ui-button" ),
				"ui-button-active",
				"Opening a popup removes active class from link that launched it" );
			$( "#test-popup" ).popup( "close" );
		},

		{
			closed: {
				src: $( "#test-popup" ),
				event: "popupafterclose.linkActiveTestStep2"
			},
			navigate: {
				src: $( window ),
				event: $.event.special.navigate.originalEventName + ".linkActive2"
			}
		},

		function( result ) {
			assert.ok( !result.closed.timedOut, "Opening a popup did cause 'closed' event" );
			$( "a#open-xyzzy-popup" ).click();
		},

		{
			timeout: { length: 1000 }
		},

		function() {
			assert.lacksClasses( $( "a#open-xyzzy-popup" ).closest( ".ui-button" ),
				"ui-button-active",
				"Opening a non-existing popup removes active class from link that attempted " +
				"to launch it" );
			$( "a#open-test-popup-li-link" ).click();
		},

		{
			opened: {
				src: $( "#test-popup" ),
				event: "popupafteropen.linkActiveTestStep4"
			},
			navigate: {
				src: $( window ),
				event: $.event.special.navigate.originalEventName + ".linkActive4"
			}
		},

		function() {
			$( "#test-popup" ).popup( "close" );
		},

		{
			closed: {
				src: $( "#test-popup" ),
				event: "popupafterclose.linkActiveTestStep4"
			},
			navigate: {
				src: $( window ),
				event: $.event.special.navigate.originalEventName + ".linkActive4"
			},
			timeout: { length: 500 }
		},

		ready
	] );
} );

QUnit.test( "Popup interacts correctly with hashchange", function( assert ) {
	var ready = assert.async();
	var baseUrl, activeIndex,
		$popup = $( "#test-popup" );

	if ( !$popup.data( "mobile-popup" ).options.history ) {
		assert.expect( 1 );
		assert.ok( true, "hash change disabled" );
		ready();
		return;
	}

	assert.expect( 5 );

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
			assert.ok( !result.hashchange.timedOut,
				"Opening a popup from a non-dialogHashKey location causes a hashchange event" );
			assert.equal( decodeURIComponent( location.href ),
				baseUrl + ( ( baseUrl.indexOf( "#" ) > -1 ) ? "" : "#" ) + $.mobile.dialogHashKey,
				"location.href has been updated correctly" );
			assert.ok( $.mobile.navigate.history.activeIndex === activeIndex + 1,
				"$.mobile.navigate.history has been advanced correctly" );
			$( "#test-popup" ).popup( "close" );
		},

		{
			closed: { src: $( "#test-popup" ), event: "popupafterclose.hashInteractStep2" }
		},

		function() {
			assert.ok( decodeURIComponent( location.href ) === baseUrl,
				"location.href has been restored after the popup" );
			assert.ok( $.mobile.navigate.history.activeIndex === activeIndex,
				"$.mobile.navigate.history has been restored correctly" );
		},

		{ timeout: { length: 500 } },
		ready
	] );
} );

// This test assumes that the popup opens into a state that does not include dialogHashKey.
// This should be the case if the previous test has cleaned up correctly.
QUnit.test( "Opening another page from the popup leaves no trace of the popup in history",
	function( assert ) {
		var ready = assert.async();
		var initialActive = $.extend( {}, {}, $.mobile.navigate.history.getActive() ),
			initialHRef = $.mobile.path.parseUrl( decodeURIComponent( location.href ) ),
			initialBase = initialHRef.protocol + initialHRef.doubleSlash + initialHRef.authority +
				initialHRef.directory,
			$popup = $( "#test-popup" );

		if ( !$popup.data( "mobile-popup" ).options.history ) {
			assert.expect( 1 );
			assert.ok( true, "hash change disabled" );
			ready();
			return;
		}

		assert.expect( 6 );

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
				assert.ok( !result.closed.timedOut, "Popup closed" );
				assert.ok( !result.hashchange.timedOut, "hashchange did occur" );
				assert.ok( decodeURIComponent( location.href ) === initialBase + hRef.filename,
					"New location is exactly the previous location (up to and including path) " +
					"and the new filename" );
				window.history.back();
			},

			{
				hashchange: {
					src: $( window ),
					event: $.event.special.navigate.originalEventName + ".anotherPageStep3"
				},
				pagechange: {
					src: $( ".ui-pagecontainer" ),
					event: "pagechange.anotherPageStep3"
				}
			},

			function() {
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

				assert.ok( decodeURIComponent( location.href ) === initialHRef.href,
					"Going back once places the browser on the initial page" );
				assert.ok( identical,
					"Going back returns $.mobile.navigate.history to its initial value" );
				assert.ok( $.mobile.navigate.history.activeIndex ===
						$.mobile.navigate.history.stack.length - 3,
					"Going back leaves exactly two entries ahead in $.mobile.navigate.history" );
			},

			{ timeout: { length: 500 } },

			ready
		] );
	} );

// The test below adds an input, gives it focus, then opens the popup,
// and makes sure the input has been blurred.
QUnit.asyncTest( "Popup assures previous element is blurred", function( assert ) {
	var popup = $( "#test-popup" ),
		textinput = $( "#test-input" );

	assert.expect( 7 );

	$.testHelper.detailedEventCascade( [
		function() {

			// First focus on the text input
			textinput.focus();
		},

		{
			focus: { src: textinput, event: "focus.popupFocusedAfterOpen0" }
		},

		function( result ) {
			assert.deepEqual( document.activeElement, textinput[ 0 ],
				"Textinput focused before popup is opened" );
			assert.strictEqual( result.focus.timedOut, false );
			popup.popup( "open" );
		},

		{
			blur: { src: textinput, event: "blur.popupFocusedAfterOpen1" },
			opened: { src: popup, event: "popupafteropen.popupFocusedAfterOpen1" }
		},

		function( result ) {
			assert.ok( !result.opened.timedOut, "popup emitted 'popupafteropen'" );
			assert.strictEqual( result.blur.timedOut, false,
				"The blur event is fired after the popup opens" );

			// Try to focus on the textinput again
			textinput.focus();
		},

		{
			focus: { src: popup.find( "a" ).first(), event: "focus.popupFocusedAfterOpen2" }
		},

		function( result ) {
			assert.strictEqual( result.focus.timedOut, false, "Focus event received" );
			assert.strictEqual( document.activeElement === textinput[ 0 ], false,
				"An input outside the popup does not receive focus while the popup is open" );
			popup.popup( "close" );
		},

		{
			closed: { src: popup, event: "popupafterclose.popupFocusedAfterOpen2" }
		},

		function( result ) {
			assert.ok( !result.closed.timedOut, "popup emitted 'popupafterclose'" );
		},

		{ timeout: { length: 500 } },
		QUnit.start
	] );
} );

QUnit.asyncTest( "Popup doesn't alter the url when the history option is disabled",
	function( assert ) {
	var $popup = $( "#test-history-popup" ),
		hash = $.mobile.path.parseLocation().hash;

	$.testHelper.detailedEventCascade( [
		function() {
			$popup.popup( "open" );
		},

		{
			opened: { src: $popup, event: "popupafteropen.popupDoesntAlertUrl1" }
		},

		function() {
			assert.equal( hash, $.mobile.path.parseLocation().hash, "the hash remains the same" );
			assert.ok( $popup.is( ":visible" ), "popup is indeed visible" );
			$popup.popup( "close" );
		},

		{
			closed: { src: $popup, event: "popupafterclose.popupDoesntAlertUrl2" },
			timeout: { length: 1000 }
		},

		QUnit.start
	] );
} );

QUnit.test( "Navigating away from the popup page closes the no-history popup", function( assert ) {
	var $popup = $( "#test-history-popup" );
	var ready = assert.async();

	assert.expect( 3 );

	$.testHelper.detailedEventCascade( [
		function() {
			$popup.popup( "open" );
		},

		{
			open: { src: $popup, event: "popupafteropen.historyOffTestStep1" }
		},

		function() {
			assert.ok( $popup.is( ":visible" ), "popup is indeed visible" );
			$( ".ui-pagecontainer" ).pagecontainer( "change", "#no-popups" );
		},

		{
			hashchange: { src: $( window ), event: "hashchange.historyOffTestStep2" },
			close: { src: $popup, event: "popupafterclose.historyOffTestStep2" }
		},

		function( result ) {
			assert.ok( !result.close.timedOut, "close happened" );
			assert.ok( !result.close.timedOut, "hashchange happened" );

			// TODO make sure that the afterclose is fired after the nav finishes
		},

		{ timeout: { length: 500 } },
		ready
	] );
} );

// TODO would be nice to avoid checking the internal representation
//	  of "openness" but :visible didn't seem to be working in this case
//	  (offscreen?)
QUnit.test( "Close links work on a history disabled popup", function( assert ) {
	var $popup = $( "#test-history-popup" );
	var ready = assert.async();

	assert.expect( 3 );

	assert.ok( !$popup.data( "mobile-popup" )._isOpen, "popup is initially closed" );

	$.testHelper.detailedEventCascade( [
		function() {
			$popup.popup( "open" );
		},

		{
			opened: { src: $popup, event: "popupafteropen.closeLinksWorks1" }
		},

		function() {
			assert.ok( $popup.data( "mobile-popup" )._isOpen, "popup is opened with open method" );
			$popup.find( "a" ).click();
		},

		{
			closed: { src: $popup, event: "popupafterclose.closeLinksWorks2" }
		},

		function() {
			assert.ok( !$popup.data( "mobile-popup" )._isOpen, "popup is closed on link click" );
		},

		{ timeout: { length: 500 } },
		ready
	] );
} );

QUnit.test( "Destroy closes open popup first", function( assert ) {
	var $popup = $( "#test-destroy-popup" );
	var ready = assert.async();

	assert.expect( 1 );

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
			assert.ok( !result.closed.timedOut, "closed on destroy" );
		},

		{ timeout: { length: 500 } },
		ready
	] );
} );

QUnit.test( "Cannot close a non-dismissible popup by clicking on the screen", function( assert ) {
	var ready = assert.async();
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
			assert.ok( !results.popupafteropen.timedOut,
				"The popup has emitted a 'popupafteropen' event" );

			// Click on popup screen
			$popup.parent().prev().click();
		},

		{
			popupafterclose: { src: $popup, event: "popupafterclose" + eventNs + "1" }
		},

		function( results ) {
			assert.ok( results.popupafterclose.timedOut,
				"The popup has not emitted a 'popupafterclose' event" );
			$.mobile.back();
		},

		{
			popupafterclose: { src: $popup, event: "popupafterclose" + eventNs + "2" }
		},

		function( results ) {
			assert.ok( !results.popupafterclose.timedOut,
				"The popup has emitted a 'popupafterclose' event" );
			ready();
		}
	] );
} );

QUnit.test( "Elements inside the popup lose focus when the popup is closed", function( assert ) {
	var ready = assert.async();

	assert.expect( 5 );

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
			assert.strictEqual( result.popupafteropen.timedOut, false, "Popup did open" );
			$textBox.focus();
		},
		{
			focusevent: { src: $textBox, event: "focus" + eventSuffix + "2" }
		},
		function( result ) {
			assert.strictEqual( result.focusevent.timedOut, false, "Text box did get focus event" );
			$popup.popup( "close" );
		},
		{
			popupafterclose: { src: $popup, event: "popupafterclose" + eventSuffix + "3" }
		},
		function( result ) {
			assert.strictEqual( result.popupafterclose.timedOut, false, "Popup did close" );
			assert.strictEqual( $popupContainer.is( ":focus" ), false,
				"The popup container is not focused" );
			assert.strictEqual( $popupContainer.find( ":focus" ).length, 0,
				"The popup container contains no focused elements" );
			ready();
		}
	] );
} );

QUnit.test( "A popup is closed when it becomes disabled, and cannot be opened while it is disabled",
	function( assert ) {
		var ready = assert.async();
		var $popup = $( "#disabled-popup" ),
			$link = $( "a#open-disabled-popup" ),
			eventNs = ".apopupisclosedwhendisabled";

		assert.expect( 3 );

		$.testHelper.detailedEventCascade( [
			function() {
				$link.click();
			},

			{
				popupafteropen: { src: $popup, event: "popupafteropen" + eventNs + "1" }
			},

			function( result ) {
				assert.strictEqual( result.popupafteropen.timedOut, false,
					"Received 'popupafteropen' event" );
				$popup.popup( "disable" );
			},

			{
				popupafterclose: { src: $popup, event: "popupafterclose" + eventNs + "2" }
			},

			function( result ) {
				assert.strictEqual( result.popupafterclose.timedOut, false,
					"Received 'popupafterclose' event after calling disable()" );
				$link.click();
			},

			{
				popupafteropen: { src: $popup, event: "popupafteropen" + eventNs + "3" }
			},

			function( result ) {
				assert.strictEqual( result.popupafteropen.timedOut, true,
					"Did not receive 'popupafteropen' when opening a disabled popup" );
				ready();
			}
		] );
	} );
} );
