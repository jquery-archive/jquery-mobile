module( "Table integration tests" );

test( "Table refresh does not drop columns", function() {
	var table = $( "#refresh-column-count-test" ),
		checkbox = $( "#refresh-column-count-test-popup" )
			.find( "input" ).eq( 2 );

	checkbox.prop( "checked", false ).trigger( "change" );
	table.table( "refresh" );
	deepEqual( $( "thead tr > *:visible", table[ 0 ] ).length,
		$( "tbody tr:first > *:visible", table[ 0 ] ).length,
		"Number of visible headers columns equals number of visible " +
			"data columns" );
});

test( "Hidden columns stay hidden after row/column addition", function() {
	var table = $( "#refresh-hidden-column-test" );

	// Hide a column
	$( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 2 )
		.prop( "checked", false )
		.checkboxradio( "refresh" )
		.trigger( "change" );

	// Add a row
	table.children( "tbody" ).append( "<tr>" +
		"<th>11</th>" +
		"<td class='title'><a href='http://en.wikipedia.org/wiki/Day_of_the_triffids' " +
			"data-rel='external'>Day of the triffids</a></td>" +
		"<td>1963</td>" +
		"<td>78%</td>" +
		"<td>18</td>" +
		"</tr>" );
	table.table( "refresh" );

	deepEqual( $( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 2 ).prop( "checked" ),
		false, "Checkbox remains unchecked after row addition and table refresh" );

	// Add a column
	table.find( "thead tr th:nth(2)" ).before( "<th data-nstest-priority='4'>Test</th>" );
	table.find( "tbody tr th:nth(2)" ).each( function() {
		$( this ).before( "<td>Test</td>" );
	});
	table.table( "refresh" );

	deepEqual( $( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 3 ).prop( "checked" ),
		false, "Checkbox remains unchecked after row addition and table refresh" );
});
