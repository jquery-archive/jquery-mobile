module( "Click handler" );

asyncTest( "Active class is removed from reset button", function() {
	var button = $( "#reset-button" ).click();

	expect( 2 );

	deepEqual( button.hasClass( $.mobile.activeBtnClass ), true, "When clicked, reset button gets active class" );

	setTimeout( function() {
		deepEqual( button.hasClass( $.mobile.activeBtnClass ), false, "Active class is removed after a while" );
		start();
	}, 700 );
});
