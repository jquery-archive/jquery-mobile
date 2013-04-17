/*
 * Kitchen Sink Tests
 */
(function($){
	module("Kitchen Sink");

	test( "Nothing on the page has a class that contains `undefined`.", function(){
    var undefClass = $(".ui-page").find("[class*='undefined']");

		ok( undefClass.length == 0 );
	});

  module("Widget Create");

  // required as part of the deprecation of init for #3602
  test( "all widget create events fire before page create", function() {
    // see preinit.js
    ok( window.createTests.pageCreateTimed );
  });
})(jQuery);
