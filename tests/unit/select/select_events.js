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
	
	test( "select controls will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-select").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-select").length, "enhancements applied" );
	});
	
})(jQuery);
