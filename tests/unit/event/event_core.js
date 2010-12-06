/*
 * mobile event unit tests
 */

(function( $ ) {
	var libName = "jquery.mobile.event.js",
			events = ("touchstart touchmove touchend orientationchange tap taphold " +
								"swipe swipeleft swiperight scrollstart scrollstop").split( " " );

	module(libName, {
		teardown: function(){
			$.each(events, function(i, name){
				$("#main").unbind(name);
			});

			$($.event.special.scrollstart).unbind("scrollstart");
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
			start();
			ok(!triggered);
		}, 48);

		stop();
		setTimeout(function(){
			start();
			ok(triggered);
		}, 50);

		//NOTE async tests below won't fire unless start is called (??)
		start();
	});

	test( "long press fires tap hold after 750 ms", function(){
		var taphold = false;
		$.support.touch = true;

		$.testHelper.reloadLib(libName);

		stop();
		$($.event.special.tap).bind("taphold", function(){
			start();
			taphold = true;
		});

		$($.event.special.tap).trigger("touchstart");

		stop();
		setTimeout(function(){
			start();
			ok(!taphold);
		}, 749);

		stop();
		setTimeout(function(){
			start();
			ok(taphold);
	  }, 751);
	});
})(jQuery);
