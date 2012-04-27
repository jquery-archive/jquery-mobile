/*
 * mobile popup unit tests
 */
(function($){

	var myTestHelper = { 

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
				    nEvents = 0;

				// set a failsafe timer in case one of the events never happens
				var warnTimer = setTimeout( function() {
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

				$.each( events, function( key, event ) {
					// Count the events so that we may know how many responses to expect
					nEvents++;
					// Hook up to the event
					event.src.one( event.event, function() {
						// Record the result
						newResult[ key ] = $.extend( {}, event, { timedOut: false, idx: nEventsDone } );
						// Increment the number of received responses
						nEventsDone++;
						if ( nEventsDone === nEvents ) {
							// clear the timeout and move on to the next step when all events have been received
							clearTimeout( warnTimer );
							setTimeout( function() {
								self.detailedEventCascade( seq, newResult );
							}, 0);
						}
					});
				});
			}

			// Call the function with the result of the events
			fn( result );
		}
	};

	test( "Popup div is associated with a popup widget", function() {
		expect( 1 );
		ok( $("#test-popup" ).data( "popup" ) );
	});

	test( "Popup div parent has class ui-popup-container", function() {
		expect( 1 );
		ok( $("#test-popup" ).parent().hasClass( "ui-popup-container" ) );
	});

	test( "Popup div grandparent is the page", function() {
		expect( 1 );
		ok( $("#test-popup" ).parent().parent().hasClass( "ui-page" ) );
	});

	test( "Popup div is preceded by its screen", function() {
		expect( 1 );
		ok(
			$( "#test-popup" ).parent().prev().hasClass( "ui-selectmenu-screen" ) &&
			$( "#test-popup" ).parent().prev().hasClass( "ui-popup-screen" ) );
	});

	asyncTest( "Popup opens and closes", function() {

		expect( 5 );

		$( "#test-popup" ).popup( "open" );
		setTimeout(function() {
			ok( $( "#test-popup" ).parent().hasClass( "in" ), "Open popup container has class 'in'" );
			ok( !$( "#test-popup" ).parent().prev().hasClass( "ui-screen-hidden" ), "Open popup screen is not hidden" );
			ok( $( "#test-popup" ).parent().attr( "class" ).match( /( |^)ui-body-[a-z]( |$)/ ), "Open popup has a valid overlay theme" );
			$( "#test-popup" ).popup( "close" );
			setTimeout(function() {
				ok( !$( "#test-popup" ).parent().hasClass( "in" ), "Closed popup container does not have class 'in'" );
				ok( $( "#test-popup" ).parent().prev().hasClass( "ui-screen-hidden" ), "Closed popup screen is hidden" );
				start();
			}, 1000);
		}, 1000);
	});

	asyncTest( "Popup interacts correctly with hashchange", function() {
		var baseUrl, activeIndex;

		expect( 6 );

		myTestHelper.detailedEventCascade([
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
				start();
			}
		]);
	});

	asyncTest( "When opening a popup from a dialogHashKey location the location is reused", function() {
		var origUrl, origIndex, baseUrl, baseIndex;

		expect( 4 );

		myTestHelper.detailedEventCascade([
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
				hashchange: { src: $( window ), event: "hashchange.reuseStep2" }
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
				start();
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

		myTestHelper.detailedEventCascade([
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

				start();
			},

		]);
	});
})( jQuery );
