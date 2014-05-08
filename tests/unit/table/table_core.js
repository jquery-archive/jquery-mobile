
/*
 * Mobile table unit tests
 */

define( [ "qunit", "jquery" ], function( QUnit, $ ) {

QUnit.module( "Basic Table", {
	setup: function() {
		var hash = "#basic-table-test";
		if ( location.hash != hash ) {
			QUnit.stop();

			$( document ).one( "pagechange", function() {
				QUnit.start();
			} );

			$( ".ui-pagecontainer" ).pagecontainer( "change", hash );
		}
	},

	teardown: function() {}
} );
QUnit.asyncTest( "The page should be enhanced correctly", function( assert ) {
	setTimeout( function() {
		var $table = $( "#basic-table-test .ui-table" );
		assert.ok( $table.length, ".ui-table class added to table element" );
		QUnit.start();
	}, 800 );
} );
QUnit.asyncTest( "Has data object attributed to table", function( assert ) {
	setTimeout( function() {
		var $table = $( "#basic-table-test .ui-table" ),
			self = $table.data( "mobile-table" );
		assert.ok( self, "Data object is available" );
		QUnit.start();
	}, 800 );
} );
QUnit.asyncTest( "Has headers option", function( assert ) {
	setTimeout( function() {
		var $table = $( "#basic-table-test .ui-table" ),
			self = $table.data( "mobile-table" );
		assert.ok( self.headers.length, "Header array is not empty" );
		assert.equal( 5, self.headers.length, "Number of headers is correct" );
		QUnit.start();
	}, 800 );
} );
QUnit.asyncTest( "Reflow Refresh updates table headers correctly",
	function( assert ) {
		var $table = $( "#basic-table-test .ui-table" ),
			$firstHeaderCell = $table.find( "thead tr th" ).first(),
			$cellLookUp;

		setTimeout( function() {

			$( window ).trigger( "refresh_test_table", [ "#basic-table-test" ] );

			$cellLookUp = $table.find( "tbody tr" ).first().find( "th, td" ).first().attr( "data-test" );

			assert.ok( $table.length, "table still enhanced" );

			assert.ok( $firstHeaderCell.jqmData( "cells" ).length,
				"column cells still assigned to header cell" );

			assert.equal( $firstHeaderCell.jqmData( "cells" ).eq( 0 ).closest( "table" ).attr( "id" ),
				"movie-table",
				"Cell stored is a refreshed cell (currently in the table" );

			assert.equal( $cellLookUp, $firstHeaderCell.jqmData( "cells" ).first().attr( "data-test" ),
				"Cell stored in header is in the column of the respective header" );
			QUnit.start();
		}, 800 );
	} );
QUnit.module( "Reflow Mode", {
	setup: function() {
		var hash = "#reflow-table-test";
		if ( location.hash != hash ) {
			QUnit.stop();

			$( document ).one( "pagechange", function() {
				QUnit.start();
			} );

			$( ".ui-pagecontainer" ).pagecontainer( "change", hash );
		}
	},

	teardown: function() {}
} );
QUnit.asyncTest( "The page should be enhanced correctly", function( assert ) {
	setTimeout( function() {
		assert.ok( $( "#reflow-table-test .ui-table-reflow" ).length, ".ui-table-reflow class added to table element" );
		assert.deepEqual(
			$( "#reflow-table-test .ui-table-reflow > tbody span.make-it-red" ).length, 1,
			"span was copied from table header" );
		QUnit.start();
	}, 800 );
} );

QUnit.test( "Reflow mode honors <abbr> tag title", function( assert ) {
	var table = $( "#reflow-abbr-test" );

	assert.deepEqual( $( "#reflow-abbr-td1 b" ).text(), "Player Name", "Row 1 has the right label" );
	assert.deepEqual( $( "#reflow-abbr-td2 b" ).text(), "Player Name", "Row 2 has the right label" );
} );

QUnit.asyncTest( "The appropriate label is added", function( assert ) {
	setTimeout( function() {
		var $table = $( "#reflow-table-test table" ),
			$firstHeaderCell = $table.find( "thead tr th" ).first(),
			$body = $table.find( "tbody" ),
			$tds = $body.find( "td" ),
			labels = $tds.find( "b.ui-table-cell-label" );
		assert.ok( labels, "Appropriate label placed" );
		assert.equal( $( labels[ 0 ] ).text(), "Movie Title", "Appropriate label placed" );

		// Refresh
		setTimeout( function() {
			$( window ).trigger( "refresh_test_table", [ "#reflow-table-test" ] );

			assert.equal(
				$firstHeaderCell.jqmData( "cells" ).first().find( "b" ).length,
				1,
				"Refreshing does not add more labels to a table cell"
			);
			QUnit.start();
		}, 800 );
	}, 800 );
} );

QUnit.asyncTest( "Reflow table refresh", function( assert ) {
	var $table = $( "#reflow-table-test .ui-table" ),
		$body = $table.find( "tbody" ),
		$tds = $body.find( "td" ),
		labels = $tds.find( "b.ui-table-cell-label" );

	setTimeout( function() {

		// Refresh table
		$( window ).trigger( "refresh_test_table", [ "#reflow-table-test" ] );

		assert.ok( $table.length, "table still enhanced" );
		assert.ok( $tds.find( "b.ui-table-cell-label" ).length > 0, "Labels still there" );
		QUnit.start();
	}, 800 );
} );

QUnit.module( "Column toggle table Mode", {
	setup: function() {
		var hash = "#column-table-test";
		if ( location.hash != hash ) {
			QUnit.stop();

			$( document ).one( "pagechange", function() {
				QUnit.start();
			} );

			$( ".ui-pagecontainer" ).pagecontainer( "change", hash );
		}
	},

	teardown: function() {}
} );

QUnit.asyncTest( "The page should be enhanced correctly", function( assert ) {
	setTimeout( function() {
		var $popup = $( "#column-table-test #movie-table-column-popup-popup" ),
			button = $( "#column-table-test .ui-table-columntoggle-button:last" );

		assert.ok( $( "#column-table-test .ui-table-columntoggle" ).length, ".ui-table-columntoggle class added to table element" );
		assert.ok( $( "#column-table-test .ui-table-columntoggle-button" ).length, ".ui-table-columntoggle-button button added" );
		assert.deepEqual( button.text(), "Columns...", "Column toggle button has correct text" );
		assert.ok( $popup.length, "dialog added" );
		assert.ok( $popup.is( ".ui-popup-hidden" ), "dialog hidden" );
		assert.ok( $( "#column-table-test #movie-table-column-popup-popup" ).find( "input[type=checkbox]" ).length > 0, "Checkboxes added" );
		assert.deepEqual( $( "#column-table-test #movie-table-column-popup-popup" ).find( "input[type=checkbox]:nth(2)" ).next().text(),
			" Rotten Tomato Rating",
			"The presence of an <abbr> tag with title attribute in the <th> causes the value of the attribute to be used for the checkbox label" );

		QUnit.start();
	}, 800 );
} );

QUnit.asyncTest( "Toggle column", function( assert ) {
	assert.expect( 9 );

	var initial, post,
		input = $( "#toggle-column-test-popup input:nth(1)" ),
		column = $( "#toggle-column-test tr>:nth-child(3)" ),

		// Ascertain visibility and consistency
		checkColumn = function( messagePrefix ) {
			var visible = undefined,
				inconsistent = false;

			column.each( function() {
				if ( visible === undefined ) {
					visible = !!$( this ).is( ":visible" );
				} else {
					inconsistent = ( !!$( this ).is( ":visible" ) !== visible );
				}
				if ( inconsistent ) {

					// Stop checking
					return false;
				}
			} );

			assert.deepEqual( inconsistent, false,
				messagePrefix + " visibility of column members is consistent" );
			assert.deepEqual( visible, input.is( ":checked" ),
				messagePrefix + " visibility of column members coincides with the " +
				"corresponding column checkbox state" );

			return visible;
		};

	$.testHelper.detailedEventCascade( [

		function() {
			initial = checkColumn( "Initially: " );
			input.click().checkboxradio( "refresh" ).trigger( "change" );
		},

		{
			change: { src: input, event: "change.toggleColumn1" }
		},

		function( result ) {
			assert.deepEqual( result.change.timedOut, false, "Clicking the checkbox " +
				"has resulted in a 'change' event" );
			post = checkColumn( "After clicking: " );
			assert.deepEqual( initial !== post, true,
				"Visibility was toggled by clicking the checkbox" );
			input.prop( "checked", false ).checkboxradio( "refresh" ).trigger( "change" );
			post = initial;
		},
		{
			change: { src: input, event: "change.toggleColumn2" }
		},
		function() {
			post = checkColumn( "After unchecking checkbox via its 'checked' property" );
			assert.deepEqual( initial === post, true,
				"Unchecking already unchecked checkbox via its 'checked' property does " +
				"not affect column visibility" );
			QUnit.start();
		}
	] );
} );

QUnit.asyncTest( "Column toggle table refresh", function( assert ) {

	// Hide one column and refresh
	var $secondInput, $visibleCells, $visibleHeaders,
		$input = $( ".ui-popup-container" ).find( "input" ).eq( 2 ),
		$table = $( "#movie-table-column" );

	$input.trigger( "click" );

	setTimeout( function() {

		$( window ).trigger( "refresh_test_table", [ "#column-table-test" ] );

		$secondInput = $( ".ui-popup-container" ).find( "input" ).eq( 1 ),
		$visibleCells = $table.find( "tbody tr" ).first().find( "th, td" ).not( ".ui-table-cell-hidden" ),
		$visibleHeaders = $table.find( "thead tr" ).first().find( "th, td" ).not( ".ui-table-cell-hidden" );

		assert.ok( $table.length, "Table still enhanced" );

		assert.equal(
			$table.find( "tbody tr" ).eq( 1 ).find( "th, td" ).eq( 2 ).hasClass( "ui-table-cell-hidden" ),
			false,
			"Refreshing a table clears all ui-table-cell-hidden/show classes"
		);

		assert.ok( $input.is( ":checked" ), false, "Input still not checked after refresh" );

		assert.equal(
			$secondInput.jqmData( "cells" ).last().attr( "data-test" ),
			"foo",
			"Cell referenced in popup is in table after refresh, columns without data-priority set don't break table on refresh" );

		assert.equal(
			$visibleCells.length,
			$visibleHeaders.length,
			"same number of headers and rows visible"
		);
		QUnit.start();
	}, 1200 );
} );

QUnit.asyncTest( "Column toggle table refresh", function( assert ) {

	var $lastInput, $visibleCells, $visibleHeaders,
		$input = $( "#movie-table-column-popup" ).find( "input" ).eq( 2 ),
		$table = $( "#movie-table-column" );

	$input.trigger( "click" );

	setTimeout( function() {

		$( window ).trigger( "refresh_col_table", [ "#column-table-test" ] );

		$lastInput = $( "#movie-table-column-popup" ).find( "input" ).last(),
		$visibleCells = $table.find( "tbody tr" ).first().find( "th, td" ).not( ".ui-table-cell-hidden" ),
		$visibleHeaders = $table.find( "thead tr" ).first().find( "th, td" ).not( ".ui-table-cell-hidden" );

		assert.ok( $table.length, "Table still enhanced after refresh" );
		assert.equal(
			$table.find( "tbody tr" ).eq( 1 ).find( "th, td" ).eq( 2 ).hasClass( "ui-table-cell-hidden" ),
			false,
			"refreshing a table clears all ui-table-cell-hidden/show classes"
		);
		assert.ok( $input.is( ":checked" ), false, "Input still not checked after refresh" );

		assert.equal(
			$lastInput.jqmData( "cells" ).last().attr( "data-test" ),
			"xyz",
			"Cell referenced in popup is in table after refresh (new column and toggle button), columns without data-priority don't break table on refresh" );

		assert.equal(
			$visibleCells.length,
			$visibleHeaders.length,
			"same number of headers and rows visible"
		);

		QUnit.start();
	}, 1200 );
} );

QUnit.asyncTest( "The dialog should become visible when button is clicked", function( assert ) {
	assert.expect( 2 );
	var $input;
	$.testHelper.pageSequence( [
		function() {
			$( ".ui-table-columntoggle-button:last" ).click();
		},
		function() {
			setTimeout( function() {
				assert.ok( $( "#movie-table-column-popup-popup" ).not( ".ui-popup-hidden" ), "Table popup is shown on click" );
			}, 800 );
		},
		function() {
			$input = $( "#movie-table-column-popup-popup" ).find( "input:first" );
			$input.click();
		},
		function() {
			setTimeout( function() {
				var headers = $( "#column-table-test table tr" ).find( "th:first" );
				if ( $input.is( ":checked" ) ) {
					assert.ok( headers.not( ".ui-table-cell-hidden" ) );
				} else {
					assert.ok( headers.is( ".ui-table-cell-hidden" ) );
				}
			}, 800 );
		},
		function() {
			QUnit.start();
		}
	] );
} );

} );
