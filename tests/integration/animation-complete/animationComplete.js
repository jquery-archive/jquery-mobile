/*
 * Mobile flipswitch unit tests
 */
define( [
	"qunit",
	"jquery"
	], function( QUnit, $ ) {
var oldTransitions, oldAnimations,
	countEvents = function( element, eventName ) {
		var count = 0,
			events = $._data( element, "events" );

		if ( events && events[ eventName ] ) {
			count = events[ eventName ].length;
		}

		return count;
	},
	events = ( function() {
		var nameIndex, match, event,
			names = [
				"animation", "transition",
				"mozAnimation", "mozTransition",
				"oAnimation", "oTransition",
				"webkitAnimation", "webkitTransition"
			],
			element = document.createElement( "a" ),
			events = {
				animation: { name: "animationend" },
				transition: { name: "transitionend" }
			};

		for ( nameIndex in names ) {
			if ( element.style[ names[ nameIndex ] ] !== undefined ) {
				match = names[ nameIndex ].match( /(.*)(animation|transition)$/i );
				event = match[ 2 ].toLowerCase();

				// Unprefixed is the best, so do not overwrite if we've already found an
				// unprefixed version
				if ( events[ event ].prefix !== "" ) {
					events[ event ] = {
						name: match[ 1 ] + match[ 2 ] + ( match[ 1 ] ? "End" : "end" ),
						prefix: match[ 1 ]
					};
				}
			}
		}

		return events;
	} )();

QUnit.module( "Callbacks: Event", {
	teardown: function() {
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "Make sure callback is executed and is cleared by actual event", function( assert ) {
	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false,
		ready = assert.async();

	$( "#transition-test" )
		.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
		.animationComplete( function() {
			transitionComplete = true;
		}, "transition" );

	$( "#animation-test" ).addClass( "in" ).animationComplete( function() {
		animationComplete = true;
	} );

	window.setTimeout( function() {
		assert.ok( transitionComplete, "transition completed" );
		assert.ok( animationComplete, "animation completed" );
		ready();
	}, 800 );
} );

QUnit.test( "Make sure that removeAnimationComplete unbinds callback", function( assert ) {
	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false,
		ready = assert.async();

	var transitionCallback =  function() {
		transitionComplete = true;
	};

	var animationCallback =  function() {
		animationComplete = true;
	};

	$( "#transition-test" )
		.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
		.animationComplete( transitionCallback, "transition" );

	$( "#animation-test" )
		.addClass( "in" )
		.animationComplete( animationCallback );

	$( "#transition-test" ).removeAnimationComplete( transitionCallback );
	$( "#animation-test" ).removeAnimationComplete( animationCallback );

	window.setTimeout( function() {
		assert.equal( transitionComplete, false, "transition callback didn't occur" );
		assert.equal( animationComplete, false, "animation callback didn't occur" );
		ready();
	}, 800 );
} );

QUnit.module( "Callbacks: fallback", {
	teardown: function() {
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "Make sure callback is executed by fall back when no animation", function( assert ) {
	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false,
		ready = assert.async();

	$( "#transition-test" ).animationComplete( function() {
		transitionComplete = true;
	}, "transition" );

	$( "#animation-test" ).animationComplete( function() {
		animationComplete = true;
	} );

	window.setTimeout( function() {
		assert.ok( transitionComplete, "transition callback called" );
		assert.ok( animationComplete, "animation callback called" );
		ready();
	}, 1200 );
} );

QUnit.module( "Callbacks: No support", {
	setup: function() {
		oldTransitions = $.support.cssTransitions,
		oldAnimations = $.support.cssAnimations;

		$.support.cssAnimations = false;
		$.support.cssTransitions = false;
	},
	teardown: function() {
		$.support.cssTransitions = oldTransitions;
		$.support.cssAnimations = oldAnimations;
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "callback executes immediately when animations unsupported on device", function( assert ) {
	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false,
		ready = assert.async();

	$( "#transition-test" )
		.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
		.animationComplete( function() {
			transitionComplete = true;
		}, "transition" );

	$( "#animation-test" ).addClass( "in" ).animationComplete( function() {
		animationComplete = true;
	} );

	window.setTimeout( function() {
		assert.ok( transitionComplete, "transition callback called" );
		assert.ok( animationComplete, "animation callback called" );
	}, 10 );

	window.setTimeout( function() {
		ready();
	}, 800 );
} );

QUnit.module( "Event Bindings", {
	teardown: function() {
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "Ensure at most one event is bound", function( assert ) {
	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false,
		ready = assert.async();

	$( "#transition-test" )
		.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
		.animationComplete( function() {
			transitionComplete = true;
		}, "transition" );
	$( "#animation-test" ).addClass( "in" ).animationComplete( function() {
		animationComplete = true;
	} );
	assert.ok( Object.keys( $._data( $( "#animation-test" )[ 0 ], "events" ) ).length === 1,
		"Only one animation event" );

	assert.ok( Object.keys( $._data( $( "#transition-test" )[ 0 ], "events" ) ).length === 1,
		"Only one transition event" );
	window.setTimeout( function() {
		ready();
	}, 800 );
} );

QUnit.module( "Event Bindings: no animation support", {
	setup: function() {
		oldTransitions = $.support.cssTransitions,
		oldAnimations = $.support.cssAnimations;

		$.support.cssAnimations = false;
		$.support.cssTransitions = false;
	},
	teardown: function() {
		$.support.cssTransitions = oldTransitions;
		$.support.cssAnimations = oldAnimations;
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "Make sure no bindings when no cssanimation support", function( assert ) {
	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false,
		ready = assert.async();

	window.setTimeout( function() {
		$( "#transition-test" ).animationComplete( function() {
			transitionComplete = true;
		}, "transition" );

		$( "#animation-test" ).animationComplete( function() {
			animationComplete = true;
		} );
		assert.ok( $._data( $( "#animation-test" )[ 0 ], "events" ) === undefined,
			"no animation bindings remain" );
		assert.ok( $._data( $( "#transition-test" )[ 0 ], "events" ) === undefined,
			"no transition bindings remain" );
		ready();
	}, 800 );
} );

QUnit.module( "Event Removal: event", {
	teardown: function() {
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "Make sure no bindings remain after event", function( assert ) {
	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false,
		ready = assert.async();

	$( "#transition-test" )
		.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
		.animationComplete( function() {
			transitionComplete = true;
		}, "transition" );

	$( "#animation-test" ).addClass( "in" ).animationComplete( function() {
		animationComplete = true;
	} );
	window.setTimeout( function() {
		assert.ok( $._data( $( "#animation-test" )[ 0 ], "events" ) === undefined,
			"no animation bindings remain" );
		assert.ok( $._data( $( "#transition-test" )[ 0 ], "events" ) === undefined,
			"no transition bindings remain" );
		ready();
	}, 800 );
} );

QUnit.module( "Event Removal: fallback", {
	setup: function() {
		$( "#transition-test" ).on( events.transition.name, $.noop );
		$( "#animation-test" ).on( events.animation.name, $.noop );
	},
	teardown: function() {
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
		$( "#transition-test" ).off( events.transition.name, $.noop );
		$( "#animation-test" ).off( events.animation.name, $.noop );
	}
} );
QUnit.test( "Make sure no bindings remain after fallback", function( assert ) {
	var ready = assert.async();

	assert.expect( 2 );
	var transitionComplete = false,
		animationComplete = false;

	$( "#transition-test" ).animationComplete( function() {
		transitionComplete = true;
	}, "transition" );

	$( "#animation-test" ).animationComplete( function() {
		animationComplete = true;
	} );

	window.setTimeout( function() {
		assert.deepEqual( countEvents( $( "#animation-test" )[ 0 ], events.animation.name ), 1,
			"no animation bindings remain" );
		assert.deepEqual( countEvents( $( "#transition-test" )[ 0 ], events.transition.name ), 1,
			"no transition bindings remain" );
		ready();
	}, 1200 );
} );

function createContextChecker( assert, expectedTransitionContext, expectedAnimationContext ) {
	var actualAnimationContext, actualTransitionContext,
		completeCount = 0,
		ready = assert.async(),
		maybeAssert = function() {
			completeCount++;
			if ( completeCount === 2 ) {
				assert.deepEqual( actualTransitionContext, expectedTransitionContext,
					"Transition context is correct" );
				assert.deepEqual( actualAnimationContext, expectedAnimationContext,
					"Animation context is correct" );
				ready();
			}
		};

	return {
		animationHandler: function() {
			actualAnimationContext = this;
			maybeAssert();
		},
		transitionHandler: function() {
			actualTransitionContext = this;
			maybeAssert();
		}
	};
}

QUnit.module( "Callback context and return value: event", {
	teardown: function() {
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "Make sure context and return value is correct for event", function( assert ) {
	assert.expect( 4 );

	var returnValue,
		transitionTest = $( "#transition-test" ),
		animationTest = $( "#animation-test" ),
		checker = createContextChecker( assert, transitionTest[ 0 ], animationTest[ 0 ] );

	returnValue = transitionTest
		.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
		.animationComplete( checker.transitionHandler, "transition" );

	assert.deepEqual( returnValue, transitionTest,
		"Returned jQuery object for transition is the one passed in" );

	returnValue = animationTest
		.addClass( "in" )
		.animationComplete( checker.animationHandler );

	assert.deepEqual( returnValue, animationTest,
		"Returned jQuery object for animation is the one passed in" );

} );

QUnit.module( "Callback context and return value: fallback" );

QUnit.test( "Make sure context and return value is correct for fallback", function( assert ) {
	assert.expect( 4 );

	var returnValue,
		transitionTest = $( "#transition-test" ),
		animationTest = $( "#animation-test" ),
		checker = createContextChecker( assert, transitionTest[ 0 ], animationTest[ 0 ] );

	returnValue = transitionTest.animationComplete( checker.transitionHandler, "transition" );

	assert.deepEqual( returnValue, transitionTest,
		"Returned jQuery object for transition is the one passed in" );

	returnValue = animationTest.animationComplete( checker.animationHandler );

	assert.deepEqual( returnValue, animationTest,
		"Returned jQuery object for animation is the one passed in" );
} );

QUnit.module( "Callback context and return value: no support", {
	setup: function() {
		oldTransitions = $.support.cssTransitions,
		oldAnimations = $.support.cssAnimations;

		$.support.cssAnimations = false;
		$.support.cssTransitions = false;
	},
	teardown: function() {
		$.support.cssTransitions = oldTransitions;
		$.support.cssAnimations = oldAnimations;
		$( "#transition-test" )
			.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
		$( "#animation-test" ).removeClass( "in" );
	}
} );

QUnit.test( "Make sure context and return value is correct for no support", function( assert ) {
	assert.expect( 4 );

	var returnValue,
		transitionTest = $( "#transition-test" ),
		animationTest = $( "#animation-test" ),
		checker = createContextChecker( assert, transitionTest[ 0 ], animationTest[ 0 ] );

	returnValue = transitionTest
		.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
		.animationComplete( checker.transitionHandler, "transition" );

	assert.deepEqual( returnValue, transitionTest,
		"Returned jQuery object for transition is the one passed in" );

	returnValue = animationTest
		.addClass( "in" )
		.animationComplete( checker.animationHandler );

	assert.deepEqual( returnValue, animationTest,
		"Returned jQuery object for animation is the one passed in" );
} );

QUnit.module( "Empty jQuery object" );

QUnit.test( "Make sure callback is not called on empty jQuery object", function( assert ) {
	var transitionCallbackExecuted = false,
		animationCallbackExecuted = false,
		ready = assert.async();

	$( [] ).animationComplete( function() {
		transitionCallbackExecuted = true;
	}, "transition" );

	$( [] ).animationComplete( function() {
		animationCallbackExecuted = true;
	} );

	setTimeout( function() {
		assert.deepEqual( transitionCallbackExecuted, false, "Transition callback was not run" );
		assert.deepEqual( animationCallbackExecuted, false, "Animation callback was not run" );
		ready();
	}, $.fn.animationComplete.defaultDuration * 1.5 );
} );

} );
