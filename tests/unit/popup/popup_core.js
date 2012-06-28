/*
 * mobile popup unit tests
 */
(function($){

	module( "jquery.mobile.popup.js" );

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
			    self = this;

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
				    			event.src.unbind( event.event );
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
						event.src.one( event.event, function() {
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
		ok( $sel.data( "popup" ),  prefix + ", popup div is associated with a popup widget" );
		ok( $sel.hasClass( "ui-popup" ),  prefix + ", popup payload has class 'ui-popup'" );
		ok( $sel.parent().hasClass( "ui-popup-container" ), prefix + ", popup div parent has class ui-popup-container" );
		ok( $sel.parent().parent().hasClass( "ui-page" ), prefix + ", popup div grandparent is the page" );
		ok( $sel.parent().prev().hasClass( "ui-popup-screen" ), prefix + ", popup div is preceded by its screen" );
	}

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

		expect( 5 );

		$( "#test-popup" ).popup( "open", -9999, -9999 );
		setTimeout(function() {
			var theOffset = $( "#test-popup p" ).offset();
			ok( !$( "#test-popup" ).parent().prev().hasClass( "ui-screen-hidden" ), "Open popup screen is not hidden" );
			ok( $( "#test-popup" ).parent().attr( "class" ).match( /( |^)ui-body-[a-z]( |$)/ ), "Open popup has a valid overlay theme" );
			ok( theOffset.left >= 10 && theOffset.top >= 30, "Open popup top left coord is at least (10, 30)" );
			$( "#test-popup" ).popup( "close" );
			setTimeout(function() {
				ok( !$( "#test-popup" ).parent().hasClass( "in" ), "Closed popup container does not have class 'in'" );
				ok( $( "#test-popup" ).parent().prev().hasClass( "ui-screen-hidden" ), "Closed popup screen is hidden" );
				setTimeout( function() { start(); }, 300 );
			}, 1000);
		}, 1000);
	});

	asyncTest( "Link that launches popup is deactivated", function() {

		expect( 4 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "a#open-test-popup" ).click();
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.linkActiveTestStep1" }
			},

			function( result ) {
				ok( !result.opened.timedOut, "Opening a popup did cause 'opened' event" );
				ok( !$( "a#open-test-popup" ).closest( ".ui-btn" ).hasClass( "ui-btn-active" ), "Opening a popup removes active class from link that launched it" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "closed.linkActiveTestStep2" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "Opening a popup did cause 'closed' event" );
				$( "a#open-xyzzy-popup" ).click();
				ok( !$( "a#open-xyzzy-popup" ).closest( ".ui-btn" ).hasClass( "ui-btn-active" ), "Opening a non-existing popup removes active class from link that attempted to launch it" );
				setTimeout( function() { start(); }, 300 );
			},
		]);
	});

	asyncTest( "Popup interacts correctly with hashchange", function() {
		var baseUrl, activeIndex;

		expect( 6 );

		$.testHelper.detailedEventCascade([
			function() {
				baseUrl = location.href;
				activeIndex = $.mobile.urlHistory.activeIndex;
				$( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.hashInteractStep1" },
				hashchange: { src: $( window ), event: "hashchange.hashInteractStep1" }
			},

			function( result ) {
				ok( !result.hashchange.timedOut, "Opening a popup from a non-dialogHashKey location causes a hashchange event" );
				ok( location.href === baseUrl + ( ( baseUrl.indexOf( "#" ) > -1 ) ? "" : "#" ) + $.mobile.dialogHashKey, "location.href has been updated correctly" );
				ok( $.mobile.urlHistory.activeIndex === activeIndex + 1, "$.mobile.urlHistory has been advanced correctly" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "closed.hashInteractStep2" },
				hashchange: { src: $( window ), event: "hashchange.hashInteractStep2" }
			},

			function( result ) {
				ok( !result.hashchange.timedOut, "Closing a popup from a non-dialogHashKey location causes a hashchange event" );
				ok( location.href === baseUrl, "location.href has been restored after the popup" );
				ok( $.mobile.urlHistory.activeIndex === activeIndex, "$.mobile.urlHistory has been restored correctly" );
				setTimeout( function() { start(); }, 300 );
			}
		]);
	});

	asyncTest( "When opening a popup from a dialogHashKey location the location is reused", function() {
		var origUrl, origIndex, baseUrl, baseIndex;

		expect( 4 );

		$.testHelper.detailedEventCascade([
			function() {
				origUrl = location.href;
				origIndex = $.mobile.urlHistory.activeIndex;
				$( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.reuseStep1" },
				hashchange: { src: $( window ), event: "hashchange.reuseStep1" }
			},

			function( result ) {
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "closed.reuseStep2" },
				hashchange: { src: $( window ), event: "hashchange.reuseStep2" },
				timeout: { src: null, length: 300 }
			},

			function( result ) {
				window.history.forward();
			},

			{ hashchange: { src: $( window ), event: "hashchange.reuseStep3" } },

			function( result ) {
				baseUrl = location.href;
				activeIndex = $.mobile.urlHistory.activeIndex;
				$( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.reuseStep4" },
				hashchange: { src: $( window ), event: "hashchange.reuseStep4" }
			},

			function( result ) {
				ok( result.hashchange.timedOut, "Opening a popup from a dialogHashKey location does not cause a hashchange" );
				ok( baseUrl === location.href, "Opening a popup from a dialogHashKey location does not cause the location to be modified" );
				ok( activeIndex === $.mobile.urlHistory.activeIndex, "Opening a popup from a dialogHashKey location does not cause $.mobile.urlHistory to move" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "closed.reuseStep5" },
				hashchange: { src: $( window ), event: "hashchange.reuseStep5" }
			},

			function( result ) {
				ok( !result.hashchange.timedOut, "Closing a popup from a dialogHashKey location causes a hashchange" );
				setTimeout( function() { start(); }, 300 );
			}
		]);
	});

	// This test assumes that the popup opens into a state that does not include dialogHashKey.
	// This should be the case if the previous test has cleaned up correctly.
	asyncTest( "Opening another page from the popup leaves no trace of the popup in history", function() {
		var initialActive = $.extend( {}, {}, $.mobile.urlHistory.getActive()),
		    initialHRef = $.mobile.path.parseUrl( location.href ),
		    initialBase = initialHRef.protocol + initialHRef.doubleSlash + initialHRef.authority + initialHRef.directory;

		expect( 6 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.anotherPageStep1" },
				hashchange: { src: $( window ), event: "hashchange.anotherPageStep1" }
			},

			function() {
				$( "#test-popup a" ).click();
			},

			{
				closed: { src: $( "#test-popup" ), event: "closed.anotherPageStep2" },
				hashchange: { src: $( window ), event: "hashchange.anotherPageStep2" }
			},

			function( result ) {
				var hRef = $.mobile.path.parseUrl( location.href );
				ok( !result.closed.timedOut, "Popup closed" );
				ok( !result.hashchange.timedOut, "hashchange did occur" );
				ok( location.href === initialBase + hRef.filename, "New location is exactly the previous location (up to and including path) and the new filename" );
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

				ok( location.href === initialHRef.href, "Going back once places the browser on the initial page" );
				ok( identical, "Going back returns $.mobile.urlHistory to its initial value" );
				ok( $.mobile.urlHistory.activeIndex === $.mobile.urlHistory.stack.length - 3, "Going back leaves exactly two entries ahead in $.mobile.urlHistory" );

				setTimeout( function() { start(); }, 300 );
			},

		]);
	});

})( jQuery );
