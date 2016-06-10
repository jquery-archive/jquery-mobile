define( [ "jquery", "qunit" ], function( $, QUnit ) {

QUnit.test( "Slider widget works correctly", function( assert ) {
var trackWidth, trackX,
	slider = $( "#plain" ).slider(),
	handle = slider.parent().find( ".ui-slider-handle" ),
	track = handle.closest( ".ui-slider-track" ),
	offset = handle.offset();

assert.deepEqual( slider.slider( "widget" ).hasClass( "ui-slider-input" ), true,
	"Has class ui-slider-input" );
assert.equal( handle.length, 1, "Slider contains a handle element" );

function moveHandle( handle, xPos ) {
	var down = $.Event( "mousedown" ),
		move = $.Event( "mousemove" ),
		up = $.Event( "mouseup" );

	down.target = move.target = up.target = handle[ 0 ];
	down.pageY = move.pageY = up.pageY = offset.top;
	down.pageX = offset.left;
	up.pageX = move.pageX = xPos;
	handle.trigger( down );
	handle.trigger( move );
	handle.trigger( up );
}

// GH-7274: Events dependency
// This test cannot be expressed in the integration tests because the
// "events/touch" module is artificially loaded in that environment.
trackWidth = track.width();
trackX = track.offset().left;
assert.ok( trackWidth > 0, "Track has a non-zero width" );

moveHandle( handle, trackX + trackWidth * 0.5 );
assert.ok( handle.offset().left > 0, "Handle responds to user interaction" );
} );

} );
