/*
 * mobile select unit tests
 */

(function($){
	var mouseUpTouchEnd = $.support.touch ? "touchend" : "mouseup";

	module('jquery.mobile.select.js');

	test( "a large select menu should come up in a dialog many times", function(){
		var menu, select = $("#select-choice-many-container a");

		// bring up the dialog
		select.trigger(mouseUpTouchEnd);
		menu = $("#select-choice-many-menu");
		same(menu.parents('.ui-dialog').length, 1);

		// select and close the dialog
		menu.find('li').click();

		//bring up the dialog again
		select.trigger(mouseUpTouchEnd);
		same(menu.parents('.ui-dialog').length, 1);
	});
})(jQuery);