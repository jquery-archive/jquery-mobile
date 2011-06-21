/*
 * mobile media unit tests
 */

(function($){
	var cssFn = $.fn.css,
			widthFn = $.fn.width;

	// make sure original definitions are reset
	module('jquery.mobile.media.js', {
		setup: function(){
			$(document).trigger('mobileinit.htmlclass');
		},
		teardown: function(){
			$.fn.css = cssFn;
			$.fn.width = widthFn;
		}
	});

	test( "media query check returns true when the position is absolute", function(){
		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media("screen 1"), true);
	});

	test( "media query check returns false when the position is not absolute", function(){
		$.fn.css = function(){ return "not absolute"; };
		same($.mobile.media("screen 2"), false);
	});

	test( "media query check is cached", function(){
		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media("screen 3"), true);

		$.fn.css = function(){ return "not absolute"; };
		same($.mobile.media("screen 3"), true);
	});

	test( "window widths smaller than the break points set max-width classes", function(){
		$.fn.width = function(){ return 120; };

		$.mobile.addResolutionBreakpoints([125]);
		ok($("html").hasClass("max-width-125px"));
	});

	test( "window widths larger than the break points set min-width classes", function(){
		$.fn.width = function(){ return 1900; };

		$.mobile.addResolutionBreakpoints([125]);
		ok($("html").hasClass("min-width-125px"));
	});

	test( "many break points result in many class additions", function(){
		$.fn.width = function(){ return 1900; };
		$.mobile.addResolutionBreakpoints([1, 2]);

		ok($("html").hasClass("min-width-1px"));
		ok($("html").hasClass("min-width-2px"));
	});

	test( "adds all classes for default res breakpoints", function(){
		expect( 4 );
		$.fn.width = function(){ return 1900; };
		$.mobile.addResolutionBreakpoints([]);

		// TODO should expose the defaults to prevent brittle tests
		$.each([320, 480, 768, 1024], function(i, element){
			ok($("html").hasClass("min-width-" + element + "px"));
		});
	});

	test( "binds remove of portrait and landscape classes orientation fired", function(){
		expect( 1 );

		$.Event.prototype.orientation = "foo";

		$(window).bind("orientationchange.htmlclass", function(event){
			ok(!$("html").hasClass("portrait landscape"));
			start();
		});

		$("html").addClass("portrait landscape");
		$(window).trigger("orientationchange.htmlclass");
		stop();
	});

	test( "sets break point class additions on orientation change", function(){
		$.fn.width = function(){ return 1900; };

		$("html").removeClass("min-width-320px");
		$(window).trigger("orientationchange.htmlclass");
		ok($("html").hasClass("min-width-320px"));
	});
})(jQuery);