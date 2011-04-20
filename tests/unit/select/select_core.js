/*
 * mobile select unit tests
 */

(function($){
	var libName = "jquery.mobile.forms.select.js";

	$(document).bind("mobileinit", function(){
		$.mobile.selectmenu.prototype.options.nativeMenu = false;
	});

	module(libName, {
		teardown: function(){ location.hash = ""; }
	});

	asyncTest( "custom select menu always renders screen from the left", function(){
		expect( 1 );
		var select = $("ul#select-offscreen-menu");

		$("#select-offscreen-container a").trigger("click");

		setTimeout(function(){
			ok(select.offset().left >= 30);
			start();
		}, 1000);
	});

	asyncTest( "selecting an item from a dialog sized custom select menu leaves no dialog hash key", function(){
		var dialogHashKey = "ui-state=dialog";

		$.testHelper.sequence([
			function(){
				$("#select-choice-many-container-hash-check a").trigger("click");
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) > -1);
				$(".ui-page-active li").trigger("click");
			},

			function(){
				ok(location.hash.indexOf(dialogHashKey) == -1);
				start();
			}
		], 500);
	});
})(jQuery);
