/*
 * mobile slider unit tests
 */

(function($){
	var onChangeCnt = 0;
	window.onChangeCounter = function() {
		onChangeCnt++;
	};

	module('jquery.mobile.slider.js events', {
		setup: function() {
			// force the value to be an increment of 10 when we aren't testing the rounding
			$("#stepped").val( 20 );
		}
	});

	var keypressTest = function(opts){
		var slider = $(opts.selector),
		    val = window.parseFloat(slider.val()),
				handle = slider.siblings('.ui-slider').find('.ui-slider-handle');

		expect( opts.keyCodes.length );

		$.each(opts.keyCodes, function(i, elem){

			// stub the keycode value and trigger the keypress
			$.Event.prototype.keyCode = $.mobile.keyCode[elem];
			handle.trigger('keydown');

			val += opts.increment;
			deepEqual(val, window.parseFloat(slider.val(), 10), "new value is " + opts.increment + " different");
		});
	};

	test( "slider should move right with up, right, and page up keypress", function(){
		keypressTest({
			selector: '#range-slider-up',
			keyCodes: ['UP', 'RIGHT', 'PAGE_UP'],
			increment: 1
		});
	});

	test( "slider should move left with down, left, and page down keypress", function(){
		keypressTest({
			selector: '#range-slider-down',
			keyCodes: ['DOWN', 'LEFT', 'PAGE_DOWN'],
			increment: -1
		});
	});

	test( "slider should move to range minimum on end keypress", function(){
		var selector = "#range-slider-end",
				initialVal = window.parseFloat($(selector).val(), 10),
		    max = window.parseFloat($(selector).attr('max'), 10);

		keypressTest({
			selector: selector,
			keyCodes: ['END'],
			increment: max - initialVal
		});
	});

	test( "slider should move to range minimum on end keypress", function(){
		var selector = "#range-slider-home",
				initialVal = window.parseFloat($(selector).val(), 10);

		keypressTest({
			selector: selector,
			keyCodes: ['HOME'],
			increment: 0 - initialVal
		});
	});

	test( "slider should move positive by steps on keypress", function(){
		keypressTest({
			selector: "#stepped",
			keyCodes: ['RIGHT'],
			increment: 10
		});
	});

	test( "slider should move negative by steps on keypress", function(){
		keypressTest({
			selector: "#stepped",
			keyCodes: ['LEFT'],
			increment: -10
		});
	});

	test( "slider should validate input value on blur", function(){
		var slider = $("#range-slider-up");
		slider.focus();
		slider.val(200);
		deepEqual(slider.val(), "200");
		slider.blur();
		deepEqual(slider.val(), slider.attr('max'));
	});

	test( "slider should not validate input on keyup", function(){
		var slider = $("#range-slider-up");
		slider.focus();
		slider.val(200);
		deepEqual(slider.val(), "200");
		slider.keyup();
		deepEqual(slider.val(), "200");
	});

	test( "input type should degrade to number when slider is created", function(){
		deepEqual($("#range-slider-up").attr( "type" ), "number");
	});

	// generic switch test function
	var sliderSwitchTest = function(opts){
		var slider = $("#slider-switch"),
			  handle = slider.siblings('.ui-slider').find('a'),
		    switchValues = {
					'off' : 0,
					'on' : 1
				};

		// One for the select and one for the aria-valuenow
		expect( opts.keyCodes.length * 2 );

		$.each(opts.keyCodes, function(i, elem){
			// reset the values
			slider[0].selectedIndex = switchValues[opts.start];
			handle.attr({'aria-valuenow' : opts.start });

			// stub the keycode and trigger the event
			$.Event.prototype.keyCode = $.mobile.keyCode[elem];
			handle.trigger('keydown');

			deepEqual(handle.attr('aria-valuenow'), opts.finish, "handle value is " + opts.finish);
			deepEqual(slider[0].selectedIndex, switchValues[opts.finish], "select input has correct index");
		});
	};

	test( "switch should select on with up, right, page up and end", function(){
		sliderSwitchTest({
			start: 'off',
			finish: 'on',
			keyCodes: ['UP', 'RIGHT', 'PAGE_UP', 'END']
		});
	});

	test( "switch should select off with down, left, page down and home", function(){
		sliderSwitchTest({
			start: 'on',
			finish: 'off',
		  keyCodes: ['DOWN', 'LEFT', 'PAGE_DOWN', 'HOME']
		});
	});

	test( "onchange should not be called on create", function(){
		equal(onChangeCnt, 0, "onChange should not have been called");
	});

	test( "onchange should be called onchange", function(){
		onChangeCnt = 0;
		$( "#onchange" ).slider( "refresh", 50 );
		equal(onChangeCnt, 1, "onChange should have been called once");
	});

	test( "slider controls will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-slider").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-slider").length, "enhancements applied" );
	});

	var createEvent = function( name, target, x, y ) {
		var event = $.Event( name );
		event.target = target;
		event.pageX = x;
		event.pageY = y;
		return event;
	};

	test( "toggle switch should fire one change event when clicked", function(){
		var control = $( "#slider-switch" ),
			widget = control.data( "slider" ),
			slider = widget.slider,
			handle = widget.handle,
			changeCount = 0,
			changeFunc = function( e ) {
				ok( control[0].selectedIndex !== currentValue, "change event should only be triggered if the value changes");
				++changeCount;
			},
			event = null,
			offset = handle.offset(),
			currentValue = control[0].selectedIndex;

		control.bind( "change", changeFunc );

		// The toggle switch actually updates on mousedown and mouseup events, so we go through
		// the motions of generating all the events that happen during a click to make sure that
		// during all of those events, the value only changes once.

		slider.trigger( createEvent( "mousedown", handle[ 0 ], offset.left + 10, offset.top + 10 ) );
		slider.trigger( createEvent( "mouseup", handle[ 0 ], offset.left + 10, offset.top + 10 ) );
		slider.trigger( createEvent( "click", handle[ 0 ], offset.left + 10, offset.top + 10 ) );

		control.unbind( "change", changeFunc );

		ok( control[0].selectedIndex !== currentValue, "value did change");
		deepEqual( changeCount, 1, "change event should be fired once during a click" );
	});

	var assertLeftCSS = function( obj, opts ) {
		var integerLeft, compare, css, threshold;

		css = obj.css('left');
		threshold = opts.pxThreshold || 0;

		if( css.indexOf( "px" ) > -1 ) {
			// parse the actual pixel value returned by the left css value
			// and the pixels passed in for comparison
			integerLeft = Math.round( parseFloat( css.replace("px", "") ) ),
			compare = parseInt( opts.pixels.replace( "px", "" ), 10 );

			// check that the pixel value provided is within a given threshold; default is 0px
			ok( compare >= integerLeft - threshold && compare <= integerLeft + threshold, opts.message );
		} else {
			equal( css, opts.percent, opts.message );
		}
	};

	asyncTest( "toggle switch handle should snap in the old position if dragged less than half of the slider width, in the new position if dragged more than half of the slider width", function() {
		var control = $( "#slider-switch" ),
			widget = control.data( "slider" ),
			slider = widget.slider,
			handle = widget.handle,
			width = handle.width(),
			offset = null;

		$.testHelper.sequence([
			function() {
				// initialize the switch
				control.val('on').slider('refresh');
			},

			function() {
				assertLeftCSS(handle, {
					percent: '100%',
					pixels: handle.parent().css('width'),
					message: 'handle starts on the right side'
				});

				// simulate dragging less than a half
				offset = handle.offset();
				slider.trigger( createEvent( "mousedown", handle[ 0 ], offset.left + width - 10, offset.top + 10 ) );
				slider.trigger( createEvent( "mousemove", handle[ 0 ], offset.left + width - 20, offset.top + 10 ) );
				slider.trigger( createEvent( "mouseup", handle[ 0 ], offset.left + width - 20, offset.top + 10 ) );
			},

			function() {
				assertLeftCSS(handle, {
					percent: '100%',
					pixels: handle.parent().css('width'),
					message: 'handle ends on the right side'
				});

				// initialize the switch
				control.val('on').slider('refresh');
			},

			function() {
				assertLeftCSS(handle, {
					percent: '100%',
					pixels: handle.parent().css('width'),
					message: 'handle starts on the right side'
				});

				// simulate dragging more than a half
				offset = handle.offset();
				slider.trigger( createEvent( "mousedown", handle[ 0 ], offset.left + 10, offset.top + 10 ) );
				slider.trigger( createEvent( "mousemove", handle[ 0 ], offset.left - ( width / 2 + 10 ), offset.top + 10 ) );
				slider.trigger( createEvent( "mouseup", handle[ 0 ], offset.left - ( width / 2 + 10 ), offset.top + 10 ) );
			},

			function() {
				assertLeftCSS(handle, {
					percent: '0%',
					pixels: '0px',
					message: 'handle ends on the left side'
				});

				start();
			}
		], 500);
	});

	asyncTest( "toggle switch handle should not move if user is dragging and value is changed", function() {
		var control = $( "#slider-switch" ),
			widget = control.data( "slider" ),
			slider = widget.slider,
			handle = widget.handle,
			width = handle.width(),
			offset = null;

		$.testHelper.sequence([
			function() {
				// initialize the switch
				control.val('on').slider('refresh');
			},

			function() {
				assertLeftCSS(handle, {
					percent: '100%',
					pixels: handle.parent().css('width'),
					message: 'handle starts on the right side'
				});

				// simulate dragging more than a half
				offset = handle.offset();
				slider.trigger( createEvent( "mousedown", handle[ 0 ], offset.left + 10, offset.top + 10 ) );
				slider.trigger( createEvent( "mousemove", handle[ 0 ], offset.left - ( width / 2 ), offset.top + 10 ) );
			},

			function() {
				var min, max;
				if( handle.css('left').indexOf("%") > -1 ){
					min = "0%";
					max = "100%";
				} else {
					min = "0px";
					max = handle.parent().css( 'width' );
				}

				notEqual(handle.css('left'), min, 'handle is not on the left side');
				notEqual(handle.css('left'), max, 'handle is not on the right side');

				// reset slider state so it is ready for other tests
				slider.trigger( createEvent( "mouseup", handle[ 0 ], offset.left - ( width / 2 ), offset.top + 10 ) );

				start();
			}
		], 500);
	});

	asyncTest( "toggle switch should refresh when disabled", function() {
		var control = $( "#slider-switch" ),
			handle = control.data( "slider" ).handle;

		$.testHelper.sequence([
			function() {
				// set the initial value
				control.val('off').slider('refresh');
			},

			function() {
				assertLeftCSS(handle, {
					percent: '0%',
					pixels: '0px',
					message: 'handle starts on the left side'
				});

				// disable and change value
				control.slider('disable');
				control.val('on').slider('refresh');
			},

			function() {
				assertLeftCSS(handle, {
					percent: '100%',
					pixels: handle.parent().css( 'width' ),
					message: 'handle ends on the right side'
				});

				// reset slider state so it is ready for other tests
				control.slider('enable');

				start();
			}
		], 500);
	});

	asyncTest( "moving the slider triggers 'slidestart' and 'slidestop' events", function() {
		var control = $( "#start-stop-events" ),
			widget = control.data( "slider" ),
			slider = widget.slider;

		$.testHelper.eventCascade([
			function() {
				// trigger the slider grab event
				slider.trigger( "mousedown" );
			},

			"slidestart", function( timeout ) {
				ok( !timeout, "slidestart fired" );
				slider.trigger( "mouseup" );
			},

			"slidestop", function( timeout ) {
				ok( !timeout, "slidestop fired" );
				start();
			}
		], 500);
	});

	// NOTE this test isn't run because the event data isn't easily accessible
	// and with the advent of the widget _on method we are actually testing the
	// widget from UI which has it's own test suite for these sorts of things
	// ie, don't test your dependencies / framework
	if( !( $.fn.jquery.match(/^1.8/) )){
		test( "slider should detach event", function() {
			var slider = $( "#remove-events-slider" ),
			doc = $( document ),
			vmouseupLength,
			vmousemoveLength;

			function getDocumentEventsLength( name ){
				return (doc.data( 'events' )[name] || []).length;
			}

			vmouseupLength = getDocumentEventsLength( "vmouseup" );
			vmousemoveLength = getDocumentEventsLength( "vmousemove" );

			slider.remove();

			equal(getDocumentEventsLength( "vmouseup" ), (vmouseupLength - 1), 'vmouseup event was removed');
			equal(getDocumentEventsLength( "vmousemove" ), (vmousemoveLength - 1), 'vmousemove event was removed');
		});
	}
})(jQuery);