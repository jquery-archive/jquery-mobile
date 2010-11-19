/*
 * mobile media unit tests
 */

(function( $ ) {
	test( "media check returns true when the position is absolute", function(){
		expect( 1 );
		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media('screen 1'), true);
	});

	test( "media check returns false when the position is not absolute", function(){
		expect( 1 );
		$.fn.css = function(){ return "not absolute"; };
		same($.mobile.media('screen 2'), false);
	});

	test( "media check is cached", function(){
		expect( 2 );

		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media('screen 3'), true);

		$.fn.css = function(){ return "not absolute"; };
		same($.mobile.media('screen 3'), true);
	});
})(jQuery);