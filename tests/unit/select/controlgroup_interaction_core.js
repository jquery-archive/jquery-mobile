define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Controlgroup interaction", function( assert ) {
	var group = $( "#group" );
	var select1 = $( "#select1" );
	var selectButton1 = select1.parent();
	var selectButton2 = $( "#select2" ).parent();

	assert.expect( 9 );

	assert.lacksClasses( selectButton1, "ui-shadow",
		"In the horizontal orientation the select menu has no shadow" );
	assert.hasClasses( selectButton1.parent(), "ui-button-inline",
		"In the horizontal orientation the select menu is inline" );
	assert.hasClasses( selectButton1, "ui-corner-left",
		"in the horizontal orientation the first select menu has left corners" );
	assert.hasClasses( selectButton2, "ui-corner-right",
		"in the horizontal orientation the last select menu has right corners" );

	group.controlgroup( "option", "direction", "vertical" );

	assert.lacksClasses( selectButton1, "ui-shadow",
		"In the vertical orientation the select menu has no shadow" );
	assert.lacksClasses( selectButton1.parent(), "ui-button-inline",
		"In the vertical orientation the select menu is not inline" );
	assert.hasClasses( selectButton1, "ui-corner-top",
		"in the vertical orientation the first select menu has top corners" );
	assert.hasClasses( selectButton2, "ui-corner-bottom",
		"in the vertical orientation the last select menu has bottom corners" );

	select1.selectmenu( "destroy" ).remove();
	group.controlgroup( "refresh" );

	assert.hasClasses( selectButton2, "ui-corner-all",
		"When there's only one select, it has classes ui-corner-all" );
} );

QUnit.test( "Disabled selects", function( assert ) {
	var group = $( "#disabled-group" );
	var button1 = $( "#disabled-select1" ).parent();
	var button2 = $( "#disabled-select2" ).parent();
	var button3 = $( "#disabled-select3" ).parent();

	assert.hasClasses( button1, "ui-corner-left", "First select has class ui-corner-left" );
	assert.lacksClasses( button1, "ui-corner-right ui-corner-all",
		"First select lacks both ui-corner-right and ui-corner-all" );
	assert.lacksClassStart( button2,
		"ui-corner-", "Middle select has no classes that start with 'ui-corner-'" );
	assert.hasClasses( button3, "ui-corner-right", "Last select has class ui-corner-right" );
	assert.lacksClasses( button3, "ui-corner-left ui-corner-all",
		"Last select lacks both ui-corner-left and ui-corner-all" );

	group.controlgroup( "option", "direction", "vertical" );

	assert.hasClasses( button1, "ui-corner-top", "First select has class ui-corner-top" );
	assert.lacksClasses( button1, "ui-corner-bottom ui-corner-all",
		"First select lacks both ui-corner-bottom and ui-corner-all" );
	assert.lacksClassStart( button2,
		"ui-corner-", "Middle select has no classes that start with 'ui-corner-'" );
	assert.hasClasses( button3, "ui-corner-bottom", "Last select has class ui-corner-bottom" );
	assert.lacksClasses( button3, "ui-corner-top ui-corner-all",
		"Last select lacks both ui-corner-top and ui-corner-all" );
} );

} );
