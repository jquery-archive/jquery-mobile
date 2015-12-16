define( [ "qunit", "jquery" ], function( QUnit, $ ) {

$.mobile.ns = "nstest-";

QUnit.skip( "Heading label added for empty heading", function( assert ) {
	$( "#test-reflow-headings" ).table();
	assert.deepEqual( $( "#interesting-cell" ).children( "b.ui-table-cell-label" ).length, 1,
		"Cell beneath empty heading has a copy of the heading" );
} );

} );
