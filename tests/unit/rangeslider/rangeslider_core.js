/*
 * mobile slider unit tests
 */
( function( $ ) {
	module( "jquery.mobile.rangeslider.js core" );

	test( "First input value is always lower than last input value and vice versa", function() {
		expect( 2 );
		var	rangeFirst = $( "#rangeslider-minmax-first" ),
			rangeLast = $( "#rangeslider-minmax-last" );

		// Try to set first input val (30) higher than last input val (70)
		rangeFirst.val( parseInt( rangeFirst.val(), 10 ) +  60 ).slider( "refresh" );
		equal( rangeFirst.val(), rangeLast.val(),
			"First input value is equal to last input value" );

		// Set first input value back to 30
		rangeFirst.val( 30 ).slider( "refresh" );

		// Try to set last input val (70) lower than first input val (30)
		rangeLast.val( parseInt( rangeLast.val(), 10 ) -  60 ).slider( "refresh" );

		equal( rangeLast.val(), rangeFirst.val(),
			"Last input value is equal to first input value" );
	} );

	var createEvent = function( name, target, x, y ) {
		var event = $.Event( name );
		event.target = target;
		event.pageX = x;
		event.pageY = y;
		return event;
	};

	test( "Clicking on the extreams updates the correct input", function() {
		expect( 2 );
		var rangeslider = $( "#rangeslider-extreams" ),
			rangeFirst = $( "#rangeslider-extreams-first" ),
			rangeLast = $( "#rangeslider-extreams-last" ),
			track = rangeslider.find( ".ui-slider-track" ).first(),
			trackOffset = track.offset(),
			trackWidth = track.width();

		// Fake a click at the beginning of the track
		track.trigger( createEvent(
						"mousedown",
						track[0],
						trackOffset.left + 15,
						trackOffset.top + 7 ) ).trigger( "mouseup" );

		// Check if first input value (45) has decreased
		ok(
			$( rangeFirst ).on( "change", function() {
				rangeLast.val() < 45;
			} ),
			"Clicking at the beginning of the track updates the first input"
		);

		// Fake a click at the end of the track
		track.trigger( createEvent(
						"mousedown",
						track[0],
						( trackOffset.left + trackWidth ) - 15,
						trackOffset.top + 7 ) ).trigger( "mouseup" );

		// Check if last input value (55) has increased
		ok(
			$( rangeLast ).on( "change", function() {
				rangeLast.val() > 55;
			} ),
			"Clicking at the end of the track updates the last input"
		);
	} );

	asyncTest( "fire slidestart and slidestop on both handles", function() {
		var rangeslider = $( "#rangeslider-startstop" ),
			widget = rangeslider.data( "mobile-rangeslider" ),
			sliders = widget._sliders,
			handleFirst = sliders.find( ".ui-slider-handle" ).first(),
			handleLast = sliders.find( ".ui-slider-handle" ).last();

		$.testHelper.eventCascade( [
			function() {
				handleFirst.mousedown();
			},

			"slidestart", function( timeout ) {
				ok( !timeout, "slidestart on first handle fired" );
				handleFirst.mouseup();
			},

			"slidestop", function( timeout ) {
				ok( !timeout, "slidestop on first handle fired" );
				handleLast.mousedown();
			},

			"slidestart", function( timeout ) {
				ok( !timeout, "slidestart on last handle fired" );
				handleLast.mouseup();
			},

			"slidestop", function( timeout ) {
				ok( !timeout, "slidestop on last handle fired" );
				start();
			}

		], 50 );
	} );
	test( " Rangeslider is enabled/disabled correctly ", function( assert ) {
		var rangeslider = $( "#disable-rangeslider" ),
			inputFirst = $( "#range-disabled-first" ),
			inputLast = $( "#range-disabled-last" ),
			sliderFirst = rangeslider.find( ".ui-slider-track" ).first(),
			sliderLast =  rangeslider.find( ".ui-slider-track" ).first();

		rangeslider.rangeslider( { disabled: true } );

		ok( !!inputFirst.attr( "disabled" ),  "first input is disabled" );
		assert.hasClasses( inputFirst, "mobile-slider-disabled" );
		ok( !!sliderFirst.attr( "aria-disabled" ), "first slider is aria-disabled" );
		assert.hasClasses( sliderFirst, "ui-state-disabled" );
		ok( !!inputLast.attr( "disabled" ),  "last input is disabled" );
		assert.hasClasses( inputLast, "mobile-slider-disabled" );
		ok( !!sliderLast.attr( "aria-disabled" ), "last slider is aria-disabled" );
		assert.hasClasses( sliderLast, "ui-state-disabled" );

		rangeslider.rangeslider( { disabled: false } );

		equal( !!inputFirst.attr( "disabled" ), false, "first input is enabled" );
		assert.lacksClasses( inputFirst, "mobile-slider-disabled" );
		equal( sliderFirst.attr( "aria-disabled" ), "false",
			"first slider aria-disabled is false" );
		assert.lacksClasses( sliderFirst, "ui-state-disabled" );
		equal( !!inputLast.attr( "disabled" ), false, "last input is enabled" );
		assert.lacksClasses( inputLast, "mobile-slider-disabled" );
		equal( sliderLast.attr( "aria-disabled" ), "false",
			"last slider aria-disabled is false" );
		assert.lacksClasses( sliderLast, "ui-state-disabled" );
	} );

} )( jQuery );
