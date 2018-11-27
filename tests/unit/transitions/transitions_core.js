/*
 * Transitions unit tests
 */
define( [ "qunit", "jquery" ], function( QUnit, $ ) {

var instance, $to, $from;

QUnit.module( "Transition cleanFrom" );

QUnit.test( "cleanFrom removes transition classes", function( assert ) {
	var $from = $( "<div>" ),
		transition = new $.mobile.Transition( "foo", false, $(), $from );

	$from.addClass( "out in reverse foo" );
	transition.cleanFrom();
	assert.ok( !$from.hasClass( "out" ) );
	assert.ok( !$from.hasClass( "in" ) );
	assert.ok( !$from.hasClass( "reverse" ) );
	assert.ok( !$from.hasClass( "foo" ) );
} );

QUnit.module( "Transition scrollPage", {
	setup: function() {
		instance = new $.mobile.Transition();
	},

	teardown: function() {
		window.scrollTo( 0, 0 );
		$( "body" ).height( $( window ).height() );
	}
} );

QUnit.test( "moves the page to the toScroll position", function( assert ) {
	$( "body" ).height( 5000 );
	instance.toScroll = 100;
	instance.scrollPage();
	assert.equal( $( window ).scrollTop(), 100, "page has been scrolled" );
} );

QUnit.test( "disables scrollstart for a short duration", function( assert ) {
	instance.toScroll = 0;
	instance.scrollPage();
	assert.equal( $.event.special.scrollstart.enabled, false, "scrollstart is disabled" );
} );

QUnit.module( "Transition doneIn", {
	setup: function() {
		$to = $( "<div>" );
		instance = new $.mobile.Transition( "foo", "reverse", $to, "from" );
		instance.toggleViewportClass = $.noop;
	}
} );

QUnit.test( "removes classes from the destination 'page'", function( assert ) {
	$to.addClass( "out in reverse foo" );
	instance.doneIn();
	assert.ok( !$to.hasClass( "out" ) );
	assert.ok( !$to.hasClass( "in" ) );
	assert.ok( !$to.hasClass( "reverse" ) );
	assert.ok( !$to.hasClass( "foo" ) );
} );

QUnit.test( "scrolls the page", function( assert ) {
	assert.expect( 1 );

	// Ensure the two values are different to trigger the method call
	window.scrollTo( 0, 0 );
	instance.toScroll = 100;

	// Stub to capture call
	instance.scrollPage = function() {
		assert.ok( true, "scrollPage called" );
	};

	instance.doneIn();
} );

QUnit.asyncTest( "resolves the transition deferred with the requisite data", function( assert ) {
	assert.expect( 4 );

	instance.deferred.done( function( name, reverse, to, from ) {
		assert.equal( name, "foo" );
		assert.equal( reverse, "reverse" );
		assert.equal( to, $to );
		assert.equal( from, "from" );
		QUnit.start();
	} );

	instance.doneIn();
} );

QUnit.module( "Transition hideIn", {
	setup: function() {
		$to = $( "<div>" );
		instance = new $.mobile.Transition( "foo", "reverse", $to, "from" );
		instance.toggleViewportClass = $.noop;
	}
} );

QUnit.test( "sets the z-index on the to element to prevent flickering in phonegap", function( assert ) {
	assert.expect( 3 );
	assert.equal( $to.css( "z-index" ), "" );

	instance.hideIn( function() {
		assert.equal( $to.css( "z-index" ), "-10" );
	} );

	assert.equal( $to.css( "z-index" ), "" );
} );

QUnit.module( "Transition startIn", {
	setup: function() {
		$to = $( "<div>" );
		instance = new $.mobile.Transition( "foo", "reverse", $to, "from" );
	}
} );

QUnit.test( "sets active page class on the dom element", function( assert ) {
	assert.ok( !$to.hasClass( "ui-page-active" ) );
	instance.startIn();
	assert.ok( $to.hasClass( "ui-page-active" ) );
} );

QUnit.test( "sets the height", function( assert ) {
	$to.height( 10 );
	assert.equal( $to.height(), 10 );
	instance.toScroll = 5;
	instance.startIn( 10 );
	assert.equal( $to.height(), 15, "height is toScroll + screenheight" );
} );

QUnit.test( "adds the reverse class and the transition name", function( assert ) {
	assert.ok( !$to.hasClass( "foo" ) );

	instance.name = "bar";
	instance.startIn( 0, "foo" );

	assert.ok( $to.hasClass( "foo" ), "has class 'foo'" );
	assert.ok( $to.hasClass( "bar" ), "has class 'bar'" );
} );

QUnit.module( "Transition transition", {
	setup: function() {
		$to = $from = $( "<div>" );
		instance = new $.mobile.Transition( "foo", "reverse", $to, $from );
	}
} );

QUnit.asyncTest( "runs in and out methods in order", function( assert ) {
	assert.expect( 4 );

	var counter = 0, defaults;

	defaults = $.extend( {}, $.mobile.Transition.prototype );

	// Transition child classes generally set this up
	instance.beforeStartOut = function() {
		this.doneOut.apply( this, arguments );
	};

	// When the transition is anything but "none" the animation is waited for
	// to fire the last step. stub and fire here
	$to.animationComplete = function( callback ) {
		callback();
	};

	instance.startOut = function() {
		assert.equal( counter, 0, "startOut is first" );
		counter++;

		defaults.startOut.apply( this, arguments );
	};

	instance.doneOut = function() {
		assert.equal( counter, 1, "doneOut is second" );
		counter++;

		defaults.doneOut.apply( this, arguments );
	};

	instance.startIn = function() {
		assert.equal( counter, 2, "startIn is first" );
		counter++;

		defaults.startIn.apply( this, arguments );
	};

	instance.doneIn = function() {
		assert.equal( counter, 3, "doneIn is fourth" );
		counter++;

		defaults.doneIn.apply( this, arguments );
		QUnit.start();
	};

	instance.transition();
} );

QUnit.test( "transition respects getMaxScrollForTransition", function( assert ) {
	var valuePassedToNone,
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

	$.mobile.Transition.prototype.startOut = function() {
		startOutCalled = true;
		return original.startOut.apply( this, arguments );
	};

	$.mobile.Transition.prototype.doneOut = function( height, reverse, none ) {
		doneOutCalled = true;
		valuePassedToNone = none;
		return original.doneOut.apply( this, arguments );
	};

	$.mobile.defaultHomeScroll = 0;

	( new $.mobile.Transition( "slide", false, $( [] ), $( [] ) ) ).transition();

	assert.deepEqual( startOutCalled, false, "startOut was not called" );
	assert.deepEqual( doneOutCalled, true, "doneOut was called" );
	assert.deepEqual( valuePassedToNone, true, "The value passed to none was true" );

	$.mobile.getMaxScrollForTransition = original.maxScroll;
	$.mobile.Transition.prototype.startOut = original.startOut;
	$.mobile.Transition.prototype.doneOut = original.doneOut;
	$.mobile.defaultHomeScroll = original.defaultHomeScroll;
} );

} );
