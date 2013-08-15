test( "Button widget works correctly", function() {
	$( ".make-a-button", "body" ).button();
	deepEqual( $( ":mobile-button" ).length, 3, "Three button widgets were instantiated" );
	$( "input" ).parent().each( function() {
		ok( $( this ).hasClass( "ui-btn" ), "Wrapper has class 'ui-btn'" );
	});
});
