test( "Reflow table is destroyed/re-created correctly", function() {

	var enhancedTable,
		table = $( "#reflow-destroy-test" ),
		unenhancedState = $( "body" ).clone();

	table.table();

	enhancedState = $( "body" ).clone();

	table.table( "destroy" );

	deepEqual( $.testHelper.domEqual( $( "body" ), unenhancedState ), true,
		"After enhancing and destroying the table, the DOM is identical to the original state" );

	table.table();

	deepEqual( $.testHelper.domEqual( $( "body" ), enhancedState ), true,
		"After re-enhancing the table, the DOM is identical to the previous enhanced version" );

});
