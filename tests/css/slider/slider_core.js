define( [ "qunit", "jquery" ], function( QUnit, $ ) {

function testDisjoint( assert, slider ) {
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

	assert.deepEqual(
		inputRectangle.left > trackRectangle.right ||
		trackRectangle.left > inputRectangle.right ||
		inputRectangle.top > trackRectangle.bottom ||
		trackRectangle.top > inputRectangle.bottom, true,
		"input and track rectangles are disjoint" );
}

QUnit.test( "mini slider track does not overlap with input", function( assert ) {
testDisjoint( assert, $( "#test-slider-mini" ) );
} );

QUnit.test( "normal slider track does not overlap with input", function( assert ) {
testDisjoint( assert, $( "#test-slider-normal" ) );
} );

} );
