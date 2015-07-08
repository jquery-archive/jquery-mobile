module( "Click handler" );

asyncTest( "Active class is removed from reset button", function() {
var button = $( "#reset-button" ).click();

expect( 2 );

deepEqual( button.hasClass( "ui-button-active" ), true, "When clicked, reset button gets active class" );

setTimeout( function() {
	deepEqual( button.hasClass( "ui-button-active" ), false, "Active class is removed after a while" );
	start();
}, 700 );
} );
