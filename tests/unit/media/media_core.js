/*
 * mobile media unit tests
 */

(function( $ ) {
	var css_fn = $.fn.css;

	// make sure the original definition is replaced
	module('mobile.media', {
		teardown: function(){
			$.fn.css = css_fn;
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
})(jQuery);