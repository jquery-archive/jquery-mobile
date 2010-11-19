/*
 * mobile media unit tests
 */

(function( $ ) {
	var cssFn = $.fn.css,
	    widthFn = $.fn.width;

	// make sure original definitions are reset
	module('mobile.media', {
		teardown: function(){
			$.fn.css = cssFn;
			$.fn.width = widthFn;
		}
	});

	test( "media query check returns true when the position is absolute", function(){
		expect( 1 );
		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media('screen 1'), true);
	});

	test( "media query check returns false when the position is not absolute", function(){
		expect( 1 );
		$.fn.css = function(){ return "not absolute"; };
		same($.mobile.media('screen 2'), false);
	});

	test( "media query check is cached", function(){
		expect( 2 );

		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media('screen 3'), true);

		$.fn.css = function(){ return "not absolute"; };
		same($.mobile.media('screen 3'), true);
	});

	test( "adding breakpoints adds the appropriate width classes", function(){
		$.fn.width = function(){ return 120; };

		$.mobile.addResolutionBreakpoints(125);
		ok($('html').hasClass('max-width-125px'));
	});
})(jQuery);