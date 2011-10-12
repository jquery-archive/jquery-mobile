/*
 * mobile event unit tests
 */

(function($){
	var libName = "jquery.mobile.event.js",
			absFn = Math.abs,
			originalEventFn = $.Event.prototype.originalEvent,
			preventDefaultFn = $.Event.prototype.preventDefault,
			events = ("touchstart touchmove touchend orientationchange tap taphold " +
								"swipe swipeleft swiperight scrollstart scrollstop").split( " " );

	module(libName, {
		setup: function(){

			// ensure bindings are removed
			$.each(events + "vmouseup vmousedown".split(" "), function(i, name){
				$("#qunit-fixture").unbind();
			});

			//NOTE unmock
			Math.abs = absFn;
			$.Event.prototype.originalEvent = originalEventFn;
			$.Event.prototype.preventDefault = preventDefaultFn;

			// make sure the event objects respond to touches to simulate
			// the collections existence in non touch enabled test browsers
			$.Event.prototype.touches = [{pageX: 1, pageY: 1 }];

			$($.mobile.pageContainer).unbind( "throttledresize" );
		}
	});

	$.testHelper.excludeFileProtocol(function(){
		test( "new events defined on the jquery object", function(){
			$.each(events, function( i, name ) {
				delete $.fn[name];
				same($.fn[name], undefined);
			});

			$.testHelper.reloadLib(libName);

			$.each(events, function( i, name ) {
				ok($.fn[name] !== undefined, name + " is not undefined");
			});
		});
	});

	asyncTest( "defined event functions bind a closure when passed", function(){
		expect( 1 );

		$('#qunit-fixture').bind(events[0], function(){
			ok(true, "event fired");
			start();
		});

		$('#qunit-fixture').trigger(events[0]);
	});

	asyncTest( "defined event functions trigger the event with no arguments", function(){
		expect( 1 );

		$('#qunit-fixture').bind('touchstart', function(){
			ok(true, "event fired");
			start();
		});

		$('#qunit-fixture').touchstart();
	});

	test( "defining event functions sets the attrFn to true", function(){
		$.each(events, function(i, name){
			ok($.attrFn[name], "attribute function is true");
		});
	});

	test( "scrollstart enabled defaults to true", function(){
		$.event.special.scrollstart.enabled = false;
		$.testHelper.reloadLib(libName);
		ok($.event.special.scrollstart.enabled, "scrollstart enabled");
	});

	asyncTest( "scrollstart setup binds a function that returns when its disabled", function(){
		expect( 1 );
		$.event.special.scrollstart.enabled = false;

		$( "#qunit-fixture" ).bind("scrollstart", function(){
			ok(false, "scrollstart fired");
		});

		$( "#qunit-fixture" ).bind("touchmove", function(){
			ok(true, "touchmove fired");
			start();
		});

		$( "#qunit-fixture" ).trigger("touchmove");
	});

	asyncTest( "scrollstart setup binds a function that triggers scroll start when enabled", function(){
		$.event.special.scrollstart.enabled = true;

		$( "#qunit-fixture" ).bind("scrollstart", function(){
			ok(true, "scrollstart fired");
			start();
		});

		$( "#qunit-fixture" ).trigger("touchmove");
	});

	asyncTest( "scrollstart setup binds a function that triggers scroll stop after 50 ms", function(){
		var triggered = false;
		$.event.special.scrollstart.enabled = true;

		$( "#qunit-fixture" ).bind("scrollstop", function(){
			triggered = true;
		});

		ok(!triggered, "not triggered");

		$( "#qunit-fixture" ).trigger("touchmove");

		setTimeout(function(){
			ok(triggered, "triggered");
			start();
		}, 50);
	});

	var forceTouchSupport = function(){
		$.support.touch = true;
		$.testHelper.reloadLib(libName);

		//mock originalEvent information
		$.Event.prototype.originalEvent = {
			touches: [{ 'pageX' : 0 }, { 'pageY' : 0 }]
		};
	};

	asyncTest( "long press fires tap hold after 750 ms", function(){
		var taphold = false;

		forceTouchSupport();

		$( "#qunit-fixture" ).bind("taphold", function(){
			taphold = true;
		});

		$( "#qunit-fixture" ).trigger("vmousedown");

		setTimeout(function(){
			ok(taphold);
			start();
		}, 751);
	});

	//NOTE used to simulate movement when checked
	//TODO find a better way ...
	var mockAbs = function(value){
		Math.abs = function(){
			return value;
		};
	};

	asyncTest( "move prevents taphold", function(){
		expect( 1 );
		var taphold = false;

		forceTouchSupport();
		mockAbs(100);

		//NOTE record taphold event
		$( "#qunit-fixture" ).bind("taphold", function(){
			ok(false, "taphold fired");
			taphold = true;
		});

		//NOTE start the touch events
		$( "#qunit-fixture" ).trigger("vmousedown");

		//NOTE fire touchmove to push back taphold
		setTimeout(function(){
			$( "#qunit-fixture" ).trigger("vmousecancel");
		}, 100);

		//NOTE verify that the taphold hasn't been fired
		//		 with the normal timing
		setTimeout(function(){
			ok(!taphold, "taphold not fired");
			start();
		}, 751);
	});

	asyncTest( "tap event fired without movement", function(){
		expect( 1 );
		var tap = false,
				checkTap = function(){
					ok(true, "tap fired");
				};

		forceTouchSupport();

		//NOTE record the tap event
		$( "#qunit-fixture" ).bind("tap", checkTap);

		$( "#qunit-fixture" ).trigger("vmousedown");
		$( "#qunit-fixture" ).trigger("vmouseup");
		$( "#qunit-fixture" ).trigger("vclick");

		setTimeout(function(){
			start();
		}, 400);
	});

	asyncTest( "tap event not fired when there is movement", function(){
		expect( 1 );
		var tap = false;
		forceTouchSupport();

		//NOTE record tap event
		$( "#qunit-fixture" ).bind("tap", function(){
			ok(false, "tap fired");
			tap = true;
		});

		//NOTE make sure movement is recorded
		mockAbs(100);

		//NOTE start and move right away
		$( "#qunit-fixture" ).trigger("touchstart");
		$( "#qunit-fixture" ).trigger("touchmove");

		//NOTE end touch sequence after 20 ms
		setTimeout(function(){
			$( "#qunit-fixture" ).trigger("touchend");
		}, 20);

		setTimeout(function(){
			ok(!tap, "not tapped");
			start();
		}, 40);
	});

	asyncTest( "tap event propagates up DOM tree", function(){
		var tap = 0,
			$qf = $( "#qunit-fixture" ),
			$doc = $( document ),
			docTapCB = function(){
				same(++tap, 2, "document tap callback called once after #qunit-fixture callback");
			};

		$qf.bind( "tap", function() {
			same(++tap, 1, "#qunit-fixture tap callback called once");
		});

		$doc.bind( "tap", docTapCB );

		$qf.trigger( "vmousedown" )
			.trigger( "vmouseup" )
			.trigger( "vclick" );

		// tap binding should be triggered twice, once for
		// #qunit-fixture, and a second time for document.
		same( tap, 2, "final tap callback count is 2" );

		$doc.unbind( "tap", docTapCB );

		start();
	});

	asyncTest( "stopPropagation() prevents tap from propagating up DOM tree", function(){
		var tap = 0,
			$qf = $( "#qunit-fixture" ),
			$doc = $( document ),
			docTapCB = function(){
				ok(false, "tap should NOT be triggered on document");
			};

		$qf.bind( "tap", function(e) {
			same(++tap, 1, "tap callback 1 triggered once on #qunit-fixture");
			e.stopPropagation();
		})
		.bind( "tap", function(e) {
			same(++tap, 2, "tap callback 2 triggered once on #qunit-fixture");
		});

		$doc.bind( "tap", docTapCB);

		$qf.trigger( "vmousedown" )
			.trigger( "vmouseup" )
			.trigger( "vclick" );

		// tap binding should be triggered twice.
		same( tap, 2, "final tap count is 2" );

		$doc.unbind( "tap", docTapCB );

		start();
	});

	asyncTest( "stopImmediatePropagation() prevents tap propagation and execution of 2nd handler", function(){
		var tap = 0,
			$cf = $( "#qunit-fixture" );
			$doc = $( document ),
			docTapCB = function(){
				ok(false, "tap should NOT be triggered on document");
			};

		// Bind 2 tap callbacks on qunit-fixture. Only the first
		// one should ever be called.
		$cf.bind( "tap", function(e) {
			same(++tap, 1, "tap callback 1 triggered once on #qunit-fixture");
			e.stopImmediatePropagation();
		})
		.bind( "tap", function(e) {
			ok(false, "tap callback 2 should NOT be triggered on #qunit-fixture");
		});

		$doc.bind( "tap", docTapCB);

		$cf.trigger( "vmousedown" )
			.trigger( "vmouseup" )
			.trigger( "vclick" );

		// tap binding should be triggered once.
		same( tap, 1, "final tap count is 1" );

		$doc.unbind( "tap", docTapCB );

		start();
	});

	var swipeTimedTest = function(opts){
		var swipe = false;

		forceTouchSupport();

		$( "#qunit-fixture" ).bind('swipe', function(){
			swipe = true;
		});

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		$( "#qunit-fixture" ).trigger("touchstart");

		//NOTE make sure the coordinates are calculated within range
		//		 to be registered as a swipe
		mockAbs(opts.coordChange);

		setTimeout(function(){
			$( "#qunit-fixture" ).trigger("touchmove");
			$( "#qunit-fixture" ).trigger("touchend");
		}, opts.timeout + 100);

		setTimeout(function(){
			same(swipe, opts.expected, "swipe expected");
			start();
		}, opts.timeout + 200);

		stop();
	};

	test( "swipe fired when coordinate change in less than a second", function(){
		swipeTimedTest({ timeout: 10, coordChange: 35, expected: true });
	});

	test( "swipe not fired when coordinate change takes more than a second", function(){
		swipeTimedTest({ timeout: 1000, coordChange: 35, expected: false });
	});

	test( "swipe not fired when coordinate change <= 30", function(){
		swipeTimedTest({ timeout: 1000, coordChange: 30, expected: false });
	});

	test( "swipe not fired when coordinate change >= 75", function(){
		swipeTimedTest({ timeout: 1000, coordChange: 75, expected: false });
	});

	asyncTest( "scrolling prevented when coordinate change > 10", function(){
		expect( 1 );

		forceTouchSupport();

		// ensure the swipe custome event is setup
		$( "#qunit-fixture" ).bind('swipe', function(){});

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		$.Event.prototype.preventDefault = function(){
			ok(true, "prevent default called");
			start();
		};

		mockAbs(11);

		$( "#qunit-fixture" ).trigger("touchstart");
		$( "#qunit-fixture" ).trigger("touchmove");
	});

	asyncTest( "move handler returns when touchstart has been fired since touchstop", function(){
		expect( 1 );

		// bypass triggered event check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		forceTouchSupport();

		// ensure the swipe custome event is setup
		$( "#qunit-fixture" ).bind('swipe', function(){});

		$( "#qunit-fixture" ).trigger("touchstart");
		$( "#qunit-fixture" ).trigger("touchend");

		$( "#qunit-fixture" ).bind("touchmove", function(){
			ok(true, "touchmove bound functions are fired");
			start();
		});

		Math.abs = function(){
			ok(false, "shouldn't compare coordinates");
		};

		$( "#qunit-fixture" ).trigger("touchmove");
	});

	var nativeSupportTest = function(opts){
		$.support.orientation = opts.orientationSupport;
		same($.event.special.orientationchange[opts.method](), opts.returnValue);
	};

	test( "orientation change setup should do nothing when natively supported", function(){
		nativeSupportTest({
			method: 'setup',
			orientationSupport: true,
			returnValue: false
		});
	});

	test( "orientation change setup should bind resize when not supported natively", function(){
		nativeSupportTest({
			method: 'setup',
			orientationSupport: false,
			returnValue: undefined //NOTE result of bind function call
		});
	});

	test( "orientation change teardown should do nothing when natively supported", function(){
		nativeSupportTest({
			method: 'teardown',
			orientationSupport: true,
			returnValue: false
		});
	});

	test( "orientation change teardown should unbind resize when not supported natively", function(){
		nativeSupportTest({
			method: 'teardown',
			orientationSupport: false,
			returnValue: undefined //NOTE result of unbind function call
		});
	});

	/* The following 4 tests are async so that the throttled event triggers don't interfere with subsequent tests */

	asyncTest( "throttledresize event proxies resize events", function(){
		$( window ).one( "throttledresize", function(){
			ok( true, "throttledresize called");
			start();
		});

		$( window ).trigger( "resize" );
	});

	asyncTest( "throttledresize event prevents resize events from firing more frequently than 250ms", function(){
		var called = 0;

		$(window).bind( "throttledresize", function(){
			called++;
		});

		// NOTE 250 ms * 3 = 750ms which is plenty of time
		// for the events to trigger before the next test, but
		// not so much time that the second resize will be triggered
		// before the call to same() is made
		$.testHelper.sequence([
			function(){
				$(window).trigger( "resize" ).trigger( "resize" );
			},

			// verify that only one throttled resize was called after 250ms
			function(){ same( called, 1 ); },

			function(){
				start();
			}
		], 250);
	});

	asyncTest( "throttledresize event promises that a held call will execute only once after throttled timeout", function(){
		var called = 0;

		expect( 2 );

		$.testHelper.eventSequence( "throttledresize", [
			// ignore the first call
			$.noop,

			function(){
				ok( true, "second throttled resize should run" );
			},

			function(timedOut){
				ok( timedOut, "third throttled resize should not run");
				start();
			}
		]);

		$.mobile.pageContainer
			.trigger( "resize" )
			.trigger( "resize" )
			.trigger( "resize" );
	});

	asyncTest( "mousedown mouseup and click events should add a which when its not defined", function() {
		var whichDefined = function( event ){
			same(event.which, 1);
		};

		$( document ).bind( "vclick", whichDefined);
		$( document ).trigger( "click" );

		$( document ).bind( "vmousedown", whichDefined);
		$( document ).trigger( "mousedown" );

		$( document ).bind( "vmouseup", function( event ){
			same(event.which, 1);
			start();
		});

		$( document ).trigger( "mouseup" );
	});
})(jQuery);
