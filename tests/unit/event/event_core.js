/*
 * mobile event unit tests
 */

(function( $ ) {
	var libName = "jquery.mobile.event.js",
			absFn = Math.abs,
			originalEventFn = $.Event.prototype.originalEvent,
			preventDefaultFn = $.Event.prototype.preventDefault,
			events = ("touchstart touchmove touchend orientationchange tap taphold " +
								"swipe swipeleft swiperight scrollstart scrollstop").split( " " );

	module(libName, {
		teardown: function(){
			$.each(events, function(i, name){
				$("#main").unbind(name);
			});

			$($.event.special.scrollstart).unbind("scrollstart");
			$($.event.special.tap).unbind("tap");
			$($.event.special.tap).unbind("taphold");
			$($.event.special.swipe).unbind("swipe");

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

	test( "defined event functions bind a closure when passed", function(){
		expect( 1 );

		$('#main')[events[0]](function(){
			ok(true, "event fired");
		});

		$('#main').trigger(events[0]);
	});

	test( "defined event functions trigger the event with no arguments", function(){
		expect( 1 );

		$('#main')[events[0]](function(){
			ok(true, "event fired");
		});

		$('#main')[events[0]]();
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

	test( "scrollstart setup binds a function that returns when its disabled", function(){
		expect( 1 );
		$.event.special.scrollstart.enabled = false;

		$($.event.special.scrollstart).bind("scrollstart", function(){
			ok(false, "scrollstart fired");
		});

		$($.event.special.scrollstart).bind("touchmove", function(){
			ok(true, "touchmove fired");
		});

		$($.event.special.scrollstart).trigger("touchmove");
	});

	test( "scrollstart setup binds a function that triggers scroll start when enabled", function(){
		$.event.special.scrollstart.enabled = true;

		$($.event.special.scrollstart).bind("scrollstart", function(){
			ok(true, "scrollstart fired");
		});

		$($.event.special.scrollstart).trigger("touchmove");
	});

	test( "scrollstart setup binds a function that triggers scroll stop after 50 ms", function(){
		var triggered = false;
		$.event.special.scrollstart.enabled = true;

		$($.event.special.scrollstart).bind("scrollstop", function(){
			triggered = true;
		});

		ok(!triggered, "not triggered");

		$($.event.special.scrollstart).trigger("touchmove");

		stop();
		setTimeout(function(){
			ok(triggered, "triggered");
			start();
		}, 50);
	});

	var forceTouchSupport = function(){
		$.support.touch = true;
		$.testHelper.reloadLib(libName);
	};

	test( "long press fires tap hold after 750 ms", function(){
		var taphold = false;

		forceTouchSupport();

		$($.event.special.tap).bind("taphold", function(){
			taphold = true;
		});

		$($.event.special.tap).trigger("touchstart");

		stop();
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

	test( "touchmove prevents taphold", function(){
		var taphold = false;

		forceTouchSupport();
		mockAbs(100);

		//NOTE record taphold event
		stop();
		$($.event.special.tap).bind("taphold", function(){
			taphold = true;
		});

		//NOTE start the touch events
		$($.event.special.tap).trigger("touchstart");

		//NOTE fire touchmove to push back taphold
		setTimeout(function(){
			$($.event.special.tap).trigger("touchmove");
		}, 100);

		//NOTE verify that the taphold hasn't been fired
		//		 with the normal timing
		setTimeout(function(){
			ok(!taphold, "taphold not fired");
			start();
		}, 751);
	});

	test( "tap event fired without movement", function(){
		var tap = false;

		forceTouchSupport();

		//NOTE record the tap event
		$($.event.special.tap).bind("tap", function(){
			start();
			tap = true;
		});

		stop();
		$($.event.special.tap).trigger("touchstart");
		$($.event.special.tap).trigger("touchend");

		ok(tap, "tapped");
	});

	test( "tap event not fired when there is movement", function(){
		var tap = false;
		forceTouchSupport();

		//NOTE record tap event
		$($.event.special.tap).bind("tap", function(){
			tap = true;
		});

		//NOTE make sure movement is recorded
		mockAbs(100);

		//NOTE start and move right away
		$($.event.special.tap).trigger("touchstart");
		$($.event.special.tap).trigger("touchmove");

		//NOTE end touch sequence after 20 ms
		stop();
		setTimeout(function(){
			$($.event.special.tap).trigger("touchend");
			start();
		}, 20);

		ok(!tap, "not tapped");
	});

	var swipeTimedTest = function(opts){
		var swipe = false;

		forceTouchSupport();

		$($.event.special.swipe).bind('swipe', function(){
			swipe = true;
			start();
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
		}, opts.timeout);

		stop();
		setTimeout(function(){
			same(swipe, opts.expected, "swipe expected");

			//NOTE the start in the event closure won't be fired, fire it here
			if(!opts.expected) { start(); }
		}, opts.timeout + 10);
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

	test( "scrolling prevented when coordinate change > 10", function(){
		expect( 1 );

		//NOTE bypass the trigger source check
		$.Event.prototype.originalEvent = {
			touches: false
		};

		$.Event.prototype.preventDefault = function(){
			ok(true, "prevent default called");
		};

		mockAbs(11);

		$($.event.special.swipe).trigger("touchstart");
		$($.event.special.swipe).trigger("touchmove");
	});

	test( "move handler returns when touchstart has been fired since touchstop", function(){
		expect( 1 );

		$.Event.prototype.originalEvent = {
			touches: false
		};

		$($.event.special.swipe).trigger("touchstart");
		$($.event.special.swipe).trigger("touchend");

		$($.event.special.swipe).bind("touchmove", function(){
			ok(true, "touchmove bound functions are fired");
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