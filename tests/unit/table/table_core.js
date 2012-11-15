
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
				self = $table.data( "table" );
			ok( self , "Data object is available" );
			start();
		}, 800);
	});
	asyncTest( "Has headers option" , function(){
		setTimeout(function() {
			var $table = $('#basic-table-test .ui-table'),
				self = $table.data( "table" );
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
			ok($('#column-table-test .ui-table-columntoggle').length, ".ui-table-columntoggle class added to table element");
			start();
		}, 800);
	});

})(jQuery);
