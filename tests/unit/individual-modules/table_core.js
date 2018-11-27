define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.test( "Reflow table is enhanced correctly", function( assert ) {
	var table = $( "#reflow-test" ).table();

	assert.deepEqual( table.hasClass( "ui-table" ), true, "Table has class 'ui-table'" );
	assert.deepEqual( table.hasClass( "ui-table-reflow" ), true, "Table has class 'ui-table-reflow'" );
	assert.deepEqual(
		table
			.children( "thead" )
				.children()
					.children()
					.is( table.children( "thead" )
						.children()
							.children( "[data-" + $.mobile.ns + "colstart]" ) ), true,
		"All thead cells have the '[data-colstart]' attribute" );
	assert.deepEqual( table.children( "tbody" ).children().children().is( function() {
		return ( $( this ).children( "b.ui-table-cell-label" ).length !== 1 );
	} ), false, "All tbody cells have a bold child with class ui-table-cell-label" );
} );

QUnit.test( "Columntoggle table is enhanced correctly", function( assert ) {
	var table = $( "#columntoggle-test" ).table(),
		correctPriorities = true;

	assert.deepEqual( table.hasClass( "ui-table" ), true, "Table has class 'ui-table'" );
	assert.deepEqual( table.hasClass( "ui-table-columntoggle" ), true,
		"Table has class 'ui-table-column-toggle'" );
	assert.deepEqual( $( "a[href='#columntoggle-test-popup']#columntoggle-test-button" ).length, 1,
		"A button with id 'columntoggle-test-button' and href='#columntoggle-test-popup' exists" );
	assert.deepEqual( $( "#columntoggle-test-popup:data(mobile-popup)" ).length, 1,
		"A popup widget with id 'columntoggle-test-popup' exists" );

	// Try to find incorrectly assigned priority classes
	table.children( "thead" ).children().children().each( function( index ) {
		var cell = $( this ),
			priority = cell.attr( "data-" + $.mobile.ns + "priority" );

		if ( priority ) {
			correctPriorities =
				( table
					.children( "tbody" )
						.children()
							.children( ":nth(" + index + ")" )
								.filter( ":not(.ui-table-priority-" + priority + ")" )
									.length === 0 );
		}

		// If incorrect priorities have been identified, stop .each()-ing
		return correctPriorities;
	} );

	assert.deepEqual( correctPriorities, true,
		"All tbody cells have priority classes assigned in accordance with their header " +
			"'data-priority' value" );
} );
} );
