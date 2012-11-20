/*
 * mobile media unit tests
 */

(function($){

	test( "$.mobile.media function returns same boolean result as window.matchMedia", function(){
		deepEqual($.mobile.media("screen"), window.matchMedia("screen").matches);
	});

	test( "$.mobile.media function returns boolean result", function(){
		deepEqual( typeof $.mobile.media("screen"), "boolean" );
	});

	test( "$.mobile.media function returns false result for inapplicable media", function(){
		deepEqual( $.mobile.media("foo"), false );
	});




})(jQuery);