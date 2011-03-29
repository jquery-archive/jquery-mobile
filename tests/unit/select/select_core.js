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


	asyncTest( "custom select menu always renders screen from the left", function(){
		expect( 1 );
		var select = $("ul#select-offscreen-menu");

		$('#select-offscreen-container a').trigger("click");

		setTimeout(function(){
			ok(select.offset().left >= 30);
			start();
		}, 1000);
	});
})(jQuery);
