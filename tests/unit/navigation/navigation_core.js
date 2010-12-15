/*
 * mobile navigation unit tests
 */
(function( $ ) {
	var perspective = "ui-mobile-viewport-perspective",
			transitioning = "ui-mobile-viewport-transitioning",
	    animationCompleteFn = $.fn.animationComplete,

			removeClasses = function(){
				$("body").removeClass([perspective, transitioning].join(" "));
			};

	module('jquery.mobile.navigation.js', {
		teardown: function(){
			// unmock animation complete
			$.fn.animationComplete = animationCompleteFn;

			removeClasses();
		}});

	test( "changePage applys perspective class to mobile viewport for flip", function(){
		//stub to prevent class removal
		$.fn.animationComplete = function(){};

		$("#foo > a").click();

		ok($("body").hasClass(perspective), "has perspective class");
	});


	test( "changePage applys does not apply perspective class to mobile viewport for transitions other than flip", function(){
		//stub to prevent class removal
		$.fn.animationComplete = function(){};

		$("#bar > a").click();

		ok(!$("body").hasClass(perspective), "doesn't have perspective class");
	});

	test( "changePage applys transition class to mobile viewport for default transition", function(){
		//stub to prevent class removal
		$.fn.animationComplete = function(){};

		$("#baz > a").click();

		ok($("body").hasClass(transitioning), "has transitioning class");
	});
})(jQuery);