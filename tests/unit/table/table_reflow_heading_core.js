test( "Heading label added for empty heading", function() {
$( "#test-reflow-headings" ).table();
deepEqual( $( "#interesting-cell" ).children( "b.ui-table-cell-label" ).length, 1,
	"Cell beneath empty heading has a copy of the heading" );
} );
