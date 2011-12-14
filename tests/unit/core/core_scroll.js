/*
 * mobile core unit tests
 */

(function($){
	var libName = "jquery.mobile.core.js",
			scrollTimeout = 20, // TODO expose timing as an attribute
			scrollStartEnabledTimeout = 150;

	module(libName, {
		setup: function(){
			$("<div id='scroll-testing' style='height: 1000px'></div>").appendTo("body");
		},

		teardown: function(){
			$("#scroll-testing").remove();
		}
	});

	var scrollUp = function( pos ){
		$(window).scrollTop(1000);
		ok($(window).scrollTop() > 0, $(window).scrollTop());
		$.mobile.silentScroll(pos);
	};

	asyncTest( "silent scroll scrolls the page to the top by default", function(){
		scrollUp();

		setTimeout(function(){
			same($(window).scrollTop(), 0);
			start();
		}, scrollTimeout);
	});

	asyncTest( "silent scroll scrolls the page to the passed y position", function(){
		var pos = 10;
		scrollUp(pos);

		setTimeout(function(){
			same($(window).scrollTop(), pos);
			start();
		}, scrollTimeout);
	});

	test( "silent scroll is async", function(){
		scrollUp();
		ok($(window).scrollTop() != 0, "scrolltop position should not be zero");
		start();
	});

	asyncTest( "scrolling marks scrollstart as disabled for 150 ms", function(){
		$.event.special.scrollstart.enabled = true;
		scrollUp();
		ok(!$.event.special.scrollstart.enabled);

		setTimeout(function(){
			ok($.event.special.scrollstart.enabled);
			start();
		}, scrollStartEnabledTimeout);
	});

	//TODO test that silentScroll is called on window load
})(jQuery);
