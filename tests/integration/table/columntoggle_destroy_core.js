$.mobile.ns ="nstest-";

test( "Columntoggle table is destroyed", function() {

	var enhancedTable,
		table = $( "#columntoggle-destroy-test" ),
		unenhancedState = $( "body" ).clone();

	table.table();
	table.table( "destroy" );

	deepEqual( $.testHelper.domEqual( $( "body" ), unenhancedState ), true,
		"After enhancing and destroying the table, the DOM is identical to the original state" );

		deepEqual(
			table
				.find( "*" )
				.add( table )
					.filter( ":data(" + $.camelCase( $.mobile.ns + "input" ) + ")" ).length, 0,
			"All data at key 'input' has been removed after table destruction" );


} );

test( "Columntoggle table is destroyed/re-created correctly", function() {
	var enhancedState,
		table = $( "#columntoggle-destroy-test" );

	table.table();
	enhancedState = $( "body" ).clone();
	table.table( "destroy" );
	table.table();

	deepEqual( $.testHelper.domEqual( $( "body" ), enhancedState ), true,
		"After re-enhancing the table, the DOM is identical to the previous enhanced version" );

		deepEqual(
				table
					.find( "*" )
					.add( table )
						.filter( ":data(" + $.camelCase( $.mobile.ns + "input" ) + ")" ).length, 4,
				"Four elements have data at key 'input' after table construction" );

});
