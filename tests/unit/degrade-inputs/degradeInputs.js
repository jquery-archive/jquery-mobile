/*
 * degradeInputs unit tests
 */

(function($){
	module('jquery.ui.degradeInputs.js');

	test('keepNative elements should not be degraded', function() {
		deepEqual($('input#not-to-be-degraded').attr("type"), "range");
	});
})(jQuery);