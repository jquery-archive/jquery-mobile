test( "Rangeslider widget works correctly", function() {
var rangeslider = $( "#plain" ).rangeslider(),
	handles = rangeslider.parent().find( ".ui-slider-handle" ),
	track = handles.closest( ".ui-slider-track" ),
	offset = handles.offset();

deepEqual( rangeslider.rangeslider( "widget" ).hasClass( "ui-rangeslider" ), true,
	"Has class ui-rangeslider" );
equal( handles.length, 2, "Contains two handle elements" );
equal( track.length, 1, "Contains one track element" );

function moveHandle( handle, xPos ) {
	var trackWidth, trackX,
		down = $.Event( "mousedown" ),
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
// These tests cannot be expressed in the integration tests because the
// "events/touch" module is artificially loaded in that environment.
trackWidth = track.width();
trackX = track.offset().left;
ok( trackWidth > 0, "Track has a non-zero width" );

moveHandle( handles.eq( 0 ), trackX + trackWidth * 0.2 );
moveHandle( handles.eq( 1 ), trackX + trackWidth * 0.8 );
ok( handles.eq( 0 ).offset().left > 0, "Lower handle responds to user interaction" );
ok( handles.eq( 1 ).offset().left > handles.eq( 0 ).offset().left,
	"Upper handle responds to user interaction" );
} );
