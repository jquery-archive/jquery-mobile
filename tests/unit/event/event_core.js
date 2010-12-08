/*
 * mobile event unit tests
 */

(function( $ ) {
	var libName = "jquery.mobile.event.js",
			absFn = Math.abs,
			events = ("touchstart touchmove touchend orientationchange tap taphold " +
								"swipe swipeleft swiperight scrollstart scrollstop").split( " " );

	module(libName, {
		teardown: function(){
			$.each(events, function(i, name){
				$("#main").unbind(name);
			});

			$($.event.special.scrollstart).unbind("scrollstart");

			//NOTE unmock abs
			Math.abs = absFn;
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
				ok($.fn[name] !== undefined);
			});
		});
	});

	test( "defined event functions bind a closure when passed", function(){
		expect( 1 );

		$('#main')[events[0]](function(){
			ok(true);
		});

		$('#main').trigger(events[0]);
	});

	test( "defined event functions trigger the event with no arguments", function(){
		expect( 1 );

		$('#main')[events[0]](function(){
			ok(true);
		});

		$('#main')[events[0]]();
	});

	test( "defining event functions sets the attrFn to true", function(){
		$.each(events, function(i, name){
			ok($.attrFn[name]);
		});
	});

	test( "scrollstart enabled defaults to true", function(){
		$.event.special.scrollstart.enabled = false;
		$.testHelper.reloadLib(libName);
		ok($.event.special.scrollstart.enabled);
	});

	test( "scrollstart setup binds a function that returns when its disabled", function(){
		expect( 0 );
		$.event.special.scrollstart.enabled = false;

		$($.event.special.scrollstart).bind("scrollstart", function(){
			ok(false);
		});

		$($.event.special.scrollstart).trigger("touchmove");
	});

	test( "scrollstart setup binds a function that triggers scroll start when enabled", function(){
		$.event.special.scrollstart.enabled = true;

		$($.event.special.scrollstart).bind("scrollstart", function(){
			ok(true);
		});

		$($.event.special.scrollstart).trigger("touchmove");
	});

	test( "scrollstart setup binds a function that triggers scroll stop after 50 ms", function(){
		var triggered = false;
		$.event.special.scrollstart.enabled = true;

		$($.event.special.scrollstart).bind("scrollstop", function(){
			triggered = true;
		});

		ok(!triggered);

		$($.event.special.scrollstart).trigger("touchmove");

		stop();
		setTimeout(function(){
			ok(triggered);
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

	test( "touchmove pushes back taphold", function(){
		var taphold = false;

		forceTouchSupport();
		mockAbs(100);

		//NOTE record taphold event
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
		stop();
		setTimeout(function(){
			ok(!taphold);

			//NOTE start and stop required to fire other events?
			start();
			stop();
		}, 751);

		//NOTE verify that the taphold hasn't been fired
		//		 with the normal timing
		setTimeout(function(){
			ok(taphold);
			start();
		}, 851);
	});

	test( "tap event fired without movement", function(){
		var tap = false;

		forceTouchSupport();

		//NOTE record the tap event
		$($.event.special.tap).bind("tap", function(){
			start();
			tap = true;
		});

		$($.event.special.tap).trigger("touchstart");
		$($.event.special.tap).trigger("touchend");
		stop();

		ok(tap);
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
		setTimeout(function(){
			$($.event.special.tap).trigger("touchend");
		}, 20);

		ok(!tap);
	});

	var swipeTimedTest = function(timeout, expected){
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
		//     to be registered as a swipe
		mockAbs(35);

		setTimeout(function(){
			$($.event.special.swipe).trigger("touchmove");
			$($.event.special.swipe).trigger("touchend");
		}, timeout);

		stop();
		setTimeout(function(){
			same(swipe, expected);
			start();
		}, timeout + 10);
	};

	test( "swipe fired when coords change in less than a second", function(){
		swipeTimedTest(10, true);
	});

	test( "swipe not fired when coords change takes more than a second", function(){
		swipeTimedTest(1000, false);
	});
})(jQuery);