define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
QUnit.test( "Columntoggle table correctly sets priority classes", function( assert ) {
	var table = $( "#no-ui-test" );

		table.children().children().children( ":nth(0)" ).is( function() {
			assert.hasClasses( $( this ), "ui-table-priority-2" );
		} );

	assert.deepEqual(
		table.children().children().children( ":nth(1)" ).is( function() {
			var index,
				classes = this.className.split( " " );

			for ( index in classes ) {
				if ( classes[ index ].match( /ui-table-priority-[0-9]+/ ) ) {
					return true;
				}
			}
			return false;
		} ),
		false,
		"Members of the second column have no 'ui-table-priority-<number>' class" );

		table.children().children().children( ":nth(2)" ).is( function() {
			assert.hasClasses( $( this ), "ui-table-priority-3" );
		} );

		table.children().children().children( ":nth(3)" ).is( function() {
			assert.hasClasses( $( this ), "ui-table-priority-1" );
		} );

		table.children().children().children( ":nth(4)" ).is( function() {
			assert.hasClasses( $( this ), "ui-table-priority-5" );
		} );
} );

QUnit.test( "setColumnVisibility() correctly resolves column from index/cell", function( assert ) {
	var table = $( "#setColumnVisibility-test" ),
		affectedCells = $( "[data-column-under-test]", table[ 0 ] );

	table.table( "setColumnVisibility", 1, true );
	assert.deepEqual( table.find( ".ui-table-cell-visible" ).is( affectedCells ), true,
		"Turning on visibility by index affects only the expected cells" );

	table.table( "setColumnVisibility", affectedCells.eq( 0 ), false );
	assert.deepEqual( table.find( ".ui-table-cell-hidden" ).is( affectedCells ), true,
		"Turning off visibility by thead cell affects only the expected cells" );

	table.table( "setColumnVisibility", affectedCells.eq( 2 ), true );
	assert.deepEqual( table.find( ".ui-table-cell-visible" ).is( affectedCells ), true,
		"Turning on visibility by tbody cell affects only the expected cells" );
} );
} );
