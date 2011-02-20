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
	
	test( "selects marked with data-jq-native-menu=true should use a div as their button", function(){
		same($("#select-choice-native-container div.ui-btn").length, 1);
	});

	test( "selects marked with data-jq-native-menu=true should not have a custom menu", function(){
		same($("#select-choice-native-container ul").length, 0);
	});
	
	test( "selects marked with data-jq-native-menu=true should sit inside the button", function(){
		same($("#select-choice-native-container div.ui-btn select").length, 1);
	});
})(jQuery);