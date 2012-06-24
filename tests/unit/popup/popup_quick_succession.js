( function( $ ) {

	asyncTest( "Opening and closing a closed popup in quick succession does not move the browser elsewhere in history", function() {
		var initialHRef = location.href;

		expect( 5 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "#test-popup" ).popup( "open" ); $( "#test-popup" ).popup( "close" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.openCloseQuickStep1" },
				closed: { src: $( "#test-popup" ), event: "closed.openCloseQuickStep1" },
				hashchange1: { src: $( window ), event: "hashchange.openCloseQuickStep1a" },
				hashchange2: { src: $( window ), event: "hashchange.openCloseQuickStep1b" },
				timeout: { src: null, length: 600 }
			},

			function( result ) {
				ok( !result.opened.timedOut, "'opened' signal arrived" );
				ok( !result.closed.timedOut, "'closed' signal arrived" );
				ok( !( result.hashchange1.timedOut || result.hashchange1.timedOut ), "Two 'hashchange' signals arrived" );
				ok( location.href === initialHRef, "Location did not change" );
				ok( result.opened.idx < result.closed.idx, "'opened' signal arrived before 'closed' signal" );
				setTimeout( function() { start(); }, 300 );
			}
		]);
	});

	asyncTest( "Closing and opening an open popup in quick succession does not move the browser elsewhere in history", function() {
		var initialHRef, origHRef = location.href;

		expect( 8 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.closeOpenQuickStep1" },
				hashchange: { src: $( window ), event: "hashchange.closeOpenQuickStep1" }
			},

			function() {
				initialHRef = location.href;
				$( "#test-popup" ).popup( "close" ); $( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.closeOpenQuickStep2" },
				closed: { src: $( "#test-popup" ), event: "closed.closeOpenQuickStep2" },
				hashchange: { src: $( window ), event: "hashchange.closeOpenQuickStep2" }
			},

			function( result ) {
				ok( !result.opened.timedOut, "'opened' signal arrived" );
				ok( !result.closed.timedOut, "'closed' signal arrived" );
				ok( result.hashchange.timedOut, "No 'hashchange' signals arrived" );
				ok( location.href === initialHRef, "Location did not change" );
				ok( result.closed.idx < result.opened.idx, "'closed' signal arrived before 'opened' signal" );
				$( "#test-popup" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup" ), event: "closed.closeOpenQuickStep3" },
				hashchange: { src: $( window ), event: "hashchange.closeOpenQuickStep3" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "'closed' signal arrived" );
				ok( !result.hashchange.timedOut, "'hashchnage' signal arrived" );
				ok( location.href === origHRef, "Location is unchanged" );
				setTimeout( function() { start(); }, 300 );
			},
		]);
	});

})( jQuery );
