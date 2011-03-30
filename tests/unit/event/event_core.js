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
			$.each(events, function(i, name){
				$.each([$("#qunit-fixture"),
					$($.event.special.scrollstart),
					$($.event.special.tap),
					$($.event.special.tap),
					$($.event.special.swipe)], function(j, obj){
						obj.unbind(name);
					});
			});

			//NOTE unmock
			Math.abs = absFn;
			$.Event.prototype.originalEvent = originalEventFn;
			$.Event.prototype.preventDefault = preventDefaultFn;
		}
	});

	$.testHelper.excludeFileProtocol(function(){
		test( "new events defined on the jquery object", function(){
			$.each(events, function( i, name ) {
				delete $.fn[name];
				same($.fn[name], undefined);
			});

			$.testHelper.reloadLib(libName);

			$.each($.fn.clone(events), function( i, name ) {
				ok($.fn[name] !== undefined, name + "is not undefined");
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
		stop();
	});

	asyncTest( "defined event functions trigger the event with no arguments", function(){
		expect( 1 );

		$('#qunit-fixture').bind('touchstart', function(){
			ok(true, "event fired");
			start();
		});

		$('#qunit-fixture').touchstart();
		stop();
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

		$($.event.special.scrollstart).bind("scrollstart", function(){
			ok(false, "scrollstart fired");
		});

		$($.event.special.scrollstart).bind("touchmove", function(){
			ok(true, "touchmove fired");
			start();
		});

		$($.event.special.scrollstart).trigger("touchmove");
	});

	asyncTest( "scrollstart setup binds a function that triggers scroll start when enabled", function(){
		$.event.special.scrollstart.enabled = true;

		$($.event.special.scrollstart).bind("scrollstart", function(){
			ok(true, "scrollstart fired");
			start();
		});

		$($.event.special.scrollstart).trigger("touchmove");
	});

	asyncTest( "scrollstart setup binds a function that triggers scroll stop after 50 ms", function(){
		var triggered = false;
		$.event.special.scrollstart.enabled = true;

		$($.event.special.scrollstart).bind("scrollstop", function(){
			triggered = true;
		});

		ok(!triggered, "not triggered");

		$($.event.special.scrollstart).trigger("touchmove");

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

		$($.event.special.tap).bind("taphold", function(){
			taphold = true;
		});

		$($.event.special.tap).trigger("vmousedown");

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
		$($.event.special.tap).bind("taphold", function(){
			ok(false, "taphold fired");
			taphold = true;
		});

		//NOTE start the touch events
		$($.event.special.tap).trigger("vmousedown");

		//NOTE fire touchmove to push back taphold
		setTimeout(function(){
			$($.event.special.tap).trigger("vmousecancel");
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
		$($.event.special.tap).bind("tap", checkTap);

		$($.event.special.tap).trigger("vmousedown");
		$($.event.special.tap).trigger("vmouseup");
		$($.event.special.tap).trigger("vclick");

		setTimeout(function(){
			start();
		}, 400);
	});

	asyncTest( "tap event not fired when there is movement", function(){
		expect( 1 );
		var tap = false;
		forceTouchSupport();

		//NOTE record tap event
		$($.event.special.tap).bind("tap", function(){
			ok(false, "tap fired");
			tap = true;
		});

		//NOTE make sure movement is recorded
		mockAbs(100);

		//NOTE start and move right away
		$($.event.special.tap).trigger("touchstart");
		$($.event.special.tap).trigger("touchmove");

		//NOTE end touch sequence after 20 ms
		setTimeout(function(){
			$($.event.special.tap).trigger("touchend");
		}, 20);

		setTimeout(function(){
			ok(!tap, "not tapped");
			start();
		}, 40);
	});

	var swipeTimedTest = function(opts){
		var swipe = false;

		forceTouchSupport();

		$($.event.special.swipe).bind('swipe', function(){
			swipe = true;
		});

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		$($.event.special.swipe).trigger("touchstart");

		//NOTE make sure the coordinates are calculated within range
		//		 to be registered as a swipe
		mockAbs(opts.coordChange);

		setTimeout(function(){
			$($.event.special.swipe).trigger("touchmove");
			$($.event.special.swipe).trigger("touchend");
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
		$($.event.special.swipe).bind('swipe', function(){});

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		$.Event.prototype.preventDefault = function(){
			ok(true, "prevent default called");
			start();
		};

		mockAbs(11);

		$($.event.special.swipe).trigger("touchstart");
		$($.event.special.swipe).trigger("touchmove");
	});

	asyncTest( "move handler returns when touchstart has been fired since touchstop", function(){
		expect( 1 );

		// bypass triggered event check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		forceTouchSupport();

		// ensure the swipe custome event is setup
		$($.event.special.swipe).bind('swipe', function(){});

		$($.event.special.swipe).trigger("touchstart");
		$($.event.special.swipe).trigger("touchend");

		$($.event.special.swipe).bind("touchmove", function(){
			ok(true, "touchmove bound functions are fired");
			start();
		});

		Math.abs = function(){
			ok(false, "shouldn't compare coordinates");
		};

		$($.event.special.swipe).trigger("touchmove");
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
})(jQuery);
