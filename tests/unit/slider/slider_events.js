/*
 * mobile slider unit tests
 */

(function($){
	var onChangeCnt = 0;
	window.onChangeCounter = function() {
		onChangeCnt++;
	};
	module('jquery.mobile.slider.js');

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
			same(val, window.parseFloat(slider.val(), 10), "new value is " + opts.increment + " different");
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
		same(slider.val(), "200");
		slider.blur();
		same(slider.val(), slider.attr('max'));
	});

	test( "slider should not validate input on keyup", function(){
		var slider = $("#range-slider-up");
		slider.focus();
		slider.val(200);
		same(slider.val(), "200");
		slider.keyup();
		same(slider.val(), "200");
	});

	test( "input type should degrade to number when slider is created", function(){
		same($("#range-slider-up").attr( "type" ), "number");
	});

    test( "slider with range-background theme should have a inner range-div with corresponding theme and width", function(){
        var slider = $("#range-background");
        slider.focus();
        same(slider.val(), "15");
        var backgroundDiv = slider.next().find('.ui-slider-range-background');
        same((parseInt(100 * parseFloat(backgroundDiv.css('width')) / parseFloat(backgroundDiv.parent().css('width')) ) + '%'), '15%');
        ok(backgroundDiv.hasClass('ui-btn-down-c'));
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

			same(handle.attr('aria-valuenow'), opts.finish, "handle value is " + opts.finish);
			same(slider[0].selectedIndex, switchValues[opts.finish], "select input has correct index");
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
		equals(onChangeCnt, 0, "onChange should not have been called");
	});

	test( "onchange should be called onchange", function(){
		onChangeCnt = 0;
		$( "#onchange" ).slider( "refresh", 50 );
		equals(onChangeCnt, 1, "onChange should have been called once");
	});


	test( "slider controls will create when inside a container that receives a 'create' event", function(){
		ok( !$("#enhancetest").appendTo(".ui-page-active").find(".ui-slider").length, "did not have enhancements applied" );
		ok( $("#enhancetest").trigger("create").find(".ui-slider").length, "enhancements applied" );
	});
})(jQuery);