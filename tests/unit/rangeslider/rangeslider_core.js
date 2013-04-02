/*
 * mobile slider unit tests
 */
(function($){
	module( "jquery.mobile.rangeslider.js core" );

	test( "Hightlight has correct margin and width", function() {
		expect( 2 );
		var rangeslider = $( "#rangeslider-highlight" ),
			rangeFirst = $( "#rangeslider-highlight-first" ),
			rangeLast = $( "#rangeslider-highlight-last" ),
			bg = rangeslider.find( ".ui-slider-bg" ),
			width = rangeslider.find( ".ui-slider-track" ).first().width(),
			range = rangeFirst.attr( "max" ) - rangeFirst.attr( "min" ),
			cssMarginLeft, cssWidth, intWidth, bgMarginLeft, bgWidth;

		// Increase first input val with 20
		rangeFirst.val( parseInt(rangeFirst.val(), 10) + 20 ).slider( "refresh" );

		cssMarginLeft = bg.css( "margin-left" );
		
		// Check if browser returns a pixel or percentage value
		if ( cssMarginLeft.indexOf( "%" ) > -1 ) {
			bgMarginLeft = ( rangeFirst.val() / range * 100 ) + "%";
			
			deepEqual( cssMarginLeft, bgMarginLeft, "Highlight has correct left margin" );
		} else {
			var intMarginLeft = parseFloat( cssMarginLeft.replace("px", "") );
			
			bgMarginLeft = Math.round( rangeFirst.val() / range * width );
			// Take a rounding difference of max 2px into account
			ok( -2 >= ( intMarginLeft - bgMarginLeft ) <= 2, "Highlight has correct left margin" );
		}
		
		cssWidth = bg.css( "width" );
		intWidth = parseFloat( cssWidth.replace("px", "") );
		bgWidth = Math.round( (rangeLast.val() - rangeFirst.val()) / range * width );
		// Take a rounding difference of max 2px into account
		ok( -2 >= ( intWidth - bgWidth ) <= 2, "Highlight has correct width" );
	});

	test( "First input value is always lower than last input value and vice versa", function() {
		expect( 2 );
		var rangeslider = $( "#rangeslider-minmax" ),
			rangeFirst = $( "#rangeslider-minmax-first" ),
			rangeLast = $( "#rangeslider-minmax-last" );

		// Try to set first input val (30) higher than last input val (70)
		rangeFirst.val( parseInt(rangeFirst.val(), 10) +  60 ).slider( "refresh" );
		
		equal( rangeFirst.val(), rangeLast.val(), "First input value is equal to last input value" );
		
		// Set first input value back to 30
		rangeFirst.val( 30 ).slider( "refresh" );
		// Try to set last input val (70) lower than first input val (30)
		rangeLast.val( parseInt(rangeLast.val(), 10) -  60 ).slider( "refresh" );
		
		equal( rangeLast.val(), rangeFirst.val(), "Last input value is equal to first input value" );
	});

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
		track.trigger( createEvent( "mousedown", track[0], trackOffset.left + 15, trackOffset.top + 7 ) ).trigger( "mouseup" );
		// Check if first input value (45) has decreased
		ok(
			$( rangeFirst ).on( "change", function() {
				rangeLast.val() < 45;
			}),
			"Clicking at the beginning of the track updates the first input"
		);
		// Fake a click at the end of the track	
		track.trigger( createEvent( "mousedown", track[0], ( trackOffset.left + trackWidth ) - 15, trackOffset.top + 7 ) ).trigger( "mouseup" );
		// Check if last input value (55) has increased
		ok(
			$( rangeLast ).on( "change", function() {
				rangeLast.val() > 55;
			}),
			"Clicking at the end of the track updates the last input"
		);
	});

})( jQuery );
