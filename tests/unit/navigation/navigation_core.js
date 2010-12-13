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
		$.mobile.changePage("#page0", "flip", false, false);
		ok($("#main").
			 hasClass(perspective), "has perspective class");
	});

	//TODO test negative case and normal class application
})(jQuery);