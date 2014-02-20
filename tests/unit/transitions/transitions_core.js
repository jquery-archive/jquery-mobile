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
			instance.toggleViewportClass = $.noop;
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

	module( "Transition hideIn", {
		setup: function() {
			$to = $("<div>");
			instance = new $.mobile.Transition( "foo", "reverse", $to, "from");
			instance.toggleViewportClass = $.noop;
		}
	});

	test( "sets the z-index on the to element to prevent flickering in phonegap", function() {
		expect( 3 );
		equal( $to.css( "z-index" ), "" );

		instance.hideIn(function() {
			equal( $to.css( "z-index" ), "-10" );
		});

		equal( $to.css( "z-index" ), "" );
	});

	module( "Transition startIn", {
		setup: function() {
			$to = $("<div>");
			instance = new $.mobile.Transition( "foo", "reverse", $to, "from");
		}
	});

	test( "sets active page class on the dom element", function() {
		ok( !$to.hasClass($.mobile.activePageClass) );
		instance.startIn();
		ok( $to.hasClass($.mobile.activePageClass) );
	});

	test( "sets the height", function() {
		$to.height( 10 );
		equal( $to.height(), 10 );
		instance.toScroll = 5;
		instance.startIn( 10 );
		equal( $to.height(), 15, "height is toScroll + screenheight" );
	});

	test( "adds the reverse class and the transition name", function() {
		ok( !$to.hasClass("foo") );

		instance.name = "bar";
		instance.startIn( 0, "foo" );

		ok( $to.hasClass("foo"), "has class 'foo'" );
		ok( $to.hasClass("bar"), "has class 'bar'" );
	});

	module( "Transition transition", {
		setup: function() {
			$to = $from = $("<div>");
			instance = new $.mobile.Transition( "foo", "reverse", $to, $from );
		}
	});

	asyncTest( "runs in and out methods in order", function() {
		expect( 4 );

		var counter = 0, defaults;

		defaults = $.extend({}, $.mobile.Transition.prototype);

		// transition child classes generally set this up
		instance.beforeStartOut = function() {
			this.doneOut.apply(this, arguments);
		};

		// when the transition is anything but "none" the animation is waited for
		// to fire the last step. stub and fire here
		$to.animationComplete = function( callback ) {
			callback();
		};

		instance.startOut = function() {
			equal( counter, 0, "startOut is first" );
			counter++;

			defaults.startOut.apply(this, arguments);
		};

		instance.doneOut = function() {
			equal( counter, 1, "doneOut is second" );
			counter++;

			defaults.doneOut.apply(this, arguments);
		};

		instance.startIn = function() {
			equal( counter, 2, "startIn is first" );
			counter++;

			defaults.startIn.apply(this, arguments);
		};

		instance.doneIn = function() {
			equal( counter, 3, "doneIn is fourth" );
			counter++;

			defaults.doneIn.apply(this, arguments);
			start();
		};

		instance.transition();
	});

	test( "transition respects getMaxScrollForTransition", function() {
		var transition, valuePassedToNone,
			original = {
				maxScroll: $.mobile.getMaxScrollForTransition,
				startOut: $.mobile.Transition.prototype.startOut,
				doneOut: $.mobile.Transition.prototype.doneOut,
				defaultHomeScroll: $.mobile.defaultHomeScroll
			},
			startOutCalled = false,
			doneOutCalled = false;

		$.mobile.getMaxScrollForTransition = function() {
			return -1;
		};

		$.mobile.Transition.prototype.startOut = function( screenHeight, reverseClass, none ) {
			startOutCalled = true;
			return original.startOut.apply( this, arguments );
		};

		$.mobile.Transition.prototype.doneOut = function( height, reverse, none, preventFocus ) {
			doneOutCalled = true;
			valuePassedToNone = none;
			return original.doneOut.apply( this, arguments );
		};

		$.mobile.defaultHomeScroll = 0;

		( new $.mobile.Transition( "slide", false, $([]), $([]) ) ).transition();

		deepEqual( startOutCalled, false, "startOut was not called" );
		deepEqual( doneOutCalled, true, "doneOut was called" );
		deepEqual( valuePassedToNone, true, "The value passed to none was true" );

		$.mobile.getMaxScrollForTransition = original.maxScroll;
		$.mobile.Transition.prototype.startOut = original.startOut;
		$.mobile.Transition.prototype.doneOut = original.doneOut;
		$.mobile.defaultHomeScroll = original.defaultHomeScroll;
	});
})( jQuery );
