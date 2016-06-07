define( [ "qunit", "jquery" ], function( QUnit, $ ) {
$.mobile.ns = "nstest-";

QUnit.test( "Prerendered basic table is destroyed/re-created correctly", function( assert ) {

	var table = $( "#table-prerendered-destroy-test" ),
		unenhancedState = $( "body" ).clone();

	table.table();

	table.table( "destroy" );

		assert.deepEqual( $.testHelper.domEqual( $( "body" ), unenhancedState ), true,
		"After enhancing and destroying the table, the DOM is identical to the original state" );

assert.deepEqual(
		table.find( "*" )
			.add( table )
			.filter( ":data(" + $.camelCase( $.mobile.ns + "cells" ) + ")" ).length, 0,
		"No table elements have data at key 'cells' after destruction" );

	table.table();

	assert.deepEqual(
		table.find( "*" )
			.add( table )
			.filter( ":data(" + $.camelCase( $.mobile.ns + "cells" ) + ")" ).length, 5,
		"Four table elements have data at key 'cells' after construction" );

	var enhancedState = $( "body" ).clone();

	table.table( "destroy" );

	table.table();

	assert.deepEqual( $.testHelper.domEqual( $( "body" ), enhancedState ), true,
		"After re-enhancing the table, the DOM is identical to the previous enhanced version" );

} );
} );
