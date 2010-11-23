/*
 * mobile media unit tests
 */

(function( $ ) {
	var cssFn = $.fn.css,
	    widthFn = $.fn.width;

	// make sure original definitions are reset
	module('jquery.mobile.media.js', {
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

	test( "triggering mobile init triggers orientationchange.htmlclass", function(){
		expect( 1 );

		$(window).bind("orientationchange.htmlclass", function(event){
			ok(event);
		});

		$(document).trigger("mobileinit.htmlclass");
	});

	test( "binds remove of portrait and landscape classes resize/orientation fired", function(){
		$.Event.prototype.orientation = true;

		$("html").addClass("portrait landscape");
		$(window).trigger("resize.htmlclass");
		ok(!$("html").hasClass("portrait landscape"));

		$("html").addClass("portrait landscape");
		$(window).trigger("resize.htmlclass");
		ok(!$("html").hasClass("portrait landscape"));
	});

	test( "sets break point class additions on resize/orientation change", function(){
		$.fn.width = function(){ return 1900; };

		$("html").removeClass("min-width-320px");
		$(window).trigger("resize.htmlclass");
		ok($("html").hasClass("min-width-320px"));
	});
})(jQuery);