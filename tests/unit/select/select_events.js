/*
 * mobile select unit tests
 */

(function($){
	var mouseUpTouchEnd = $.support.touch ? "touchend" : "mouseup",
			libName = "jquery.mobile.forms.select.js";

	module(libName);

	test( "a large select menu should come up in a dialog many times", function(){
		var menu, select = $("#select-choice-many-container a");

		// bring up the dialog
		select.trigger(mouseUpTouchEnd);
		menu = $("#select-choice-many-menu");
		same(menu.parents('.ui-dialog').length, 1);

		// select and close the dialog
		menu.parents('ui-dialog').find("span.ui-icon-delete").click();

		//bring up the dialog again
		select.trigger(mouseUpTouchEnd);
		same(menu.parents('.ui-dialog').length, 1);
	});

	test( "firing an immediate click on the select screen overlay doesn't close it", function(){
		$.Event.prototype.originalEvent = {
			touches: [ 'foo' ]
		};

		$("#select-choice-few-button").trigger(mouseUpTouchEnd);
		$(".ui-selectmenu-screen").click();
		same($("#select-choice-few-menu").parent(".ui-selectmenu-hidden").length, 0);
	});

	test( "firing a click at least 400 ms later on the select screen overlay does close it", function(){
		$.Event.prototype.originalEvent = {
			touches: [ 'foo' ]
		};

		$("#select-choice-few-button").trigger(mouseUpTouchEnd);

		// click the first menu item
		setTimeout(function(){
			$("#select-choice-few-menu a:first").click();
		}, 400);

		// verify the menu is hidden
		setTimeout(function(){
			same($("#select-choice-few-menu").parent(".ui-selectmenu-hidden").length, 1);
			start();
		}, 500);

		stop();
	});

	test( "selects marked with data-native=true should not bring up the custom menu", function(){
		$("#select-choice-native-button").trigger(mouseUpTouchEnd);
		same($("#select-choice-native-menu").parent(".ui-selectmenu-hidden").length, 1);
	});
})(jQuery);