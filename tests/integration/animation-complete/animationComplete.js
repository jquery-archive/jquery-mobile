/*
 * mobile flipswitch unit tests
 */
(function($){
	var oldTransitions, oldAnimations;
	module( "Callbacks: Event", {
		teardown: function() {
			$( "#transition-test" )
				.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
			$( "#animation-test" ).removeClass( "in" );
		}
	});
	asyncTest( "Make sure callback is executed and is cleared by actual event", function() {
		expect( 2 );
		var transitionComplete = false,
			animationComplete = false;

		$( "#transition-test" )
			.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
			.animationComplete( function() {
				transitionComplete = true;
		}, "transition" );

		$( "#animation-test" ).addClass( "in" ).animationComplete( function() {
			animationComplete = true;
		});

		window.setTimeout( function(){
			ok( transitionComplete, "transition completed" );
			ok( animationComplete, "animation completed" );
			start();
		}, 800 );
	});
	module( "Callbacks: fallback", {
		teardown: function() {
			$( "#transition-test" )
				.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
			$( "#animation-test" ).removeClass( "in" );
		}
	});
	asyncTest( "Make sure callback is executed by fall back when no animation", function() {
		expect( 2 );
		var transitionComplete = false,
			animationComplete = false;

		$( "#transition-test" ).animationComplete( function() {
			transitionComplete = true;
		}, "transition" );

		$( "#animation-test" ).animationComplete( function() {
			animationComplete = true;
		});

		window.setTimeout( function(){
			ok( transitionComplete, "transition callback called" );
			ok( animationComplete, "animation callback called" );
			start();
		}, 1200 );
	});
	module( "Callbacks: No support", {
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
	});
	asyncTest( "call back executes immeditly when animations not supported on device", function() {
		expect( 2 );
		var transitionComplete = false,
			animationComplete = false;

		$( "#transition-test" )
			.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
			.animationComplete( function() {
				transitionComplete = true;
		}, "transition" );

		$( "animation-test" ).addClass( "in" ).animationComplete( function() {
			animationComplete = true;
		});

		window.setTimeout( function(){
			ok( transitionComplete, "transition callback called" );
			ok( animationComplete, "animation callback called" );
		}, 10 );

		window.setTimeout( function(){
			start();
		}, 800 );
	});
	module( "Event Bindings", {
		teardown: function() {
			$( "#transition-test" )
				.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
			$( "#animation-test" ).removeClass( "in" );
		}
	});
	asyncTest( "Ensure at most one event is bound", function() {
		expect( 2 );

		$( "#transition-test" )
			.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
			.animationComplete( function() {
				transitionComplete = true;
			}, "transition" );
		$( "#animation-test" ).addClass( "in" ).animationComplete( function() {
			animationComplete = true;
		});
		ok( Object.keys( $._data( $("#animation-test")[0], "events" ) ).length === 1,
		 	"Only one animation event" );

		ok( Object.keys( $._data( $("#transition-test")[0], "events" ) ).length === 1,
			 "Only one transition event" );
		window.setTimeout( function(){
			start();
		}, 800 );
	});
	module( "Event Bindings: no animation support", {
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
	});
	asyncTest( "Make sure no bidnings when no cssanimation support", function() {
		expect( 2 );
		var transitionComplete = false,
			animationComplete = false;

		window.setTimeout( function(){
			$( "#transition-test" ).animationComplete( function() {
				transitionComplete = true;
			}, "transition" );

			$( "#animation-test" ).animationComplete( function() {
				animationComplete = true;
			});
			ok( $._data( $("#animation-test")[0], "events" ) === undefined,
				"no animation bindings remain" );
			ok( $._data( $("#transition-test")[0], "events" ) === undefined,
				"no transition bindings remain" );
			start();
		}, 800 );
	});
	module( "Event Removal: event", {
		teardown: function() {
			$( "#transition-test" )
				.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
			$( "#animation-test" ).removeClass( "in" );
		}
	});
	asyncTest( "Make sure no bidnings remain after event", function() {
		expect( 2 );
		var transitionComplete = false,
			animationComplete = false;

		$( "#transition-test" )
			.addClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" )
			.animationComplete( function() {
				transitionComplete = true;
		}, "transition" );

		$( "#animation-test" ).addClass( "in" ).animationComplete( function() {
			animationComplete = true;
		});
		window.setTimeout( function(){
			ok( $._data( $("#animation-test")[0], "events" ) === undefined,
				"no animation bindings remain" );
			ok( $._data( $("#transition-test")[0], "events" ) === undefined,
				"no transition bindings remain" );
			start();
		}, 800 );
	});
	module( "Event Removal: fallback", {
		teardown: function() {
			$( "#transition-test" )
				.removeClass( "ui-panel-animate ui-panel-position-left ui-panel-display-overlay" );
			$( "#animation-test" ).removeClass( "in" );
		}
	});
	asyncTest( "Make sure no bidnings remain after fallback", function() {
		expect( 2 );
		var transitionComplete = false,
			animationComplete = false;

		$( "#transition-test" ).animationComplete( function() {
			transitionComplete = true;
		}, "transition" );

		$( "#animation-test" ).animationComplete( function() {
			animationComplete = true;
		});

		window.setTimeout( function(){
			ok( $._data( $("#animation-test")[0], "events" ) === undefined,
				"no animation bindings remain" );
			ok( $._data( $("#transition-test")[0], "events" ) === undefined,
				"no transition bindings remain" );
			start();
		}, 1200 );
	});
})( jQuery );