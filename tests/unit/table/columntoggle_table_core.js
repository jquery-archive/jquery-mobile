var addRowToTable = ( function() {
	var numbers = [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
		letters = ["a", "b", "c", "d", "e", "f", "g", "h", "i" ],
		count = 0;

	return function _addRowToTable( table ) {
		var dataSource = !!( count++ % 2 ) ? numbers : letters,
			newRow =
				"<tr>" +
					"<th data-test='abc'>" + dataSource[ 0 ] + "</th>" +
					"<td>" + dataSource[ 1 ] + "</td>" +
					"<td data-test='foo'>" + dataSource[ 2 ] + "</td>" +
					"<td data-col='3'>" + dataSource[ 3 ] + "</td>" +
					"<td>" + dataSource[ 4 ] + "</td>" +
				"</tr>";

		return table
			.children( "tbody" )
				.empty()
				.append( newRow )
			.end();
	};
})();

module( "Table integration tests" );

test( "The page should be enhanced correctly", function() {
	var table = $( "#movie-table-column" ),
		popup = $( "#movie-table-column-popup" ),
		button = $( "#movie-table-column-button" );

	deepEqual( !!popup.length, true, "Popup can be found via ID derived from table ID" );
	deepEqual( !!button.length, true, "Button can be found via ID derived from table ID" );

	deepEqual( button.attr( "href" ), "#" + popup.attr( "id" ), "Button href points to popup ID" );
	deepEqual( button.attr( "data-" + $.mobile.ns + "rel" ), "popup",
		"Button has attribute data-rel='popup'" );

	deepEqual( table.hasClass( "ui-table-columntoggle" ), true,
		"table has class 'ui-table-columntoggle'" );

	deepEqual( button.hasClass( "ui-table-columntoggle-btn" ), true,
		"button has class 'ui-table-columntoggle-btn'" );

	deepEqual( button.text(), "Columns...", "Button has correct text" );

	deepEqual( popup.parent().hasClass( "ui-popup-hidden" ), true, "Popup is hidden" );

	deepEqual( !!popup.find( "input[type='checkbox']" ).length, true,
		"Checkboxes were added to menu" );

	deepEqual( popup.find( "input[type='checkbox']:nth(2)" ).prev().text(), "Rotten Tomato Rating",
		"The presence of an <abbr> tag with title attribute in the <th> causes the value of the " +
		"attribute to be used for the checkbox label" );
});

asyncTest( "Toggle column", function() {
	expect( 12 );

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
			});

			deepEqual( inconsistent, false,
				messagePrefix + " visibility of column members is consistent" );
			deepEqual( visible, input.is( ":checked" ),
				messagePrefix + " visibility of column members coincides with the " +
				"corresponding column checkbox state" );

			return visible;
		};

	$.testHelper.detailedEventCascade([

		function() {
			initial = checkColumn( "Initially: " );
			input.click().checkboxradio( "refresh" ).trigger( "change" );
		},

		{
			change: { src: input, event: "change.toggleColumn1" }
		},

		function( result ) {
			deepEqual( result.change.timedOut, false,
				"Clicking the checkbox has resulted in a 'change' event" );
			post = checkColumn( "After clicking: " );
			deepEqual( initial !== post, true, "Visibility was toggled by clicking the checkbox" );

			initial = post;

			// If the column is currently visible, turn it off and then proceed with the test.
			// Otherwise, proceed with the test immediately. The test consists of making sure that
			// programmatically unchecking a checkbox that's already unchecked alters neither the
			// visibility of the column, not the checked state of the checkbox
			$.testHelper.detailedEventCascade( ( post === true ? [
				function() {
					input.click().checkboxradio( "refresh" ).trigger( "change" );
				},
				{
					change: { src: input, event: "change.toggleColumn2" }
				}
			] : [] ).concat( [
				function() {
					post = checkColumn( "After making sure input is off: " );
					deepEqual( post, false, "Column is not visible" );
					input.prop( "checked", false ).checkboxradio( "refresh" ).trigger( "change" );
				},
				{
					change: { src: input, event: "change.toggleColumn3" }
				},
				function() {
					post = checkColumn( "After programmatically unchecking an already unchecked " +
						"checkbox: " );
					deepEqual( post, false,
						"Unchecking already unchecked checkbox by programmatically setting its" +
						"'checked' property does not affect column visibility" );
					start();
				}
			]));
		}
	]);
});

asyncTest( "Column toggle table refresh - adding a row", function() {

	expect( 3 );

	// hide one column and refresh
	var secondInput, visibleCells, visibleHeaders,
		input = $( "#movie-table-column-add-row-popup input:nth(2)" ),
		table = $( "#movie-table-column-add-row" );

	$.testHelper.detailedEventCascade([
		function() {
			input.trigger( "click" );
		},
		{
			change: { src: input, event: "change.ColumnToggleTableRefreshAddingARow1" }
		},
		function() {
			addRowToTable( table ).table( "refresh" );

			secondInput = $( "#movie-table-column-add-row-popup input:nth(1)" );
			visibleCells = table
				.find( "tbody tr" )
					.first()
						.find( "th, td" )
							.not( ".ui-table-cell-hidden" );
			visibleHeaders = table
				.find( "thead tr" )
					.first()
						.find( "th, td" )
							.not( ".ui-table-cell-hidden" );

			deepEqual( table.hasClass( "ui-table" ), true, "Table is still enhanced" );

			deepEqual( secondInput.jqmData( "cells" ).last().attr( "data-test" ), "foo",
				"Cell referenced in popup is in table after refresh, and columns without " +
					"data-priority set don't break table on refresh" );

			deepEqual( visibleCells.length, visibleHeaders.length,
				"same number of headers and rows visible" );

			start();
		}
	]);
});

asyncTest( "Column toggle table refresh - adding a column", function() {
	expect( 3 );

	var lastInput, visibleCells, visibleHeaders,
		popup = $( "#movie-table-column-add-column-popup" ),
		input = $( "#movie-table-column-add-column-popup input:nth(2)" ),
		table = $( "#movie-table-column-add-column" );

	$.testHelper.detailedEventCascade([
		function() {
			input.trigger( "click" );
		},
		{
			change: { src: input, event: "change.ColumnToggleTableRefreshAddingAColumn1" }
		},
		function() {
			addRowToTable( table );

			// Add a column too
			table
				.find( "thead tr:first" )
					.append( "<th data-" + $.mobile.ns + "priority='4'>Xyzzy</th>" )
				.end()
				.find( "tbody tr:first" )
					.append( "<td data-test='xyz'>Simsalabim</td>" )
				.end()
				.table( "refresh" );

			lastInput = popup.find( "input" ).last();
			visibleCells = table
				.find( "tbody tr" )
					.first()
						.find( "th, td" )
							.not( ".ui-table-cell-hidden" );
			visibleHeaders = table
				.find( "thead tr" )
					.first()
						.find( "th, td" )
							.not( ".ui-table-cell-hidden" );

			deepEqual( table.hasClass( "ui-table-columntoggle" ), true,
				"Table still enhanced after refresh" );
			deepEqual( lastInput.jqmData( "cells" ).last().attr( "data-test" ), "xyz",
				"Cell referenced in popup is in table after refresh (new column and toggle " +
					"button), columns without data-priority don't break table on refresh" );

			deepEqual( visibleCells.length, visibleHeaders.length,
				"same number of headers and rows visible" );
			start();
		}
	]);
});

asyncTest( "The dialog should become visible when button is clicked", function() {
	expect( 4 );

	var input;

	$.testHelper.detailedEventCascade([
		function() {
			$( "#movie-table-column-button" ).click();
		},
		{
			popupafteropen: {
				src: $( "#movie-table-column-popup" ),
				event: "popupafteropen.TheDialogShouldBecomeVisibleWhenButtonIsClicked1"
			}
		},
		function( result ) {
			deepEqual( result.popupafteropen.timedOut, false,
				"The popup containing the checkboxes did emit a popupafteropen" );
			deepEqual( $( "#movie-table-column-popup-popup" ).hasClass( "ui-popup-hidden" ), false,
				"Popup container is not hidden" );
			$( "#movie-table-column-popup" ).popup( "close" );
		},
		{
			popupafterclose: {
				src: $( "#movie-table-column-popup" ),
				event: "popupafterclose.TheDialogShouldBecomeVisibleWhenButtonIsClicked2"
			}
		},
		function( result ) {
			deepEqual( result.popupafterclose.timedOut, false,
				"The popup containing the checkboxes did emit a popupafterclose" );
			deepEqual( $( "#movie-table-column-popup-popup" ).hasClass( "ui-popup-hidden" ), true,
				"Popup container is hidden" );
			start();
		}
	]);
});

test( "Table refresh does not drop columns", function() {
	var table = $( "#refresh-column-count-test" ),
		checkbox = $( "#refresh-column-count-test-popup" )
			.find( "input" ).eq( 2 );

	checkbox.prop( "checked", false ).trigger( "change" );
	table.table( "refresh" );
	deepEqual( $( "thead tr > *:visible", table[ 0 ] ).length,
		$( "tbody tr:first > *:visible", table[ 0 ] ).length,
		"Number of visible headers columns equals number of visible " +
			"data columns" );
});

test( "Locked columns stay locked after row/column addition", function() {
	var table = $( "#refresh-hidden-column-test" );

	// Force a column into the hidden state
	$( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 2 )
		.prop( "checked", false )
		.checkboxradio( "refresh" )
		.trigger( "change" );

	// Force a column into the shown state
	$( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 3 )
		.prop( "checked", true )
		.checkboxradio( "refresh" )
		.trigger( "change" );

	// Add a row
	table.children( "tbody" ).append( "<tr>" +
		"<th>11</th>" +
		"<td class='title'><a href='http://en.wikipedia.org/wiki/Day_of_the_triffids' " +
			"data-rel='external'>Day of the triffids</a></td>" +
		"<td>1963</td>" +
		"<td>78%</td>" +
		"<td>18</td>" +
		"</tr>" );
	table.table( "refresh" );

	deepEqual(
		$( "#refresh-hidden-column-test tr" )
			.children( "td:nth-child(4), th:nth-child(4)" )
				.is( function() {
					return !( $( this ).hasClass( "ui-table-cell-hidden" ) );
				}),
		false,
		"After adding row, all forced-hidden column cells have class 'ui-table-cell-hidden'" );

	deepEqual(
		$( "#refresh-hidden-column-test tr" )
			.children( "td:nth-child(5), th:nth-child(5)" )
				.is( function() {
					return !( $( this ).hasClass( "ui-table-cell-visible" ) );
				}), false,
		"After adding row: All forced-hidden column cells have class 'ui-table-cell-visible'" );

	deepEqual( $( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 2 ).prop( "checked" ),
		false, "Unchecked checkbox remains unchecked after row addition and table refresh" );

	deepEqual( $( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 3 ).prop( "checked" ),
		true, "Checked checkbox remains checked after row addition and table refresh" );

	// Add a column
	table.find( "thead tr th:nth-child(2)" ).before( "<th data-nstest-priority='4'>Test</th>" );
	table.find( "tbody tr th:nth-child(2)" ).each( function() {
		$( this ).before( "<td>Test</td>" );
	});
	table.table( "refresh" );

	deepEqual(
		$( "#refresh-hidden-column-test tr" )
			.children( "td:nth-child(5), th:nth-child(5)" )
				.is( function() {
					return !( $( this ).hasClass( "ui-table-cell-hidden" ) );
				}),
		false,
		"After adding column, all forced-hidden column cells have class 'ui-table-cell-hidden'" );

	deepEqual(
		$( "#refresh-hidden-column-test tr" )
			.children( "td:nth-child(6), th:nth-child(6)" )
				.is( function() {
					return !( $( this ).hasClass( "ui-table-cell-visible" ) );
				}), false,
		"After adding column: All forced-hidden column cells have class 'ui-table-cell-visible'" );

	deepEqual( $( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 3 ).prop( "checked" ),
		false, "Unchecked checkbox remains unchecked after column addition and table refresh" );

	deepEqual( $( "#refresh-hidden-column-test-popup" ).find( "input" ).eq( 4 ).prop( "checked" ),
		true, "Checked checkbox remains checked after column addition and table refresh" );
});
