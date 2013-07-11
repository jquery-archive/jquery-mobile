/*
 * mobile media unit tests
 */

(function($){

	test( "$.ui.media function returns same boolean result as window.matchMedia", function(){
		deepEqual($.ui.media("screen"), window.matchMedia("screen").matches);
	});

	test( "$.ui.media function returns boolean result", function(){
		deepEqual( typeof $.ui.media("screen"), "boolean" );
	});

	test( "$.ui.media function returns false result for inapplicable media", function(){
		deepEqual( $.ui.media("foo"), false );
	});




})(jQuery);