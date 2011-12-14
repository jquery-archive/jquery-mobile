/*
 * mobile navigation unit tests
 */
(function($){
	var perspective = "viewport-flip",
			transitioning = "ui-mobile-viewport-transitioning",
			animationCompleteFn = $.fn.animationComplete,

			//TODO centralize class names?
			transitionTypes = "in out fade slide flip reverse pop",

			isTransitioning = function(page){
				return $.grep(transitionTypes.split(" "), function(className, i){
					return page.hasClass(className);
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
				stop();
				var checkTransitionStack = function(){
					if(callbackQueue.length>0) {
						setTimeout(function(){
							finishPageTransition();
							checkTransitionStack();
						},0);
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

			clearPageTransitionStack();
			clearUrlHistory();
		},

		teardown: function(){
			// unmock animation complete
			$.fn.animationComplete = animationCompleteFn;
		}
	});

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

	test( "changePage queues requests", function(){
		var firstPage = $("#foo"),
			secondPage = $("#bar");

		$.mobile.changePage(firstPage);
		$.mobile.changePage(secondPage);

		stop();
		setTimeout(function(){
			ok(isTransitioningIn(firstPage), "first page begins transition");
			ok(!isTransitioningIn(secondPage), "second page doesn't transition yet");

			finishPageTransition();

			setTimeout(function(){
				ok(!isTransitioningIn(firstPage), "first page transition should be complete");
				ok(isTransitioningIn(secondPage), "second page should begin transitioning");
				start();
			},0);
		},0);
	});

	test( "default transition is pop for a dialog", function(){
		expect( 1 );
		stop();
		setTimeout(function(){
			$("#default-trans-dialog > a").click();

			ok($("#no-trans-dialog").hasClass("pop"), "expected the pop class to be present but instead was " + $("#no-trans-dialog").attr('class'));

			start();
		}, 900);
	});

	test( "animationComplete return value", function(){
		$.fn.animationComplete = animationCompleteFn;
		equals($("#foo").animationComplete(function(){})[0], $("#foo")[0]);
	});
})(jQuery);
