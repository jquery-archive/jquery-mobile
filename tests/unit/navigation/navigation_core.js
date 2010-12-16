/*
 * mobile navigation unit tests
 */
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
		// Fix test layout issues from page styling needed for webkit transitions
		$("body").attr('style', 'margin: 8px;');
	}
});


test( "changePage applys perspective class to mobile viewport for flip", function(){
	//stub to prevent class removal
	$.fn.animationComplete = function(){};

	$("#foo > a").click();

	ok($("body").hasClass(perspective), "has perspective class");
});


test( "changePage does not apply perspective class to mobile viewport for transitions other than flip", function(){
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
		$("#fade-trans > a").click();

		ok($("#fade-trans").hasClass("in fade reverse"),
			 "has fade class and back reverse");

		start();
	}, 900);
});
