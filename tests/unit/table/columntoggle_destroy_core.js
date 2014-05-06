$.mobile.ns ="nstest-";

test( "Columntoggle table is destroyed/re-created correctly", function() {

	var enhancedTable,
		table = $( "#columntoggle-destroy-test" ),
		unenhancedState = $( "body" ).clone();

	table.table();

	deepEqual(
		table
			.find( "*" )
			.add( table )
				.filter( ":data(" + $.camelCase( $.mobile.ns + "input" ) + ")" ).length, 4,
		"Four elements have data at key 'input' after table construction" );

	enhancedState = $( "body" ).clone();

	table.table( "destroy" );

	deepEqual(
		table
			.find( "*" )
			.add( table )
				.filter( ":data(" + $.camelCase( $.mobile.ns + "input" ) + ")" ).length, 0,
		"All data at key 'input' has been removed after table destruction" );

	deepEqual( $.testHelper.domEqual( $( "body" ), unenhancedState ), true,
		"After enhancing and destroying the table, the DOM is identical to the original state" );

	table.table();

	deepEqual( $.testHelper.domEqual( $( "body" ), enhancedState ), true,
		"After re-enhancing the table, the DOM is identical to the previous enhanced version" );

});
