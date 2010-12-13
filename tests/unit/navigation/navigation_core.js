/*
 * mobile navigation unit tests
 */
(function( $ ) {
	var perspective = "ui-mobile-viewport-perspective",
			transitioning = "ui-mobile-viewport-transitioning",
	    animationCompleteFn = $.fn.animationComplete,

			removeClasses = function(){
				$("#main").removeClass([perspective, transitioning].join(" "));
			},

	    insertNewTestPage = function(i){
				var id = "other" + i;
				$("<div data-role='page' id='" + id + "'></div>").appendTo("#main");
				return "#" + id;
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

		$.mobile.changePage("#other", "flip", false, false);
		ok($("#main").
			 hasClass(perspective), "has perspective class");
	});

	test( "changePage doesn't apply perspective class to mobile viewport for other transitions", function(){
		//stub to prevent class removal
		$.fn.animationComplete = function(){};

		$.each("slide slideup slidedown pop fade flip".split(" "), function(i, trans){
			$.mobile.changePage(insertNewTestPage(i), trans, false, false);

			ok(!$("#main").
				 hasClass(perspective), "has no perspective class");
		});
	});

	test( "changePage applys transitioning class", function(){
		var classSet = false;

		//stub to prevent class removal
		$.fn.animationComplete = function(){};

		$.mobile.changePage("#other", "flip", false, false);

		ok($("#main").
			 hasClass(transitioning), "has transitioning class");
	});

	test( "changePage applys and removes transitioning class", function(){
		$.mobile.changePage("#other", "flip", false, false);

		stop();
		setTimeout(function(){
			ok(!$("#main").
				 hasClass(transitioning), "has transitioning class");
			start();
		}, 1000);
	});
})(jQuery);