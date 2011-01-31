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
			},
			
			clearPageTransitionStack = function(){
				$.each(callbackQueue.reverse(), function(i, callback){
					callback()
				})
				callbackQueue = []
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
	
	QUnit.testDone = function (name) {
		$.mobile.urlHistory.clear();
		clearPageTransitionStack();
	};

	test( "changePage applys perspective class to mobile viewport for flip", function(){
		$("#foo > a").click();
		
		ok($("body").hasClass(perspective), "has perspective class");
	});

	test( "changePage does not apply perspective class to mobile viewport for transitions other than flip", function(){
		$("#bar > a").click();

		ok(!$("body").hasClass(perspective), "doesn't have perspective class");
	});

	test( "changePage applys transition class to mobile viewport for default transition", function(){
		$("#baz > a").click();
		
		ok($("body").hasClass(transitioning), "has transitioning class");
	});

	test( "explicit transition preferred for page navigation reversal (ie back)", function(){
		$("#fade-trans > a").click();
		finishPageTransition();
		
		$("#flip-trans > a").click();
		finishPageTransition();

		$("#fade-trans > a").click();
		ok($("#flip-trans").hasClass("fade"), "has fade class");		
	});


	test( "default transition is slide", function(){
		$("#default-trans > a").click();
		ok($("#no-trans").hasClass("slide"), "has slide class");
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
	});
	
})(jQuery);
