define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

function assertDividers( assert, listview, indices, prefix ) {
	var index;

	assert.strictEqual( listview.children( ".ui-listview-item-divider" ).length, indices.length,
		prefix + "The correct number of dividers is present" );

	for ( index in indices ) {
		assert.hasClasses( listview.children()[ indices[ index ] ], "ui-listview-item-divider",
			prefix + "Item " + indices[ index ] + " is a divider" );
	}
}

var listview;

$( function() {
	listview = $( "#autodividers-test" ).listview( { autodividers: true } );
} );

QUnit.module( "listview.autodivider" );

QUnit.test( "Automatic dividers behave correctly", function( assert ) {
	assertDividers( assert, listview, [ 0, 4, 6, 8, 10, 12 ], "Initial: " );

	// Adding an item should not cause new dividers to appear but merely a shift down in index
	listview.children().eq( 2 ).before( "<li>Agnes</li>" ).end().end().listview( "refresh" );
	assertDividers( assert, listview, [ 0, 5, 7, 9, 11, 13 ], "Insert: " );

	// Put "Charlie" between "Andrew" and "Astrid" to create two new groups: "C" for Charlie and
	// the remainder of "A" ( "Astrid" ) under a second section titled "A"
	listview.children().eq( 4 ).before( "<li>Charlie</li>" ).end().end().listview( "refresh" );
	assertDividers( assert, listview, [ 0, 4, 6, 8, 10, 12, 14, 16 ], "Split: " );

	// Remove "Charlie", causing the two "A" sections to recoalesce
	listview.children().eq( 5 ).remove().end().end().listview( "refresh" );
	assertDividers( assert, listview, [ 0, 5, 7, 9, 11, 13 ], "Coalesce: " );

	// Remove the last element, causing a divider to end up in the last position
	listview.children().last().remove().end().end().listview( "refresh" );
	assertDividers( assert, listview, [ 0, 5, 7, 9, 11 ], "Last: " );

	// Plain removal rendering a divider superfluous
	listview.children().eq( 8 ).remove().end().end().listview( "refresh" );
	assertDividers( assert, listview, [ 0, 5, 7, 9 ], "Remove: " );

	// Removal of a divider results in the generation of a new one
	listview.children().eq( 7 ).remove().end().end().listview( "refresh" );
	assertDividers( assert, listview, [ 0, 5, 7, 9 ], "Remove divider: " );

	// Orphan multiple dividers at the same time
	listview.children().eq( 6 ).add( listview.children().eq( 8 ) ).remove();
	listview.listview( "refresh" );
	assertDividers( assert, listview, [ 0, 5 ], "Orphan multiple dividers: " );
} );

} );
