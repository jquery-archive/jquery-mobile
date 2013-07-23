
/*
 * mobile table unit tests
 */

(function($){

	module( "Basic Table", {
		setup: function(){
			var hash = "#basic-table-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "The page should be enhanced correctly" , function(){
		setTimeout(function() {
			var $table = $('#basic-table-test .ui-table');
			ok( $table.length, ".ui-table class added to table element" );
			start();
		}, 800);
	});
	asyncTest( "Has data object attributed to table" , function(){
		setTimeout(function(){
			var $table = $('#basic-table-test .ui-table'),
				self = $table.data( "mobile-table" );
			ok( self , "Data object is available" );
			start();
		}, 800);
	});
	asyncTest( "Has headers option" , function(){
		setTimeout(function() {
			var $table = $('#basic-table-test .ui-table'),
				self = $table.data( "mobile-table" );
			ok( self.headers.length , "Header array is not empty");
			equal( 5 , self.headers.length , "Number of headers is correct");
			start();
		}, 800);
	});
	asyncTest("Reflow Refresh updates table headers correctly",
		function () {
			var $table = $('#basic-table-test .ui-table'),
				$firstHeaderCell = $table.find('thead tr th').first(),
				$cellLookUp;

			setTimeout(function () {

				$(window).trigger("refresh_test_table", ["#basic-table-test"]);

				$cellLookUp = $table.find('tbody tr').first().find('th, td').first().attr("data-test");

				ok($table.length, "table still enhanced");

				ok($firstHeaderCell.data("cells").length,
					"column cells still assigned to header cell");

				equal($firstHeaderCell.data('cells').eq(0).closest("table").attr('id'),
					"movie-table",
					"Cell stored is a refreshed cell (currently in the table");

				equal($cellLookUp, $firstHeaderCell.data('cells').first().attr("data-test"),
					"Cell stored in header is in the column of the respective header");
				start();
		}, 800);
	});
	module( "Reflow Mode", {
		setup: function(){
			var hash = "#reflow-table-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});
	asyncTest( "The page should be enhanced correctly" , function(){
		setTimeout(function() {
			ok($('#reflow-table-test .ui-table-reflow').length, ".ui-table-reflow class added to table element");
			start();
		}, 800);
	});

	asyncTest( "The appropriate label is added" , function(){
		setTimeout(function(){
			var $table = $( "#reflow-table-test table" ),
				$firstHeaderCell = $table.find('thead tr th').first(),
				$body = $table.find( "tbody" ),
				$tds = $body.find( "td" ),
				labels = $tds.find( "b.ui-table-cell-label" );
			ok( labels , "Appropriate label placed" );
			equal( $( labels[0] ).text(), "Movie Title" , "Appropriate label placed" );

			// refresh
			setTimeout(function () {
				$(window).trigger("refresh_test_table", ["#reflow-table-test"]);

				equal(
					$firstHeaderCell.data("cells").first().find('b').length,
					1,
					"Refreshing does not add more labels to a table cell"
				);
				start();
			}, 800);
		}, 800);
	});

	asyncTest( "Reflow table refresh" , function(){
		var $table = $('#reflow-table-test .ui-table'),
			$body = $table.find( "tbody" ),
			$tds = $body.find( "td" ),
			labels = $tds.find( "b.ui-table-cell-label" );

		setTimeout(function () {
			// refresh table
			$(window).trigger("refresh_test_table", ["#reflow-table-test"]);

			ok( $table.length, "table still enhanced");
			ok($tds.find( "b.ui-table-cell-label" ).length > 0, "Labels still there");
			start();
		}, 800);
	});

	module( "Column toggle table Mode", {
		setup: function(){
			var hash = "#column-table-test";
			if( location.hash != hash ){
				stop();

				$(document).one("pagechange", function() {
					start();
				});

				$.mobile.changePage( hash );
			}
		},

		teardown: function() {
		}
	});

	asyncTest( "The page should be enhanced correctly" , function(){
		setTimeout(function() {
			var $popup = $('#column-table-test #movie-table-column-popup-popup');

			ok($('#column-table-test .ui-table-columntoggle').length, ".ui-table-columntoggle class added to table element");
			ok($('#column-table-test .ui-table-columntoggle-btn').length, ".ui-table-columntoggle-btn button added");
			equal($('#column-table-test .ui-table-columntoggle-btn').text(), "Columns...",  "Column toggle button has correct text");
			ok( $popup.length, "dialog added" );
			ok( $popup.is( ".ui-popup-hidden" ) , "dialog hidden");
			ok($('#column-table-test #movie-table-column-popup-popup').find( "input[type=checkbox]" ).length > 0 , "Checkboxes added");

			start();
		}, 800);
	});

	asyncTest( "Column toggle table refresh" , function(){

		// hide one column and refresh
		var $second_input, $visibleCells, $visibleHeaders,
			$input = $( ".ui-popup-container" ).find( "input" ).eq(2),
			$table = $('#movie-table-column');

		$input.trigger('click');

		setTimeout(function () {

			$(window).trigger("refresh_test_table", ["#column-table-test"]);

			$second_input = $( ".ui-popup-container" ).find( "input" ).eq(1),
			$visibleCells = $table.find("tbody tr").first().find("th, td").not('.ui-table-cell-hidden'),
			$visibleHeaders = $table.find("thead tr").first().find("th, td").not('.ui-table-cell-hidden');

			ok( $table.length, "Table still enhanced");

			equal(
				$table.find('tbody tr').eq(1).find("th, td").eq(2).hasClass('ui-table-cell-hidden'),
				false,
				"Refreshing a table clears all ui-table-cell-hidden/show classes"
			);

			ok( $input.is( ":checked" ), false, "Input still not checked after refresh" );

			equal(
				$second_input.data("cells").last().attr("data-test"),
				"foo",
				"Cell referenced in popup is in table after refresh, columns without data-priority set don't break table on refresh");

			equal(
				$visibleCells.length,
				$visibleHeaders.length,
				"same number of headers and rows visible"
			);
			start();
		}, 1200);
	});

	asyncTest( "Column toggle table rebuild" , function(){

		var $last_input, $visibleCells, $visibleHeaders,
			$input = $( ".ui-popup-container" ).find( "input" ).eq(2),
			$table = $('#movie-table-column');

		$input.trigger('click');

		setTimeout(function () {

			$(window).trigger("refresh_col_table", ["#column-table-test"]);

			$last_input = $( ".ui-popup-container" ).find( "input" ).last(),
			$visibleCells = $table.find("tbody tr").first().find("th, td").not('.ui-table-cell-hidden'),
			$visibleHeaders = $table.find("thead tr").first().find("th, td").not('.ui-table-cell-hidden');

			ok( $table.length, "Table still enhanced after rebuild");
			equal(
				$table.find('tbody tr').eq(1).find("th, td").eq(2).hasClass('ui-table-cell-hidden'),
				false,
				"Rebuilding a table clears all ui-table-cell-hidden/show classes"
			);
			ok( $input.is( ":checked" ), false, "Input still not checked after rebuild" );

			equal(
				$last_input.data("cells").last().attr("data-test"),
				"xyz",
				"Cell referenced in popup is in table after rebuild (new column and toggle button), columns without data-priority don't break table on rebuild");

			equal(
				$visibleCells.length,
				$visibleHeaders.length,
				"same number of headers and rows visible"
			);

			start();
		}, 1200);
	});

	asyncTest( "The dialog should become visible when button is clicked" , function(){
		expect( 2 );
		var $input;
		$.testHelper.pageSequence([
			function() {
				$( ".ui-table-columntoggle-btn" ).click();
			},
			function() {
				setTimeout(function() {
					ok( $( "#movie-table-column-popup-popup" ).not( ".ui-popup-hidden" ) , "Table popup is shown on click" );
				}, 800);
			},
			function() {
				$input = $( ".ui-popup-container" ).find( "input:first" );
				$input.click();
			},
			function(){
				setTimeout(function(){
					var headers = $( "#column-table-test table tr" ).find( "th:first" );
					if( $input.is( ":checked" ) ){
						ok( headers.not( ".ui-table-cell-hidden" ) );
					} else {
						ok( headers.is( ".ui-table-cell-hidden" ) );
					}
				}, 800);
			},
			function() {
				start();
			}
		]);
	});
})(jQuery);
