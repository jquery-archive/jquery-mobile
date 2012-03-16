/*
 * Kitchen Sink Tests
 */
(function($){
	module("kitchen sink class test");

	test( "Nothing on the page has a class that contains `undefined`.", function(){
		var undefClass = $(".ui-page").find("[class*='undefined']");

		ok( undefClass.length == 0 );
	});

})(jQuery);
