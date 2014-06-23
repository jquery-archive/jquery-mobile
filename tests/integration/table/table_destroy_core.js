$.mobile.ns = "nstest-";

test( "Basic table is destroyed/re-created correctly", function() {

	var enhancedTable,
		table = $( "#table-destroy-test" ),
		unenhancedState = $( "body" ).clone();

	table.table();

	deepEqual(
		table.find( "*" )
			.add( table )
			.filter( ":data(" + $.camelCase( $.mobile.ns + "cells" ) + ")" ).length, 5,
		"Four table elements have data at key 'cells' after construction" );

	enhancedState = $( "body" ).clone();

	table.table( "destroy" );

	deepEqual(
		table.find( "*" )
			.add( table )
			.filter( ":data(" + $.camelCase( $.mobile.ns + "cells" ) + ")" ).length, 0,
		"No table elements have data at key 'cells' after destruction" );

	deepEqual( $.testHelper.domEqual( $( "body" ), unenhancedState ), true,
		"After enhancing and destroying the table, the DOM is identical to the original state" );

	table.table();

	deepEqual( $.testHelper.domEqual( $( "body" ), enhancedState ), true,
		"After re-enhancing the table, the DOM is identical to the previous enhanced version" );

});
