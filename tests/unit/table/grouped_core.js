test( "Grouped headers have correct data", function() {

	var table = $( "#grouped-test-table" ),
		expectedCells = table.find( "[data-nstest-column]" ),
		header = table.find( "#test-column-header" );

	deepEqual( expectedCells.is( header.data( $.camelCase( $.mobile.ns + "cells" ) ) ), true,
		"header's 'cells' data item contains the right cells." );
});

test( "Reflow attributes are correct", function() {
	deepEqual( $( "#grouped-test-table" ).find( "#test-column-header" ).jqmData( "colstart" ), 5,
		"header's 'colstart' attribute points to the right column" );
});
