/*
 * mobile navigation unit tests
 */
(function($){
	var perspective = "ui-mobile-viewport-perspective",
			transitioning = "ui-mobile-viewport-transitioning",
			animationCompleteFn = $.fn.animationComplete,

			//TODO centralize class names?
			transitionTypes = "in out fade slide flip reverse pop",
			
			isTransitioning = function(page){
				return $.grep(transitionTypes.split(" "), function(className, i){
					return page.hasClass(className)
				}).length > 0;
			},
			
			isTransitioningIn = function(page){
				return page.hasClass("in") && isTransitioning(page);
			},
			
			//animationComplete callback queue
			callbackQueue = [],
			
			finishPageTransition = function(){
				callbackQueue.pop()();
			};

	module('jquery.mobile.navigation.js', {
		setup: function(){
			//stub to prevent class removal
			$.fn.animationComplete = function(callback){
				callbackQueue.unshift(callback);
			};
			
		},

		teardown: function(){
			// unmock animation complete
			$.fn.animationComplete = animationCompleteFn;
		}
	});

	test( "changePage applys perspective class to mobile viewport for flip", function(){
		$("#foo > a").click();
		
		ok($("body").hasClass(perspective), "has perspective class");
		
		finishPageTransition();
	});

	test( "changePage does not apply perspective class to mobile viewport for transitions other than flip", function(){
		$("#bar > a").click();

		ok(!$("body").hasClass(perspective), "doesn't have perspective class");
		
		finishPageTransition();
	});

	test( "changePage applys transition class to mobile viewport for default transition", function(){
		$("#baz > a").click();
		
		ok($("body").hasClass(transitioning), "has transitioning class");
		
		finishPageTransition();
	});

	test( "explicit transition preferred for page navigation reversal (ie back)", function(){
		$("#fade-trans > a").click();
		finishPageTransition();
		
		$("#flip-trans > a").click();
		finishPageTransition();

		$("#fade-trans > a").click();
		ok($("#flip-trans").hasClass("fade"), "has fade class");		
		finishPageTransition();
	});

	test( "previous transition used when not set and going back through url stack", function(){
		$("#no-trans > a").click();
		finishPageTransition();

		$("#pop-trans > a").click();
		finishPageTransition();

		$("#no-trans > a").click();
		ok($("#pop-trans").hasClass("pop"), "has pop class");
		finishPageTransition();
	});

	test( "default transition is slide", function(){
		$("#default-trans > a").click();
		ok($("#no-trans").hasClass("slide"), "has slide class");
		finishPageTransition();
	});
	
	test( "changePage queues requests", function(){
		var firstPage = $("#foo"),
			secondPage = $("#bar");
		
		$.mobile.changePage(firstPage);
		ok(isTransitioningIn(firstPage), "first page begins transition");
		$.mobile.changePage(secondPage);
		ok(!isTransitioningIn(secondPage), "second page doesn't transition yet");
		
		finishPageTransition();
		ok(!isTransitioningIn(firstPage), "first page transition should be complete");
		ok(isTransitioningIn(secondPage), "second page should begin transitioning");
		
		finishPageTransition();
	});
	
})(jQuery);
