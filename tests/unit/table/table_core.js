( function() {

var tableProto = $.mobile.table.prototype;

function test_create( prefix, enhanced, disabled ) {

	test( "_create()", function() {
		var expectDisabledClass = !enhanced && disabled,
			context = {
				refresh: $.noop,
				element: $( "<table>" ),
				options: {
					disabled: disabled,
					enhanced: enhanced,
					classes: {
						table: "xyzzy"
					}
				}
			};

		tableProto._create.call( context );

		deepEqual( context.element.hasClass( "xyzzy" ), !enhanced, prefix + "table class " +
			( enhanced ? "not " : "" ) + "added" );
		deepEqual( context.element.hasClass( "ui-state-disabled" ), expectDisabledClass,
			prefix + "disabled class presence is as expected" );
	});
}

test_create( "Normal and enabled: ", false, false );
test_create( "Normal and disabled: ", false, true );
test_create( "Pre-rendered: ", true, false );

test( "_setOptions()", function() {
	var context = {
		options: {},
		widget: function() { return this.element; },
		hoverable: $([]),
		focusable: $([]),
		element: $( "<table>" ),
		_setOption: $.mobile.table.prototype._setOption,
		_setOptions: $.mobile.table.prototype._setOptions
	};

	tableProto._setOptions.call( context, { disabled: true } );

	deepEqual( context.element.hasClass( "ui-state-disabled" ), true,
		"_setOptions({ disabled: true }) adds class 'ui-state-disabled'" );

	tableProto._setOptions.call( context, { disabled: false } );

	deepEqual( context.element.hasClass( "ui-state-disabled" ), false,
		"_setOptions({ disabled: false }) removes class 'ui-state-disabled'" );
});

function test_setHeaders( prefix, element ) {
	var instance = { element: element },
		expected = {
			headerRows: element.find( "[data-header-rows]" ),
			headers: element.find( "[data-headers]" ),
			allHeaders: element.find( "[data-all-headers]" ),
			allRowsExceptFirst: element.find( "[data-all-rows-except-first]" )
		};

	test( prefix + "_setHeaders()", function() {
		tableProto._setHeaders.call( instance );
		$.each( expected, function( key, value ) {
			var messagePrefix = prefix + "_setHeaders(): " + key;

			deepEqual( !!instance[ key ], true, messagePrefix + ": present on instance" );
			deepEqual( instance[ key ].length, expected[ key ].length,
				messagePrefix + " has the right length" );
			deepEqual( instance[ key ].is( function( index, actualElement ) {
					return !expected[ key ].is( actualElement );
				}), false, messagePrefix + " contains the right elements" );
		});
	});
}

test_setHeaders( "Basic table: ", $( "#table-enhance-test" ) );
test_setHeaders( "Grouped headers table: ", $( "#grouped-test-table" ) );

function test_refreshHeaderCell( prefix, element, expectedReturnValue, columnCount ) {
	var instance = {
			element: element,
			allRowsExceptFirst: element.find( "[data-all-rows-except-first]" )
		},
		headerCell = element.find( "[data-test-header-cell]" ),
		expectedCells = element.find( "[data-test-header-expected-cells]" );

	test( prefix + "_refreshHeaderCell()", function() {
		var returnValue = tableProto._refreshHeaderCell
			.call( instance, null, headerCell[ 0 ], columnCount ),
			cells = headerCell.jqmData( "cells" );

		deepEqual( returnValue, expectedReturnValue, prefix + "return value is correct" );
		deepEqual( !!cells, true, prefix + "jqmData('cells') is assigned" );
		deepEqual( cells.length, expectedCells.length, prefix + "'cells' has the right length" );
		deepEqual( cells.is( function( index, cell ) {
			return !expectedCells.is( cell );
		}), false, prefix + "'cells' contains the right elements" );
	});
}

test_refreshHeaderCell( "Basic table: ", $( "#table-enhance-test" ), 0, 0 );
test_refreshHeaderCell( "Grouped headers table: ", $( "#grouped-test-table" ), 3, 1 );

test( "_refreshHeaderRow() iterates over all of a row's children", function() {
	var cellsVisited = [],
		row = $( "#table-enhance-test [data-test-header-row]" ),
		expectedChildren = row.children();

	tableProto._refreshHeaderRow.call({
		_refreshHeaderCell: function( index, element, columnCount ) {
			cellsVisited.push( element );
		},
		allRowsExceptFirst: $( "#table-enhance-test [data-all-rows-except-first]" ),
	}, null, row[ 0 ] );
	deepEqual( cellsVisited.length, expectedChildren.length,
		"The right number of cells were visited" );
	deepEqual( $( cellsVisited ).is( function( index, actualChild ) {
			return !expectedChildren.is( actualChild );
		}), false, "All the row's cells were visited" );
});

test( "refresh() iterates over all the rows of a table", function() {
	var rowsVisited = [],
		table = $( "#grouped-test-table" ),
		expectedChildren = table.find( "thead tr" );

	tableProto.refresh.call({
		_setHeaders: tableProto._setHeaders,
		_refreshHeaderRow: function( rowIndex, element ) {
			rowsVisited.push( element );
		},
		element: table
	});
	deepEqual( rowsVisited.length, expectedChildren.length,
		"The right number of rows were visited" );
	deepEqual( $( rowsVisited ).is( function( index, actualChild ) {
			return !expectedChildren.is( actualChild );
		}), false, "All the table's rows were visited" );
});

function test_destroy( prefix, enhanced ) {
	test( prefix + "_destroy() undoes table-related changes", function() {
		var table = $( "#destroy-test" )
				.clone()
				.find( "thead tr" )
					.children()
						.each( function( index, element ) {
							$( element ).jqmData( "cells", true );
						})
					.end()
				.end()
				.addClass( tableProto.options.classes.table );

		tableProto._destroy.call({
			element: table,
			options: {
				enhanced: enhanced,
				classes: {
					table: tableProto.options.classes.table
				}
			}
		});

		deepEqual( table.hasClass( tableProto.options.classes.table ), enhanced,
			prefix + "Table does not have class '" + tableProto.options.classes.table + "' after _destroy()" );
		deepEqual( table.find( "thead tr" ).children().is( function( index, element ) {
				return !!$( element ).jqmData( "cells" );
			}), false, prefix + "'cells' data has been removed" );
	});
}

test_destroy( "Normal: ", false );
test_destroy( "Pre-rendered: ", true );

})();
