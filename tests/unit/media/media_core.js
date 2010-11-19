/*
 * mobile media unit tests
 */

(function( $ ) {
	test( "media check returns true when the position is absolute", function(){
		expect( 1 );
		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media('screen'), true);
	});

	test( "media check is cached", function(){
		expect( 2 );

		$.fn.css = function(){ return "absolute"; };
		same($.mobile.media('screen'), true);

		$.fn.css = function(){ return "not absolute"; };
		same($.mobile.media('screen'), true);
	});
})(jQuery);