test( "Slider widget works correctly", function() {
var trackWidth, trackX,
	slider = $( "#plain" ).slider(),
	handle = slider.parent().find( ".ui-slider-handle" ),
	track = handle.closest( ".ui-slider-track" ),
	offset = handle.offset();

deepEqual( slider.slider( "widget" ).hasClass( "ui-slider-input" ), true,
	"Has class ui-slider-input" );
equal( handle.length, 1, "Slider contains a handle element" );

function moveHandle( handle, xPos ) {
	var down = $.Event( "mousedown" ),
		move = $.Event( "mousemove" ),
		up = $.Event( "mouseup" ),
		offset = handle.offset();

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
ok( trackWidth > 0, "Track has a non-zero width" );

moveHandle( handle, trackX + trackWidth * 0.5 );
ok( handle.offset().left > 0, "Handle responds to user interaction" );
} );
