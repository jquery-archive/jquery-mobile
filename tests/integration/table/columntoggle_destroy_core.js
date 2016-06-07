define( [ "qunit", "jquery" ], function( QUnit, $ ) {

$.mobile.ns = "nstest-";

QUnit.test( "Columntoggle table is destroyed", function( assert ) {

	var table = $( "#columntoggle-destroy-test" ),
		unenhancedState = $( "body" ).clone();

	table.table();
	table.table( "destroy" );

	assert.deepEqual( $.testHelper.domEqual( $( "body" ), unenhancedState ), true,
		"After enhancing and destroying the table, the DOM is identical to the original state" );

	assert.deepEqual(
			table
				.find( "*" )
				.add( table )
					.filter( ":data(" + $.camelCase( $.mobile.ns + "input" ) + ")" ).length, 0,
			"All data at key 'input' has been removed after table destruction" );

} );

QUnit.test( "Columntoggle table is destroyed/re-created correctly", function( assert ) {
	var enhancedState,
		table = $( "#columntoggle-destroy-test" );

	table.table();
	enhancedState = $( "body" ).clone();
	table.table( "destroy" );
	table.table();

	assert.deepEqual( $.testHelper.domEqual( $( "body" ), enhancedState ), true,
		"After re-enhancing the table, the DOM is identical to the previous enhanced version" );

	assert.deepEqual(
				table
					.find( "*" )
					.add( table )
						.filter( ":data(" + $.camelCase( $.mobile.ns + "input" ) + ")" ).length, 4,
				"Four elements have data at key 'input' after table construction" );

} );
} );
