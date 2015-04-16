module( "Panel positioning", {
	setup: function() {
		$( "body" ).append( "<div id='body-extender' style='height: " + ( screen.height * 3 ) + "px'></div>" );
	},
	teardown: function() {
		$( "#body-extender" ).remove();
	}
} );

asyncTest( "Panel must not jump to top upon throttledresize", function() {
var eventNs = ".panelMustNotJumpToTop";

$.testHelper.detailedEventCascade( [
	function() {
		$( "#scroll-to-top-test-link" ).click();
	},
	{
		panelopen: { src: $( "#scroll-to-top-test" ), event: "panelopen" + eventNs + "1" }
	},
	function( result ) {
		deepEqual( result.panelopen.timedOut, false, "Panel did open" );
		window.scrollTo( 0, screen.height );
		$( window ).trigger( "throttledresize" );
		deepEqual( $( window ).scrollTop(), screen.height,
			"Triggering throttledresize on panel did not cause it to jump to top" );
		$( "#scroll-to-top-test" ).panel( "close" );
	},
	{
		panelclose: { src: $( "#scroll-to-top-test" ), event: "panelclose" + eventNs + "2" }
	},
	function( result ) {
		deepEqual( result.panelclose.timedOut, false, "Panel did close" );
		start();
	}
] );
} );
