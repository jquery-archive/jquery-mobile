test( "Grouped headers have correct data", function() {

	var table = $( "#grouped-test-table" ),
		expectedCells = table.find( "[data-column]" ),
		header = table.find( "#test-column-header" );

	deepEqual( expectedCells.is( header.data( $.camelCase( $.mobile.ns + "cells" ) ) ), true,
		"header's 'cells' data item contains the right cells." );
});

test( "Reflow attributes and classes are correct", function() {
	var table = $( "#grouped-test-table" );

	deepEqual( table.find( "#test-column-header" ).jqmData( "colstart" ), 5,
		"header's 'colstart' attribute points to the right column" );
	deepEqual(
		table.find( "[data-top-label]" ).is( function() {
			var cell = $( this );

			return !(
				cell
					.children( "b.ui-table-cell-label:not(.ui-table-cell-label-top)" )
						.length === 1 &&
				cell
					.children( "b.ui-table-cell-label.ui-table-cell-label-top" )
						.length === 1 );
		}),
		false,
		"Cells in the first of a group of columns have both group and column reflow mode labels" );
});
