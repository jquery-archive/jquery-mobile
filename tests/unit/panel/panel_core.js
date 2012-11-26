/*
 * mobile panel unit tests
 */

(function($){

	module( "Basic Panel", {
		setup: function(){
			var hash = "#basic-panel-test";
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
	asyncTest( "The panel should be enhanced correctly" , function(){
		setTimeout(function() {
			var $panel = $('#basic-panel-test .ui-panel');
			ok( $panel.length, ".ui-panel class added to panel div" );
			start();
		}, 800);
	});
}( jQuery ));
