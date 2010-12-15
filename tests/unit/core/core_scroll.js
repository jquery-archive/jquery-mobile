/*
 * mobile core unit tests
 */

(function( $ ) {
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
		ok($(window).scrollTop() > 0);

		if(pos) {
			$.mobile.silentScroll(pos);
		} else {
			$.mobile.silentScroll();
		}
	};

	test( "silent scroll scrolls the page to the top by default", function(){
		scrollUp();

		stop();
		setTimeout(function(){
			same($(window).scrollTop(), 0);
			start();
		}, scrollTimeout);
	});

	test( "silent scroll scrolls the page to the passed y position", function(){
		var pos = 10;
		scrollUp(pos);

		stop();
		setTimeout(function(){
			same($(window).scrollTop(), pos);
			start();
		}, scrollTimeout);
	});

	// NOTE may be brittle depending on timing
	test( "silent scroll takes at least 20 ms to scroll to the top", function(){
		scrollUp();

		stop();
		setTimeout(function(){
			ok($(window).scrollTop() != 0);
			start();
		}, scrollTimeout - 1);
	});

	test( "scrolling marks scrollstart as disabled for 150 ms", function(){
		$.event.special.scrollstart.enabled = true;
		scrollUp();
		ok(!$.event.special.scrollstart.enabled);

		stop();
		setTimeout(function(){
			ok($.event.special.scrollstart.enabled);
			start();
		}, scrollStartEnabledTimeout);
	});
})(jQuery);
