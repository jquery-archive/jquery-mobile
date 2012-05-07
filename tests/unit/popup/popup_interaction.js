(function($){

	asyncTest( "Opening a second popup causes the first one to close", function() {
		var initialHRef = location.href;

		expect( 5 );

		$.testHelper.detailedEventCascade([
			function() {
				$( "#test-popup" ).popup( "open" );
			},

			{
				opened: { src: $( "#test-popup" ), event: "opened.openAnotherStep1" },
				hashchange: { src: $( window ), event: "hashchange.openAnotherStep1" }
			},

			function() {
				$( "#test-popup-2" ).popup( "open" );
			},

			{
				hashchange: { src: $( window ), event: "hashchange.openAnotherStep2" },
				closed: { src: $( "#test-popup" ), event: "closed.openAnotherStep2" },
				opened: { src: $( "#test-popup-2" ), event: "opened.openAnotherStep2" }
			},

			function( result ) {
				ok( result.closed.idx < result.opened.idx && result.closed.idx !== -1, "'closed' signal arrived before 'opened' signal" );
				ok( result.hashchange.timedOut, "There were no hashchange events" );
				$( "#test-popup-2" ).popup( "close" );
			},

			{
				closed: { src: $( "#test-popup-2" ), event: "closed.openAnotherStep3" },
				hashchange: { src: $( window ), event: "hashchange.openAnotherStep3" }
			},

			function( result ) {
				ok( !result.closed.timedOut, "'closed' signal was received" );
				ok( !result.hashchange.timedOut, "'hashchange' signal was received" );
				ok( initialHRef === location.href, "location is unchanged" );
				start();
			}
		]);
	});

})( jQuery );
