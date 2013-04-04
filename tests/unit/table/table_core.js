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
		expect( 1 );
		
		setTimeout(function() {
			var $table = $('#basic-table-test .ui-table');
			
			ok( $table.length, ".ui-table class added to table element" );
			start();
		}, 800);
	});
	asyncTest( "Has data object attributed to table" , function(){
		expect( 1 );
		
		setTimeout(function(){
			var $table = $('#basic-table-test .ui-table'),
				self = $table.data( "mobile-table" );
				
			ok( self , "Data object is available" );
			start();
		}, 800);
	});
	asyncTest( "Has headers option" , function(){
		expect( 2 );
		
		setTimeout(function() {
			var $table = $('#basic-table-test .ui-table'),
				self = $table.data( "mobile-table" );
				
			ok( self.headers.length , "Header array is not empty");
			equal( 5 , self.headers.length , "Number of headers is correct");
			start();
		}, 800);
	});
	asyncTest("Refresh updates table headers correctly", function () {
		expect( 4 );
		
		setTimeout(function () {
			$(window).trigger("refresh_test_table", ["#basic-table-test"]);
			var $table = $('#basic-table-test .ui-table'),
				$firstHeaderCell = $table.find('thead tr th').eq(0),
				$cellLookUp = $table.find('tbody tr').eq(0).find('th td').eq(0).jqmData("test");
				
			ok($table.length, "table still enhanced");
			ok($firstHeaderCell.jqmData("cells").length,
				"column cells still assigned to header cell");
			equal($firstHeaderCell.jqmData('cells').eq(0).closest("table").attr('id'),
				"movie-table",
				"cell stored is a refreshed cell (currently in the table");
			equal($cellLookUp, $firstHeaderCell.jqmData('cells').eq(0).jqmData("test"),
				"referenced cell is in the correct column");
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
		expect( 1 );
		
		setTimeout(function() {
			ok($('#reflow-table-test .ui-table-reflow').length, ".ui-table-reflow class added to table element");
			start();
		}, 800);
	});
	asyncTest( "The appropriate label is added" , function(){
		expect( 2 );
		
		setTimeout(function(){
			var $table = $( "#reflow-table-test table" ),
				$body = $table.find( "tbody" ),
				$tds = $body.find( "td" ),
				labels = $tds.find( "b.ui-table-cell-label" );
				
			ok( labels , "Appropriate label placed" );
			equal( $( labels[0] ).text(), "Movie Title" , "Appropriate label placed" );
			start();
		}, 800);
	});
	asyncTest( "Reflow table refresh" , function(){
		expect( 2 );
		
		setTimeout(function () {
			// refresh table
			$(window).trigger("refresh_test_table", ["#reflow-table-test"]);
			var $table = $('#reflow-table-test .ui-table'),
				$tds = $table.find( "td" ),
				labels = $tds.find( "b.ui-table-cell-label" );
				
			ok( $table.length, "table still enhanced");
			ok( labels = $tds.find( "b.ui-table-cell-label" ), "Labels still there");
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
		expect( 6 );
		
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
		expect( 5 );
		
		var $input;
		
		$.testHelper.pageSequence([
			function() {
				$( ".ui-table-columntoggle-btn" ).click();
			},
			function() {
				$input = $( "#movie-table-column-popup-popup" ).find( "input" ).eq(0);
				$input.click();
			},
			function(){
				setTimeout(function () {
					$(window).trigger("refresh_test_table", ["#column-table-test"]);
					
					var $table = $('#column-table-test .ui-table'),
						$first_input = $( "#movie-table-column-popup-popup" ).find( "input" ).eq(0),
						$visibleCells = $table.find("tbody tr:first").find("th, td").not('.ui-table-cell-hidden'),
						$visibleHeaders = $table.find("thead tr:first").find("th, td").not('.ui-table-cell-hidden');
						
					ok( $table.length, "table still enhanced");
					equal( $table.find('tbody tr:first')
						.find("th, td").eq(2).hasClass('ui-table-cell-hidden'), true, "random cell in hidden column has ui-table-cell-hidden class");
					ok( $input.is( ":checked" ), false, "input is still not checked after refresh");
					equal( $first_input.jqmData("cells").eq(1).data("test"), "abc",
						"cell reference in popup is to cell currently in table");
					equal( $visibleCells.length, $visibleHeaders.length, "same number of headers and rows visible" );
				}, 800);
			},
			function() {
				start();
			}
		]);
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