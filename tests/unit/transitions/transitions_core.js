/*
 * Transitions unit tests
 */
(function( $ ){
	var instance;

	module( "Transition", {
		setup: function() {
			instance = new $.mobile.Transition();
		},

		teardown: function() {
			window.scrollTo( 0 );
			$( "body" ).height( $(window).height() );
		}
	});

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

	test( "scrollPage moves the page to the toScroll position", function() {
		$( "body" ).height( 5000 );
		instance.toScroll = 100;
		instance.scrollPage();
		equal( $(window).scrollTop(), 100, "page has been scrolled" );
	});

	test( "scrollPage disables scrollstart for a short duration", function() {
		instance.toScroll = 0;
		instance.scrollPage();
		equal( $.event.special.scrollstart.enabled, false, "scrollstart is disabled" );
	});

})( jQuery );
