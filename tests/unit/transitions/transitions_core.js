/*
 * Transitions unit tests
 */
(function( $ ){
	var instance, proto, $to, $from;

	module( "Transition cleanFrom" );

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

	module( "Transition scrollPage", {
		setup: function() {
			instance = new $.mobile.Transition();
		},

		teardown: function() {
			window.scrollTo( 0 );
			$( "body" ).height( $(window).height() );
		}
	});

	test( "moves the page to the toScroll position", function() {
		$( "body" ).height( 5000 );
		instance.toScroll = 100;
		instance.scrollPage();
		equal( $(window).scrollTop(), 100, "page has been scrolled" );
	});

	test( "disables scrollstart for a short duration", function() {
		instance.toScroll = 0;
		instance.scrollPage();
		equal( $.event.special.scrollstart.enabled, false, "scrollstart is disabled" );
	});


	module( "Transition doneIn", {
		setup: function() {
			$to = $("<div>");
			instance = new $.mobile.Transition( "foo", "reverse", $to, "from");

			proto = $.extend({}, $.mobile.Transition.prototype);
			$.mobile.Transition.prototype.toggleViewportClass = $.noop;
		},

		teardown: function() {
			$.mobile.Transition.prototype = proto;
		}
	});

	test( "removes classes from the destination 'page'", function() {
		$to.addClass( "out in reverse foo" );
		instance.doneIn();
		ok( !$to.hasClass("out") );
		ok( !$to.hasClass("in") );
		ok( !$to.hasClass("reverse") );
		ok( !$to.hasClass("foo") );
	});

	test( "scrolls the page", function() {
		expect( 1 );

		// ensure the two values are different to trigger the method call
		window.scrollTo( 0 );
		instance.toScroll = 100;

		// stub to capture call
		instance.scrollPage = function() {
			ok(true, "scrollPage called" );
		};

		instance.doneIn();
	});

	test( "resolves the transition deferred with the requisite data", function() {
		expect( 4 );

		$.when( instance.deferred ).then(function( name, reverse, to, from ) {
			equal( name, "foo" );
			equal( reverse, "reverse" );
			equal( to, $to );
			equal( from, "from" );
		});

		instance.doneIn();
	});
})( jQuery );
