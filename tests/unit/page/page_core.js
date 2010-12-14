/*
 * mobile page unit tests
 */
(function( $ ) {
	module('jquery.mobile.page.js');

	test( "nested header anchors aren't altered", function(){
		ok(!$('.ui-header > div > a').hasClass('ui-btn'));
	});

	test( "nested footer anchors aren't altered", function(){
		ok(!$('.ui-footer > div > a').hasClass('ui-btn'));
	});

	test( "nested bar anchors aren't styled", function(){
		ok(!$('.ui-bar > div > a').hasClass('ui-btn'));
	});

	test( "unnested footer anchors are styled", function(){
		ok($('.ui-footer > a').hasClass('ui-btn'));
	});

	test( "unnested footer anchors are styled", function(){
		ok($('.ui-footer > a').hasClass('ui-btn'));
	});

	test( "unnested bar anchors are styled", function(){
		ok($('.ui-bar > a').hasClass('ui-btn'));
	});

})(jQuery);