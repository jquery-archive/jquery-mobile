test( "Controlgroup buttons have the same height", function() {
	deepEqual( $( "#content-notext" ).height(), $( "#content-text" ).height(),
		"Content: Icon-only button has the same height as text-only button" );
	deepEqual( $( "#footer-notext" ).height(), $( "#footer-text" ).height(),
		"Footer: Icon-only button has the same height as text-only button" );
});
