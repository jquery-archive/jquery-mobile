
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
				$body = $table.find( "tbody" ),
				$tds = $body.find( "td" ),
				labels = $tds.find( "b.ui-table-cell-label" );
			ok( labels , "Appropriate label placed" );
			equal( $( labels[0] ).text(), "Movie Title" , "Appropriate label placed" );
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
