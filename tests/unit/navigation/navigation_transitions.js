/*
 * mobile navigation unit tests
 */
(function($){
	var perspective = "ui-mobile-viewport-perspective",
			transitioning = "ui-mobile-viewport-transitioning",
			animationCompleteFn = $.fn.animationComplete,

			removeBodyClasses = function(){
				$("body").removeClass([perspective, transitioning].join(" "));
			},

			removePageTransClasses = function(){
				$("[data-role='page']").removeClass("in out fade slide flip reverse pop");
			};

	module('jquery.mobile.navigation.js', {
		setup: function(){
			//stub to prevent class removal
			$.fn.animationComplete = function(){};
		},

		teardown: function(){
			// unmock animation complete
			$.fn.animationComplete = animationCompleteFn;

			// required cleanup from animation complete mocking
			removeBodyClasses();
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
		$.fn.animationComplete = function(){};

		stop();
		setTimeout(function(){
			$("#fade-trans > a").click();
		}, 300);

		setTimeout(function(){
			$("#flip-trans > a").click();
		}, 600);

		setTimeout(function(){
			//guarantee that we check only the newest changes
			removePageTransClasses();

			$("#fade-trans > a").click();

			ok($("#flip-trans").hasClass("fade"), "has fade class");

			start();
		}, 900);
	});

	test( "previous transition used when not set and going back through url stack", function(){

		stop();
		setTimeout(function(){
			$("#no-trans > a").click();
		}, 300);

		setTimeout(function(){
			$("#pop-trans > a").click();
		}, 600);


		setTimeout(function(){
			//guarantee that we check only the newest changes
			removePageTransClasses();

			$("#no-trans > a").click();

			ok($("#pop-trans").hasClass("pop"), "has pop class");

			start();
		}, 900);
	});

	test( "default transition is slide", function(){
		stop();
		setTimeout(function(){
			//guarantee that we check only the newest changes
			removePageTransClasses();

			$("#default-trans > a").click();

			ok($("#no-trans").hasClass("slide"), "has slide class");

			start();
		}, 900);
	});
})(jQuery);