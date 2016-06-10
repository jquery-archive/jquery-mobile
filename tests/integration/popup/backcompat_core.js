define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Synchronization between style options and the classes option", function( assert ) {
	var popup = $( "#backcompat-test" ),
		arrow = $( "#backcompat-test" ).find( ".ui-popup-arrow" );

	assert.hasClasses( arrow, "ui-overlay-shadow", "Initially shadow is on arrow" );
	assert.hasClasses( popup, "ui-overlay-shadow", "Initially shadow is on popup" );

	popup.popup( "option", "classes.ui-popup", "ui-corner-all" );
	assert.lacksClasses( arrow, "ui-overlay-shadow",
		"No shadow class on arrow when ui-overlay-shadow absent from ui-popup" );
	assert.strictEqual( popup.popup( "option", "shadow" ), false,
		"shadow option is false when class ui-overlay-shadow absent from ui-popup" );

	popup.popup( "option", "classes.ui-popup", "ui-corner-all ui-overlay-shadow" );
	assert.hasClasses( arrow, "ui-overlay-shadow",
		"Shadow on when ui-overlay-shadow present on ui-popup" );
	assert.strictEqual( popup.popup( "option", "shadow" ), true,
		"shadow option is true when class ui-overlay-shadow present on ui-popup" );

	popup.popup( "option", "shadow", false );
	assert.lacksClasses( arrow, "ui-overlay-shadow", "No shadow on arrow when option turned off" );
	assert.lacksClasses( popup, "ui-overlay-shadow", "No shadow on popup when option turned off" );

	popup.popup( "option", "shadow", true );
	assert.hasClasses( arrow, "ui-overlay-shadow", "Shadow is on arrow when option turned on" );
	assert.hasClasses( popup, "ui-overlay-shadow", "Shadow is on popup when option turned on" );
} );

} );
