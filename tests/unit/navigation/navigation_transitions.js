/*
 * mobile navigation unit tests
 */
(function($){
	var perspective = "ui-mobile-viewport-perspective",
			transitioning = "ui-mobile-viewport-transitioning",
			animationCompleteFn = $.fn.animationComplete,
			
			//animationComplete callback queue
			callbackQueue = [],
			
			finishPageTransition = function(){
				callbackQueue.pop()();
			},
			
			clearPageTransitionStack = function(){
				stop();
				var checkTransitionStack = function(){
					if(callbackQueue.length>0) {
						setTimeout(function(){
							finishPageTransition();
							checkTransitionStack();
						},0)
					}
					else {
						start();
					}
				};
				checkTransitionStack();
			},
			
			//wipe all urls
			clearUrlHistory = function(){
				$.mobile.urlHistory.stack = [];
				$.mobile.urlHistory.activeIndex = 0;
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
	
	QUnit.testStart = function (name) {
		clearPageTransitionStack();
		clearUrlHistory();
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
		stop();
		setTimeout(function(){
			finishPageTransition();
			$("#flip-trans > a").click();
			setTimeout(function(){
				finishPageTransition();
				$("#fade-trans > a").click();
				setTimeout(function(){
					ok($("#flip-trans").hasClass("fade"), "has fade class");
					start();
				},0);
			},0);
		},0);
	});

	test( "default transition is slide", function(){
		$("#default-trans > a").click();
		stop();
		setTimeout(function(){
			ok($("#no-trans").hasClass("slide"), "has slide class");
			start();
		},0);
	});
	
})(jQuery);
