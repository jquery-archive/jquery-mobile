define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {

var tablePrototype = $.mobile.table.prototype,
	originals = {},
	functionCalled = {
		refresh: false,
		_enhanceColumnToggle: false,
		_updateHeaderPriorities: false,
		_recordLockedColumns: false,
		_unlock: false,
		_restoreLockedColumns: false
	},
	recordCall = function( functionName ) {
		functionCalled[ functionName ] = false;
		originals[ functionName ] = tablePrototype[ functionName ];
		tablePrototype[ functionName ] = function() {
			functionCalled[ functionName ] = true;
			return originals[ functionName ].apply( this, arguments );
		};
	};

QUnit.module( "Columntoggle instantiation", {
	setup: function() {
		var functionName;

		for ( functionName in functionCalled ) {
			recordCall( functionName );
		}
	},
	teardown: function() {
		var functionName;

		for ( functionName in functionCalled ) {
			tablePrototype[ functionName ] = originals[ functionName ];
		}
	}
} );

QUnit.test( "_enhanceColumnToggle() called during instantiation",
function( assert ) {
	$( "<table>" ).table( { mode: "columntoggle" } );

	assert.deepEqual( functionCalled._enhanceColumnToggle,
		true, "Function was called" );
} );

QUnit.test(
	"_enhanceColumnToggle() not called during instantiation of non-columntoggle",
	function( assert ) {
		$( "<table>" ).table( { mode: "reflow" } );

		assert.deepEqual( functionCalled._enhanceColumnToggle,
			 false, "Function was not called" );
} );

QUnit.test( "refresh() short-circuits during instantiation",
	function( assert ) {
		$( "<table>" ).table( { mode: "columntoggle" } );

		assert.deepEqual( functionCalled.refresh, true, "refresh() was called" );
		assert.deepEqual( functionCalled._recordLockedColumns, false,
		"_recordLockedColumns() was not called" );
		assert.deepEqual( functionCalled._unlock, false,
			"_unlock() was not called" );
		assert.deepEqual( functionCalled._restoreLockedColumns, false,
		"_restoreLockedColumns() was not called" );
		assert.deepEqual( functionCalled._updateHeaderPriorities, true,
		"_updateHeaderPriorities() was called" );
} );

QUnit.test( "_enhanceColumnToggle() calls _updateHeaderPriorities()",
	function( assert ) {
		$( "<table>" ).table( { mode: "columntoggle" } );

		assert.deepEqual( functionCalled._updateHeaderPriorities, true,
			"function was called" );
} );

QUnit.skip( "_updateVariableColumn() adds priority classes to cells",
	function( assert ) {
		var cells = $( "<td></td><td></td>" );

		tablePrototype._updateVariableColumn.call( {
			options: {
				classes: {
					priorityPrefix: "prio-prefix-"
				}
			}
		}, null, cells, 2 );

		assert.deepEqual( cells.is( function() {
			return assert.lacksClasses( $( this ), "prio-prefix-2" );
		} ), false, "All cells have class 'prio-prefix-2'" );
} );

QUnit.skip( "_updateHeaderPriorities() iterates over headers and adds classes",
	function( assert ) {
		var callCount = 0,
			headers = $( "<th data-" + $.mobile.ns + "priority='3'>" +
			"</th><th data-" + $.mobile.ns + "priority='5'></th>" )
				.eq( 0 )
					.jqmData( "cells", $( "<td></td><td></td>" ) )
				.end()
				.eq( 1 )
					.jqmData( "cells", $( "<td></td><td></td>" ) )
				.end();

		tablePrototype._updateHeaderPriorities.call( {
			_updateVariableColumn: function( header ) {
				assert.deepEqual( header[ 0 ], headers.eq( callCount )[ 0 ],
					"_updateVariableColumn() called on headers[ " + callCount + " ]" );
				callCount++;
				return tablePrototype._updateVariableColumn.apply( this, arguments );
			},
			headers: headers,
			options: {
				classes: {
					priorityPrefix: "prio-prefix-"
				}
			}
		} );

		assert.deepEqual( headers.eq( 0 ).add( headers.eq( 0 ).jqmData( "cells" ) )
			.is( function() {
				return assert.lacksClasses( $( this ), "prio-prefix-3" );
			} ),
			false, "first column cells all have priorty class, including header" );

		assert.deepEqual( headers.eq( 1 ).add( headers.eq( 1 ).jqmData( "cells" ) )
			.is( function() {
				return assert.lacksClasses( $( this ), "prio-prefix-5" );
			} ),
			false, "second column cells all have priorty class, including header" );
} );

QUnit.skip( "_setColumnVisibility() forces column to be visible/hidden",
	function( assert ) {
		function testFunction( visible ) {
			var cells = $( "<td class='ui-table-cell-visible ui-table-cell-hidden'>" +
				"</td><td class='ui-table-cell-visible ui-table-cell-hidden'></td>" ),
				header = $( "<th class='ui-table-cell-visible ui-table-cell-hidden'>" )
					.jqmData( "cells", cells ),
				expectedAbsent = " ui-table-cell-" + ( visible ? "hidden" : "visible" );

			tablePrototype._setColumnVisibility.call( {
				options: {
					classes: {
						cellHidden: "ui-table-cell-hidden",
						cellVisible: "ui-table-cell-visible"
					}
				},
				_unlock: function( cells ) {
					assert.deepEqual( cells.length, 3,
						"The number of cells unlocked is equal to the cells + the header" );
					assert.deepEqual( cells.is( function() {
						return !( this === header[ 0 ] || cells.is( this ) );
					} ), false, "the right cells are unlocked" );
					return tablePrototype._unlock.apply( this, arguments );
				}
			}, header, visible );

			assert.deepEqual( cells.add( header ).is( function() {
				return assert.hasClasses( this, expectedAbsent );
			} ),
			false, "Neither header nor cells have class '" + expectedAbsent + "'" );
		}

		testFunction( true );
		testFunction( false );
} );

QUnit.test( "setColumnVisibility() correctly identifies the header",
	function( assert ) {
		var resultingHeader,
			cells = $( "<td></td><td></td>" ),
			headers = $( "<th></th><th></th><th></th>" )
				.eq( 1 )
					.jqmData( "cells", cells )
				.end(),
			context = {
				headers: headers,
				_setColumnVisibility: function( header ) {
					resultingHeader = header[ 0 ];
				}
			};

		tablePrototype.setColumnVisibility.call( context, 1 );
		assert.deepEqual( resultingHeader, headers.get( 1 ), "Selecting by index works" );
		resultingHeader = undefined;

		tablePrototype.setColumnVisibility.call( context, headers.eq( 2 ) );
		assert.deepEqual( resultingHeader, headers.get( 2 ), "Selecting by header works" );
		resultingHeader = undefined;

		tablePrototype.setColumnVisibility.call( context, cells.eq( 1 ) );
		assert.deepEqual( resultingHeader, headers.get( 1 ), "Selecting by cell works" );
		resultingHeader = undefined;
} );

QUnit.skip( "_unlock() removes classes from cells", function( assert ) {
	var cellList = $( "<td class='ui-table-cell-hidden'></td>" +
		"<td class='ui-table-cell-visible'></td>" );

	tablePrototype._unlock.call( {
		options: {
			classes: {
				cellHidden: "ui-table-cell-hidden",
				cellVisible: "ui-table-cell-visible"
			}
		}
	}, cellList );

	assert.deepEqual( cellList.is( function() {
		return assert.hasClasses( $( this ), "ui-table-cell-hidden" ) ||
			assert.hasClasses( $( this ), "ui-table-cell-visible" );
	} ),
	false, "Both 'ui-table-cell-hidden' and 'ui-table-cell-visible' have been removed" );
} );

} );
