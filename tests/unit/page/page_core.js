/*
 * mobile page unit tests
 */
(function($){
	var libName = 'jquery.mobile.page.js',
			typeAttributeRegex = $.mobile.page.prototype._typeAttributeRegex;

	module(libName);

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

	test( "no auto-generated back button exists on first page", function(){
		ok( !$(".ui-header > :jqmData(rel='back')").length );
	});

	test( "input type replacement regex works properly", function(){
		ok(typeAttributeRegex.test( "<input type=range" ), "test no quotes" );
		ok(typeAttributeRegex.test( "<input type='range'" ), "test single quotes" );
		ok(typeAttributeRegex.test( "<input type=\"range\"" ), "test double quotes" );
		ok(typeAttributeRegex.test( "<input type=abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_"), "test \w" );
		ok(typeAttributeRegex.test( "<input        type=\"range\"" ), "test many preceding spaces" );
		ok(typeAttributeRegex.test( "<input type='range'>" ), "test final attribute (FF)" );

		ok(!typeAttributeRegex.test( "<inputtype=\"range\"" ), "requires preceding space" );
	});
})(jQuery);
