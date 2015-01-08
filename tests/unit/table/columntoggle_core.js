( function() {

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

module( "Columntoggle instantiation", {
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
});

test( "_enhanceColumnToggle() called during instantiation", function() {
	$( "<table>" ).table({ mode: "columntoggle" });

	deepEqual( functionCalled[ "_enhanceColumnToggle" ], true, "Function was called" );
});

test( "_enhanceColumnToggle() not called during instantiation of non-columntoggle", function() {
	$( "<table>" ).table({ mode: "reflow" });

	deepEqual( functionCalled[ "_enhanceColumnToggle" ], false, "Function was not called" );
});

test( "refresh() short-circuits during instantiation", function() {
	$( "<table>" ).table({ mode: "columntoggle" });

	deepEqual( functionCalled[ "refresh" ], true, "refresh() was called" );
	deepEqual( functionCalled[ "_recordLockedColumns" ], false,
		"_recordLockedColumns() was not called" );
	deepEqual( functionCalled[ "_unlock" ], false, "_unlock() was not called" );
	deepEqual( functionCalled[ "_restoreLockedColumns" ], false,
		"_restoreLockedColumns() was not called" );
	deepEqual( functionCalled[ "_updateHeaderPriorities" ], true,
		"_updateHeaderPriorities() was called" );
});

test( "_enhanceColumnToggle() calls _updateHeaderPriorities()", function() {
	tablePrototype._enhanceColumnToggle.call({
		element: $( "<table>" ),
		_updateHeaderPriorities: tablePrototype._updateHeaderPriorities,
		headers: $(),
		options: {
			classes: {
				columnToggleTable: "ui-table-column-toggle"
			}
		}
	});

	deepEqual( functionCalled[ "_updateHeaderPriorities" ], true, "function was called" );
});

test( "_updateVariableColumn() adds priority classes to cells", function() {
	var cells = $( "<td></td><td></td>" );

	tablePrototype._updateVariableColumn.call({
		options: {
			classes: {
				priorityPrefix: "prio-prefix-"
			}
		}
	}, null, cells, 2 );

	deepEqual( cells.is( function() {
		return !$( this ).hasClass( "prio-prefix-2" );
	}), false, "All cells have class 'prio-prefix-2'" );
});

test( "_updateHeaderPriorities() iterates over headers and adds classes", function() {
	var callCount = 0,
		headers = $( "<th data-" + $.mobile.ns + "priority='3'>" +
		"</th><th data-" + $.mobile.ns + "priority='5'></th>" )
			.eq( 0 )
				.jqmData( "cells", $( "<td></td><td></td>" ) )
			.end()
			.eq( 1 )
				.jqmData( "cells", $( "<td></td><td></td>" ) )
			.end();

	tablePrototype._updateHeaderPriorities.call({
		_updateVariableColumn: function( header, cells, priority ) {
			deepEqual( header[ 0 ], headers.eq( callCount )[ 0 ],
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
	});

	deepEqual( headers.eq( 0 ).add( headers.eq( 0 ).jqmData( "cells" ) ).is( function() {
		return !$( this ).hasClass( "prio-prefix-3" );
	}), false, "first column cells all have priorty class, including header" );

	deepEqual( headers.eq( 1 ).add( headers.eq( 1 ).jqmData( "cells" ) ).is( function() {
		return !$( this ).hasClass( "prio-prefix-5" );
	}), false, "second column cells all have priorty class, including header" );
});

test( "_setColumnVisibility() forces column to be visible/hidden", function() {
	function testFunction( visible ) {
		var cells = $( "<td class='ui-table-cell-visible ui-table-cell-hidden'>" +
			"</td><td class='ui-table-cell-visible ui-table-cell-hidden'></td>" ),
			header = $( "<th class='ui-table-cell-visible ui-table-cell-hidden'>" )
				.jqmData( "cells", cells ),
			expectedAbsent = " ui-table-cell-" + ( visible ? "hidden" : "visible" );

		tablePrototype._setColumnVisibility.call({
			options: {
				classes: {
					cellHidden: "ui-table-cell-hidden",
					cellVisible: "ui-table-cell-visible"
				}
			},
			_unlock: function( cells ) {
				deepEqual( cells.length, 3,
					"The number of cells unlocked is equal to the cells + the header" );
				deepEqual( cells.is( function() {
					return !( this === header[ 0 ] || cells.is( this ) );
				}), false, "the right cells are unlocked" );
				return tablePrototype._unlock.apply( this, arguments );
			}
		}, header, visible );

		deepEqual( cells.add( header ).is( function() {
			return $( this ).hasClass( expectedAbsent );
		}), false, "Neither header nor cells have class '" + expectedAbsent + "'" );
	}

	testFunction( true );
	testFunction( false );
});

test( "setColumnVisibility() correctly identifies the header", function() {
	var resultingHeader,
		cells = $( "<td></td><td></td>" ),
		headers = $( "<th></th><th></th><th></th>" )
			.eq( 1 )
				.jqmData( "cells", cells )
			.end(),
		context = {
			headers: headers,
			_setColumnVisibility: function( header, visible ) {
				resultingHeader = header[ 0 ];
			}
		};

	tablePrototype.setColumnVisibility.call( context, 1 );
	deepEqual( resultingHeader, headers.get( 1 ), "Selecting by index works" );
	resultingHeader = undefined;

	tablePrototype.setColumnVisibility.call( context, headers.eq( 2 ) );
	deepEqual( resultingHeader, headers.get( 2 ), "Selecting by header works" );
	resultingHeader = undefined;

	tablePrototype.setColumnVisibility.call( context, cells.eq( 1 ) );
	deepEqual( resultingHeader, headers.get( 1 ), "Selecting by cell works" );
	resultingHeader = undefined;
});

test( "_unlock() removes classes from cells", function() {
	var cellList = $( "<td class='ui-table-cell-hidden'></td>" +
		"<td class='ui-table-cell-visible'></td>" ),
		table = $( "#unlock-test-table" );

	tablePrototype._unlock.call({
		options: {
			classes: {
				cellHidden: "ui-table-cell-hidden",
				cellVisible: "ui-table-cell-visible"
			}
		}
	}, cellList );

	deepEqual( cellList.is( function() {
		return $( this ).hasClass( "ui-table-cell-hidden" ) ||
			$( this ).hasClass( "ui-table-cell-visible" );
	}), false, "Both 'ui-table-cell-hidden' and 'ui-table-cell-visible' have been removed" );
});

})();
