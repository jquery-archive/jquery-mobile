/*
 * Transitions unit tests
 */
(function( $ ){
	module( "Transition" );

	test( "cleanFrom removes transition classes", function(){
		var $from = $("<div>"),
			transition = new $.mobile.Transition( "foo", false, $(), $from);

		$from.addClass( "out in reverse foo" );
		transition.cleanFrom();
		ok( !$from.hasClass("out") );
		ok( !$from.hasClass("in") );
		ok( !$from.hasClass("reverse") );
		ok( !$from.hasClass("foo") );
	});
})( jQuery );
