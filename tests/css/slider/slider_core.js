function testDisjoint( slider ) {
	var inputOffset = slider.offset(),
		inputRectangle = $.extend( {}, inputOffset, {
			right: inputOffset.left + slider.width(),
			bottom: inputOffset.top + slider.height()
		} ),
		track = slider.siblings( ".ui-slider-track" ),
		trackOffset = track.offset(),
		trackRectangle = $.extend( {}, trackOffset, {
			right: trackOffset.left + track.width(),
			bottom: trackOffset.top + track.height()
		} );

	deepEqual(
		inputRectangle.left > trackRectangle.right ||
		trackRectangle.left > inputRectangle.right ||
		inputRectangle.top > trackRectangle.bottom ||
		trackRectangle.top > inputRectangle.bottom, true,
		"input and track rectangles are disjoint" );
}

test( "mini slider track does not overlap with input", function() {
testDisjoint( $( "#test-slider-mini" ) );
} );

test( "normal slider track does not overlap with input", function() {
testDisjoint( $( "#test-slider-normal" ) );
} );
