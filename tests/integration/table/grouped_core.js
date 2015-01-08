function runAssertions( prefix, table, expectedColstart ) {
	var expectedCells = table.find( "[data-column]" ),
		header = table.find( ".test-column-header" );

	deepEqual( header.data( $.camelCase( $.mobile.ns + "cells" ) ).is( function( index, cell ) {
			return ( expectedCells.index( cell ) < 0 );
		}), false,
		prefix + "header's 'cells' data item contains the right cells." );

	deepEqual( table.find( ".test-column-header" ).jqmData( "colstart" ), expectedColstart,
		prefix + "header's 'colstart' attribute points to the right column" );
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
		prefix + "Cells in the first of a group of columns have both group and column reflow labels" );
}



function beforeAndAfterRefresh( prefix, table, expectedColStart ) {
	test( prefix + "correct rendering", function() {
		runAssertions( "initially: ", table, expectedColStart );
		table.table( "refresh" );
		runAssertions( "after refresh(): ", table, expectedColStart );
	});
}

beforeAndAfterRefresh( "With colspan: ", $( "#grouped-test-table" ), 5 );
beforeAndAfterRefresh( "Without colspan: ", $( "#single-column-grouped" ), 1 );
