define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
var tableProto = $.mobile.table.prototype;
function testCreate( prefix, enhanced, disabled ) {

	QUnit.test( prefix + "_create()", function( assert ) {
		var expectDisabledClass = !enhanced && disabled;
		var tableElement = $( "<table>" ).table( {
				disabled: disabled,
				enhanced: enhanced,
				classes: {
					"ui-table": "xyzzy"
				}
			} );

			if ( !enhanced ) {
				assert.hasClasses( tableElement, "xyzzy" );
			} else {
				assert.lacksClasses( tableElement, "xyzzy" );
			}

			if ( expectDisabledClass ) {
				assert.hasClasses( tableElement, "ui-state-disabled" );
			}
	} );
}

testCreate( "Normal and enabled: ", false, false );
testCreate( "Normal and disabled: ", false, true );
testCreate( "Pre-rendered: ", true, false );

QUnit.test( "_setOptions()", function( assert ) {
	var table = $( "<table>" ).table( {
			disabled: true
	} );

	assert.hasClasses( table, "ui-state-disabled" );

	table = $( "<table>" ).table( {
			disabled: false
	} );

	assert.lacksClasses( table, "ui-state-disabled" );
} );

function testSetHeaders( prefix, element ) {
	var instance = { element: element },
		expected = {
			headerRows: element.find( "[data-header-rows]" ),
			headers: element.find( "[data-headers]" ),
			allHeaders: element.find( "[data-all-headers]" ),
			allRowsExceptFirst: element.find( "[data-all-rows-except-first]" )
		};

	QUnit.test( prefix + "_setHeaders()", function( assert ) {
		tableProto._setHeaders.call( instance );
		$.each( expected, function( key ) {
			var messagePrefix = prefix + "_setHeaders(): " + key;

			assert.deepEqual( !!instance[ key ], true,
				messagePrefix + ": present on instance" );
			assert.deepEqual( instance[ key ].length, expected[ key ].length,
				messagePrefix + " has the right length" );
			assert.deepEqual( instance[ key ].is( function( index, actualElement ) {
					return !expected[ key ].is( actualElement );
				} ), false, messagePrefix + " contains the right elements" );
		} );
	} );
}

testSetHeaders( "Basic table: ", $( "#table-enhance-test" ) );
testSetHeaders( "Grouped headers table: ", $( "#grouped-test-table" ) );

function testRefreshHeaderCell( prefix, element, expectedReturnValue, columnCount ) {
	var instance = {
			element: element,
			allRowsExceptFirst: element.find( "[data-all-rows-except-first]" )
		},
		headerCell = element.find( "[data-test-header-cell]" ),
		expectedCells = element.find( "[data-test-header-expected-cells]" );

	QUnit.skip( prefix + "_refreshHeaderCell()", function( assert ) {
		var returnValue = tableProto._refreshHeaderCell
			.call( instance, null, headerCell[ 0 ], columnCount ),
			cells = headerCell.jqmData( "cells" );

		assert.deepEqual( returnValue, expectedReturnValue, prefix + "return value is correct" );
		assert.deepEqual( !!cells, true, prefix + "jqmData('cells') is assigned" );
		assert.deepEqual( cells.length, expectedCells.length,
			prefix + "'cells' has the right length"  );
		assert.deepEqual( cells.is( function( index, cell ) {
			return !expectedCells.is( cell );
		} ), false, prefix + "'cells' contains the right elements" );
	} );
}

testRefreshHeaderCell( "Basic table: ", $( "#table-enhance-test" ), 0, 0 );
testRefreshHeaderCell( "Grouped headers table: ", $( "#grouped-test-table" ), 3, 1 );

QUnit.test( "_refreshHeaderRow() iterates over all of a row's children", function( assert ) {
	var cellsVisited = [],
		row = $( "#table-enhance-test [data-test-header-row]" ),
		expectedChildren = row.children();

	tableProto._refreshHeaderRow.call( {
		_refreshHeaderCell: function( index, element ) {
			cellsVisited.push( element );
		},
		allRowsExceptFirst: $( "#table-enhance-test [data-all-rows-except-first]" )
	}, null, row[ 0 ] );
	assert.deepEqual( cellsVisited.length, expectedChildren.length,
		"The right number of cells were visited" );
	assert.deepEqual( $( cellsVisited ).is( function( index, actualChild ) {
			return !expectedChildren.is( actualChild );
		} ), false, "All the row's cells were visited" );
} );

QUnit.test( "refresh() iterates over all the rows of a table", function( assert ) {
	var rowsVisited = [],
		table = $( "#grouped-test-table" ),
		expectedChildren = table.find( "thead tr" );

	tableProto.refresh.call( {
		_setHeaders: tableProto._setHeaders,
		_refreshHeaderRow: function( rowIndex, element ) {
			rowsVisited.push( element );
		},
		element: table
	} );
	assert.deepEqual( rowsVisited.length, expectedChildren.length,
		"The right number of rows were visited" );
	assert.deepEqual( $( rowsVisited ).is( function( index, actualChild ) {
			return !expectedChildren.is( actualChild );
		} ), false, "All the table's rows were visited" );
} );

function testDestroy( prefix ) {
	QUnit.test( prefix + "_destroy() undoes table-related changes", function( assert ) {
		var testClass = "foo";
		var table = $( "#destroy-test" )
				.clone()
				.find( "thead tr" )
					.children()
						.each( function( index, element ) {
							$( element ).jqmData( "cells", true );
						} )
					.end()
				.end()
				.addClass( testClass )
				.table();

		table.table( "destroy" );
		assert.deepEqual( table.find( "thead tr" ).children().is( function( index, element ) {
				return !!$( element ).jqmData( "cells" );
			} ), false, prefix + "'cells' data has been removed" );
	} );
}

testDestroy( "Normal: ", false );
testDestroy( "Pre-rendered: ", true );

} );
