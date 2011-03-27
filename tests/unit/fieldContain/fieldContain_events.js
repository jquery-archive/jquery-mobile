/*
 * mobile dialog unit tests
 */
(function($){
	module('jquery.mobile.fieldContain.js');

	test( "Field container contains appropriate css styles", function(){
		console.log($('#test-fieldcontain'))
	
		ok($('#test-fieldcontain').hasClass('ui-field-contain ui-body ui-br'), 'A fieldcontain element must contain styles "ui-field-contain ui-body ui-br"');
	});
})(jQuery);
