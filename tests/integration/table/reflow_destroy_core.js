define( [ "qunit", "jquery" ], function( QUnit, $ ) {
QUnit.test( "Reflow table is destroyed/re-created correctly", function( assert ) {

	var table = $( "#reflow-destroy-test" ),
		unenhancedState = $( "body" ).clone();

	table.table();

	table.table( "destroy" );

	assert.deepEqual( $.testHelper.domEqual( $( "body" ), unenhancedState ), true,
		"After enhancing and destroying the table, the DOM is identical to the original state" );

	table.table();

	var enhancedState = $( "body" ).clone();

	table.table( "destroy" );

	table.table();

	assert.deepEqual( $.testHelper.domEqual( $( "body" ), enhancedState ), true,
		"After re-enhancing the table, the DOM is identical to the previous enhanced version" );

} );
} );
