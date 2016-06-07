define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

var tableProto = $.mobile.table.prototype;

function testCreate( prefix, mode, enhanced ) {

	QUnit.test( prefix + "_create()", function( assert ) {
		var context = {
				refresh: $.noop,
				element: $( "<table>" ),
				options: {
					mode: mode,
					enhanced: enhanced,
					classes: {
						reflowTable: "simsalabim"
					}
				}
			},
			reflowExpected = ( mode === "reflow" && !enhanced );

		tableProto._create.apply( context );

		if ( reflowExpected ) {
			assert.hasClasses( context.element, "simsalabim" );
		} else {
			assert.lacksClasses( context.element, "simsalabim" );
		}
	} );
}

// Test_create( "Normal reflow: ", "reflow", false );
testCreate( "Enhanced reflow: ", "reflow", true );
// Test_create( "Normal non-reflow: ", "abc", false );
testCreate( "Enhanced non-reflow: ", "abc", true );

QUnit.test( "_refreshHeaderCell()", function( assert ) {
	var header = $( "<th>" );

	tableProto._refreshHeaderCell.call( {
		element: $(),
		allRowsExceptFirst: $()
	}, -1, header[ 0 ], 0 );

	assert.deepEqual( $.mobile.getAttribute( header, "colstart" ), 1,
		"data-attribute 'colstart' was correctly set" );
} );

QUnit.test( "refresh() iterates over headers in reverse", function( assert ) {
	var correctOrder,
		table = $( "#refresh-test" ),
		count = 0,
		lastIndex = -1,
		context = {
			options: {
				mode: "reflow"
			},
			element: table,
			_setHeaders: tableProto._setHeaders,
			_refreshHeaderRow: tableProto._refreshHeaderRow,
			_refreshHeaderCell: tableProto._refreshHeaderCell,
			_updateCellsFromHeader: function( index, headerCell ) {
				var headerIndex = this.allHeaders.index( headerCell );

				count++;

				if ( -1 === lastIndex ) {
					lastIndex = headerIndex;
					correctOrder = ( lastIndex === ( this.allHeaders.length - 1 ) );
				} else {
					correctOrder = correctOrder && ( headerIndex < lastIndex );
					lastIndex = headerIndex;
				}
			}
		};

	tableProto.refresh.call( context );

	assert.deepEqual( count, context.allHeaders.length,
		"refresh() calls _updateCellsFromHeader() for all header cells" );

	assert.deepEqual( correctOrder,
		true, "refresh() traverses header cells in the correct order" );
} );

QUnit.skip(
	"_updateCellsFromHeader() promulgates header contents to cell <b> tags",
	function( assert ) {
		var table = $( "#update-cells-test" ).clone(),
			cellsProp = table
				.find( "[data-cell-under-test]" )
					.not( "thead [data-cell-under-test]" ),
			header = table
				.find( "thead [data-cell-under-test]" )
					.jqmData( "cells", cellsProp );

		tableProto._updateCellsFromHeader.call( {
			options: {
				classes: {
					cellLabels: "test-cell-labels",
					cellLabelsTop: "test-cell-labels-top"
				}
			},
			_addLabels: function( cells, labelClasses, contents ) {
				assert.deepEqual( cells, cellsProp,
					"The right cells are passed to _addLabels()" );
				assert.deepEqual( labelClasses, "test-cell-labels",
					"The right label classes are added" );
				assert.deepEqual( header.text(),
					$( "<div>" ).append( contents.clone() ).text(),
					"The right text is assigned to the <b> tag" );
			}
		}, -1, header[ 0 ] );
} );

function test_updateCellsFromHeader_grouped( prefix, table ) {
	QUnit.skip(
		prefix + "_updateCellsFromHeader() promulgates grouped header contents to cell <b> tags",
		function( assert ) {
			var cellsProp = table.find( "[data-column]" ),
				header = table
					.find( ".test-column-header" )
						.jqmData( "cells", cellsProp );

			tableProto._updateCellsFromHeader.call( {
				options: {
					classes: {
						cellLabels: "test-cell-labels",
						cellLabelsTop: "test-cell-labels-top"
					}
				},
				_addLabels: function( cells, labelClasses, contents ) {
					assert.deepEqual( table.find( "[data-column][data-top-label]" )
						.is( function( index, cell ) {
							return ( cells.index( cell ) < 0 );
						} ), false,
						"The right cells are passed to _addLabels()" );
					assert.deepEqual( labelClasses.split( " " ).sort(),
						[ "test-cell-labels", "test-cell-labels-top" ],
						"The right label classes are added" );
					assert.deepEqual( header.text(),
						$( "<div>" ).append( contents.clone() ).text(),
						"The right text is assigned to the <b> tag" );
				}
			}, -1, header[ 0 ] );
		} );
}

test_updateCellsFromHeader_grouped(
	"Grouped headers (with colspan): ",
	$( "#update-cells-grouped" ) );
test_updateCellsFromHeader_grouped(
	"Grouped headers (without colspan): ",
	$( "#update-cells-grouped-single" ) );

QUnit.skip( "_addLabels() appends labels correctly", function( assert ) {
	var contents = $( "<div>ABC</div>" ).contents(),
		cells = $( "<td></td><td><b class='test-class'>ABC</b></td>" );

	tableProto._addLabels( cells, "test-class", contents );

	assert.deepEqual( cells.is( function( index, cell ) {
		return ( $( cell ).children( "b.test-class" ).length !== 1 );
	} ),
	false, "Only one <b> was added, and only if one was not already present" );
} );

QUnit.skip( "_destroy() correctly removes markup", function( assert ) {
	var table = $( "#destroy-test-enhanced" ).clone().removeAttr( "id" ),
		unenhancedTable = $( "#destroy-test-destroyed" ).clone().removeAttr( "id" ),
		options = {
			classes: {
				table: "ui-table",
				reflowTable: "ui-table-reflow",
				cellLabels: "ui-table-cell-label"
			}
		},
		assertOneCase = function( tableToTest, enhanced, mode, desiredState, message ) {
			tableProto._destroy.call( {
				options: $.extend( options, {
					enhanced: enhanced,
					mode: mode
				} ),
				element: tableToTest
			} );

			assert.deepEqual( $.testHelper.domEqual( tableToTest, desiredState ), true, message );
		};

	assertOneCase( table.clone(), false, "reflow", unenhancedTable,
		"Not enhanced and mode 'reflow': DOM is returned to its unenhanced state" );

	assertOneCase( table.clone(), true, "reflow", table,
		"Enhanced and mode 'reflow': DOM is left unmodified" );

	assertOneCase( table.clone(), false, "xyzzy", table,
		"Not enhanced and mode 'xyzzy': DOM is left unmodified" );
} );
} );
