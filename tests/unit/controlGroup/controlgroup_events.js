/*
 * mobile dialog unit tests
 */
(function($){
	module('jquery.mobile.controlGroup.js');

	test("vertical controlgroup is styled correctly", function(){
		ok($('#test-controlgroup-vertical').hasClass('ui-corner-all ui-controlgroup ui-controlgroup-vertical'), 'Failed to render expected styles for vertical controlgroup');
		
		ok($('#test-controlgroup-vertical > a').eq(0).hasClass('ui-corner-top'), 'First vertical button should have a rounded top corner');
		
		ok($('#test-controlgroup-vertical > a').filter(':last').hasClass('ui-corner-bottom ui-controlgroup-last'), 'Last vertical button should have a rounded bottom corner');
		
		ok(!$('#test-controlgroup-vertical > a').hasClass('ui-btn-corner-all ui-shadow'), 'Shadows and corners should have been removed from buttons.');
	});

	test("horizontal controlgroup is styled correctly", function(){
		ok($('#test-controlgroup-horizontal').hasClass('ui-corner-all ui-controlgroup ui-controlgroup-horizontal'), 'Failed to render expected styles for horizontal controlgroup');
		
		ok($('#test-controlgroup-horizontal > a').eq(0).hasClass('ui-corner-left'), 'First horizontal button should have a rounded left corner');
		
		ok($('#test-controlgroup-horizontal > a').filter(':last').hasClass('ui-corner-right ui-controlgroup-last'), 'Last horizontal button should have a rounded right corner');
	});
})(jQuery);
