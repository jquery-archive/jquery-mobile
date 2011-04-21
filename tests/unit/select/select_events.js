/*
 * mobile select unit tests
 */

(function($){
	var libName = "jquery.mobile.forms.select.js";

	$(document).bind('mobileinit', function(){
		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	});

	module(libName, {
		teardown: function(){ location.hash = ""; }
	});

	asyncTest( "a large select menu should come up in a dialog many times", function(){
		var menu, select = $("#select-choice-many-container a");

		$.testHelper.sequence([
			function(){
				// bring up the dialog
				select.trigger("click");
			},

			function(){
				menu = $("#select-choice-many-menu");
				same(menu.parents('.ui-dialog').length, 1);
			},

			function(){
				// select and close the dialog
				menu.parents('ui-dialog').find("span.ui-icon-delete").click();
			},

			function(){
				//bring up the dialog again
				select.trigger("click");
			},

			function(){
				same(menu.parents('.ui-dialog').length, 1);
				start();
			}
		], 500);
	});

	asyncTest( "firing a click at least 400 ms later on the select screen overlay does close it", function(){
		$.Event.prototype.originalEvent = {
			touches: [ 'foo' ]
		};

		$.testHelper.sequence([
			function(){
				// bring up the smaller choice menu
				$("#select-choice-few-button").trigger("click");
			},

			function(){
				//select the first menu item
				$("#select-choice-few-menu a:first").click();
			},

			function(){
				same($("#select-choice-few-menu").parent(".ui-selectmenu-hidden").length, 1);
				start();
			}
		], 400);
	});

	test( "selects marked with data-native-menu=true should use a div as their button", function(){
		same($("#select-choice-native-container div.ui-btn").length, 1);
	});

	test( "selects marked with data-native-menu=true should not have a custom menu", function(){
		same($("#select-choice-native-container ul").length, 0);
	});

	test( "selects marked with data-native-menu=true should sit inside the button", function(){
		same($("#select-choice-native-container div.ui-btn select").length, 1);
	});
})(jQuery);
