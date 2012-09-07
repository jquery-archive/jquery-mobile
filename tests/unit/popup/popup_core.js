/*
 * mobile popup unit tests
 */
(function($){

	var urlObject = $.mobile.path.parseLocation(),
		home = urlObject.pathname + urlObject.search;

	module( "jquery.mobile.popup.js", {
		setup: function() {
			$.testHelper.navReset( home );
		}
	});

	$.extend($.testHelper, {

// detailedEventCascade: call a function and expect a series of events to be triggered (or not to be triggered), and guard
// with a timeout against getting stood up. Record the result (timed out / was triggered) for each event, and the order
// in which the event arrived wrt. any other events expected.
//		seq : [
//			fn(result),
//			{ key: {
//					src: event source (is jQuery object),
//					event: event name (is string),
//					       NB: It's a good idea to namespace your events, because the handler will be removed
//					       based on the name you give here if a timeout occurs before the event fires.
//					userData1: value,
//					...
//					userDatan: value
//			  },
//				...
//			]
//			...
//		]
//		result: {
//			key: {
//				idx: order in which the event fired
//				src: event source (is jQuery object),
//				event: event name (is string)
//				timedOut: timed out (is boolean)
//				userData1: value,
//				...
//				userDatan: value
//			}
//			...
//		}
		detailedEventCascade: function( seq, result ) {
			// grab one step from the sequence
			var fn = seq.shift(),
			    events = seq.shift(),
			    self = this,
			    derefSrc = function( src ) {
						return ( $.isFunction( src ) ? src() : src );
					};

			// we're done
			if ( fn === undefined ) {
				return;
			}

			// Attach handlers to the various objects which are to be checked for correct event generation
			if ( events ) {
				var newResult = {},
				    nEventsDone = 0,
				    nEvents = 0,
				    // set a failsafe timer in case one of the events never happens
				    warnTimer = setTimeout( function() {
				    	$.each( events, function( key, event ) {
				    		if ( newResult[ key ] === undefined ) {
				    			// clean up the unused handler
				    			derefSrc( event.src ).unbind( event.event );
				    			newResult[ key ] = $.extend( {}, event, { timedOut: true } );
				    		}
				    	});

				    	// Move on to the next step
				    	self.detailedEventCascade( seq, newResult );
				    }, 2000);

				function recordResult( key, event, result ) {
					// Record the result
					newResult[ key ] = $.extend( {}, event, result );
					// Increment the number of received responses
					nEventsDone++;
					if ( nEventsDone === nEvents ) {
						// clear the timeout and move on to the next step when all events have been received
						clearTimeout( warnTimer );
						setTimeout( function() {
							self.detailedEventCascade( seq, newResult );
						}, 0);
					}
				}

				$.each( events, function( key, event ) {
					// Count the events so that we may know how many responses to expect
					nEvents++;
					// If it's an event
					if ( event.src ) {
						// Hook up to the event
						derefSrc( event.src ).one( event.event, function() {
							recordResult( key, event, { timedOut: false, idx: nEventsDone } );
						});
					}
					// If it's a timeout
					else {
						setTimeout( function() {
							recordResult( key, event, { timedOut: true, idx: -1 } );
						}, event.length );
					}
				});
			}

			// Call the function with the result of the events
			fn( result );
		}
	});

	function popupEnhancementTests( $sel, prefix ) {
		var $container = $sel.parent(), $screen = $sel.parent().prev();

		ok( $sel.data( "popup" ),  prefix + ", popup div is associated with a popup widget" );
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
			tolTestPopup = tolTestElement.data( "popup" ),
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

	asyncTest( "Popup opens and closes", function() {
		var $popup = $( "#test-popup" );
		expect( 9 );

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				opened: { src: $popup, event: "popupafteropen.opensandcloses" },
				hashchange: { src: $(document), event: "hashchange.opensandcloses" }
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
				hashchange: { src: $(document), event: "hashchange.opensandcloses2" }
			},

			function( result) {
				ok( !$popup.parent().hasClass( "in" ), "Closed popup container does not have class 'in'" );
				ok( $popup.parent().prev().hasClass( "ui-screen-hidden" ), "Closed popup screen is hidden" );
				ok( !$popup.parent().hasClass( "ui-popup-active" ), "Open popup dos not have the 'ui-popup-active' class" );

				start();
			}
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
				hashchange: { src: $(document), event: "navigate.linkActive" }
			},

			function( result ) {
				ok( !result.opened.timedOut, "Opening a popup did cause 'opened' event" );
				ok( !$( "a#open-test-popup" ).closest( ".ui-btn" ).hasClass( "ui-btn-active" ), "Opening a popup removes active class from link that launched it" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "popupafterclose.linkActiveTestStep2" },
				hashchange: { src: $(document), event: "navigate.linkActive2" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "Opening a popup did cause 'closed' event" );
				$( "a#open-xyzzy-popup" ).click();
				ok( !$( "a#open-xyzzy-popup" ).closest( ".ui-btn" ).hasClass( "ui-btn-active" ), "Opening a non-existing popup removes active class from link that attempted to launch it" );

				$( "test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "popupafterclose.linkActiveTestStep3" },
				hashchange: { src: $(document), event: "navigate.linkActive3" }
			},

			start
		]);
	});

	asyncTest( "Popup interacts correctly with hashchange", function() {
		var baseUrl, activeIndex, $popup = $( "#test-popup" );

		if( !$popup.data( "popup" ).options.history ) {
			expect( 1 )
			ok( true, "hash change disabled" );
			start();
			return;
		}

		expect( 6 );

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
				ok( decodeURIComponent( location.href ) === baseUrl + ( ( baseUrl.indexOf( "#" ) > -1 ) ? "" : "#" ) + $.mobile.dialogHashKey, "location.href has been updated correctly" );
				ok( $.mobile.urlHistory.activeIndex === activeIndex + 1, "$.mobile.urlHistory has been advanced correctly" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "popupafterclose.hashInteractStep2" },
				navigate: { src: $.mobile.pageContainer, event: "navigate.hashInteractStep2" }
			},

			function( result ) {
				ok( !result.navigate.timedOut, "Closing a popup from a non-dialogHashKey location causes a 'navigate' event" );
				ok( decodeURIComponent( location.href ) === baseUrl, "location.href has been restored after the popup" );
				ok( $.mobile.urlHistory.activeIndex === activeIndex, "$.mobile.urlHistory has been restored correctly" );

				// TODO make sure that the afterclose is fired after the nav finishes
				setTimeout(start, 300);
			}
		]);
	});

	// This test assumes that the popup opens into a state that does not include dialogHashKey.
	// This should be the case if the previous test has cleaned up correctly.
	asyncTest( "Opening another page from the popup leaves no trace of the popup in history", function() {
		var initialActive = $.extend( {}, {}, $.mobile.urlHistory.getActive()),
			initialHRef = $.mobile.path.parseUrl( decodeURIComponent( location.href ) ),
			initialBase = initialHRef.protocol + initialHRef.doubleSlash + initialHRef.authority + initialHRef.directory,
			$popup = $( "#test-popup" );

		if( !$popup.data( "popup" ).options.history ) {
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
				hashchange: { src: $( window ), event: "hashchange.anotherPageStep3" },
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

				setTimeout( function() { start(); }, 500 );
			},
		]);
	});

	asyncTest( "Sequence page -> popup -> dialog -> popup works", function() {
		var originallyActivePage = $.mobile.activePage[ 0 ], $popup = $( "#test-popup" );

		if( !$popup.data( "popup" ).options.history ) {
			expect( 1 )
			ok( true, "hash change disabled" );
			start();
			return;
		}

		expect( 15 );
		$.testHelper.detailedEventCascade([
			function() {
				$( "#popup-sequence-test" ).popup( "open" );
			},

			{
				opened: { src: $( "#popup-sequence-test" ), event: "popupafteropen.sequenceTestStep1" },
				hashchange: { src: $( window ), event: "hashchange.sequenceTestStep1" }
			},

			function( result ) {
				ok( !result.opened.timedOut, "Popup has emitted 'popupafteropen'" );
				ok( !result.hashchange.timedOut, "A 'hashchange' event has occurred" );
				$( "#popup-sequence-test-open-dialog" ).click();
			},

			{
				closed: { src: $( "#popup-sequence-test" ), event: "popupafterclose.sequenceTestStep2" },
				pageload: { src: $.mobile.pageContainer, event: "pageload.sequenceTestStep2" },
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.sequenceTestStep3" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "Popup has emitted 'popupafterclose'" );
				ok( !result.pageload.timedOut, "A 'pageload' event (presumably to load the dialog) has occurred" );
				ok( $( "#popup-sequence-test-dialog" ).length > 0, "The dialog has been loaded successfully" );
				ok( !result.pagechange.timedOut, "A 'pagechange' event has occurred" );
				ok( $.mobile.activePage[ 0 ] === $( "#popup-sequence-test-dialog" )[ 0 ], "The dialog is the active page" );
				$( "a[href='#popup-sequence-test-popup-inside-dialog']" ).click();
			},

			{
				opened: { src: function() { return $( "#popup-sequence-test-popup-inside-dialog" ); }, event: "popupafteropen.sequenceTestStep3" },
				hashchange: { src: $( window ), event: "hashchange.sequenceTestStep3" }
			},

			function( result ) {
				ok( !result.opened.timedOut, "Popup inside dialog has emitted 'popupafteropen'" );
				ok( !result.hashchange.timedOut, "Popup inside dialog has caused a 'hashchange'" );
				window.history.back();
			},

			{
				close: { src: function() { return $( "#popup-sequence-test-popup-inside-dialog" ); }, event: "popupafterclose.sequenceTestStep4" },
				hashchange: { src: $( window ), event: "hashchange.sequenceTestStep4" }
			},

			function( result ) {
				ok( !result.close.timedOut, "Popup inside dialog has emitted 'popupafterclose'" );
				ok( !result.hashchange.timedOut, "The closing of the inside popup has resulted in a 'hashchange'" );
				ok( $.mobile.activePage[ 0 ] === $( "#popup-sequence-test-dialog" )[ 0 ], "The dialog is once more the active page" );
				window.history.back();
			},

			{
				pagechange: { src: $.mobile.pageContainer, event: "pagechange.sequenceTestStep5" },
				hashchange: { src: $( window ), event: "hashchange.sequenceTestStep5" }
			},

			function( result ) {
				ok( !result.pagechange.timedOut, "Going back from the dialog has resulted in a 'pagechange'" );
				ok( !result.hashchange.timedOut, "Going back from the dialog has resulted in a 'hashchange'" );
				ok( originallyActivePage === $.mobile.activePage[ 0 ], "After going back from the dialog, the originally active page is active once more" );
				setTimeout( function() { start(); }, 300 );
			}
		]);
	});

	asyncTest( "Popup focused after open", function() {
		var $link = $( "#open-test-popup" ), $popup = $( "#test-popup" );

		expect( 2 );

		$popup.parent().one( "focus", function() {
			ok( true, "focus fired after the popup opens" );
		});

		// check that after the popup is closed the focus is correct
		$popup.one( "popupafteropen", function() {
			ok( true, "afteropen has fired" );
			$popup.popup( "close" );
		});

		$popup.one( "popupafterclose", function() {
			// TODO make sure that the afterclose is fired after the nav finishes
			setTimeout(start, 300);
		});

		$popup.popup( "open" );
	});

	asyncTest( "Popup doesn't alter the url when the history option is disabled", function() {
		var $popup = $( "#test-history-popup" ), hash = $.mobile.path.parseLocation().hash;

		$popup.popup( "open" );

		equal( hash, $.mobile.path.parseLocation().hash, "the hash remains the same" );

		ok( $popup.is( ":visible" ), "popup is indeed visible" );

		$popup.one( "popupafterclose", function() {
			// TODO make sure that the afterclose is fired after the nav finishes
			setTimeout(start, 300);
		});

		$popup.popup( "close" );
	});

	asyncTest( "Navigating away from the popup page closes the popup without history enabled", function() {
		var $popup = $( "#test-history-popup" );

		expect( 3 );

		$.testHelper.detailedEventCascade([
			function() {
				$popup.popup( "open" );
			},

			{
				open: { src: $popup, event: "popupafterclose.historyOffTestStep1" }
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
				setTimeout(start, 300);
			}
		]);
	});

	// TODO would be nice to avoid checking the internal representation
	//      of "openness" but :visible didn't seem to be working in this case
	//      (offscreen?)
	asyncTest( "Close links work on a history disabled popup", function() {
		var $popup = $( "#test-history-popup" );

		expect( 3 );

		ok( !$popup.data( "popup" )._isOpen, "popup is initially closed" );

		$popup.popup( 'open' );
		ok( $popup.data( "popup" )._isOpen, "popup is opened with open method" );

		$popup.one( "popupafterclose", function() {
			ok( !$popup.data( "popup" )._isOpen, "popup is closed on link click" );
			start();
		});

		$popup.find( "a" ).click();
	});

	asyncTest( "Destroy closes the popup first", function() {
		var $popup = $( "#test-destroy-popup" );

		expect( 1 );

		$popup.one( "popupafterclose", function() {
			ok( true, "closed on destroy" );
			start();
		});

		$popup.popup( "destroy" );
	});
})( jQuery );
