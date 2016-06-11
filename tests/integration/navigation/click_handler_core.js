define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

QUnit.module( "Click handler" );

QUnit.test( "Active class is removed from reset button", function( assert ) {
	var ready = assert.async();
	var button = $( "#reset-button" ).click();

	assert.expect( 2 );

	assert.deepEqual( button.hasClass( "ui-button-active" ), true, "When clicked, reset button gets active class" );

	setTimeout( function() {
		assert.deepEqual( button.hasClass( "ui-button-active" ), false, "Active class is removed after a while" );
		ready();
	}, 700 );
} );
} );
