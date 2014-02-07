module( "Table integration tests" );

test( "Table refresh does not drop columns", function() {
	var eventNs = ".tableRefreshDoesNotDropColumns",
		table = $( "#refresh-column-count-test" ),
		checkbox = $( "#refresh-column-count-test-popup" )
			.find( "input" ).eq( 2 );

	expect( 1 );

	checkbox.prop( "checked", false ).trigger( "change" );
	table.table( "refresh" );
	deepEqual( $( "thead tr > *:visible", table[ 0 ] ).length,
		$( "tbody tr:first > *:visible", table[ 0 ] ).length,
		"Number of visible headers columns equals number of visible " +
			"data columns" );
});
