
/*
 * mobile table unit tests
 */

(function($){
	var home = $.mobile.path.parseUrl( location.href ).pathname + location.search;

	module( "Basic Table", {
		setup: function(){
		},

		teardown: function() {
		}
	});
	asyncTest( "The page should be enhanced correctly", function(){
		setTimeout(function() {
			ok($('#basic-table-test .ui-table').length, ".ui-table class added to table element");
			start();
		}, 800);
	});
})(jQuery);
