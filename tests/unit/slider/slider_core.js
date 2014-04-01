/*
 * mobile slider unit tests
 */
(function($){
	$.mobile.page.prototype.options.keepNative = "input.should-be-native";
	
	module( "jquery.mobile.slider.js core" );

	// not testing the positive case here since's it's obviously tested elsewhere
	test( "slider elements in the keepNative set shouldn't be enhanced", function() {
		deepEqual( $("input.should-be-native").siblings(".ui-slider-track").length, 0 );
	});

	test( "refresh should force val to nearest step", function() {
		var slider = $( "#step-slider" ),
			step = parseInt(slider.attr( "step" ), 10);

		slider.val( step + 1 );

		slider.slider( 'refresh' );

		ok( step > 1, "the step is greater than one" );
		ok( slider.val() > 0, "the value has been altered" );
		deepEqual( slider.val() % step, 0, "value has 'snapped' to a step" );
	});

	test( "empty string value results defaults to slider min value", function() {
		var slider = $( "#empty-string-val-slider" );
		deepEqual( slider.attr('min'), "10", "slider min is greater than 0" );
		deepEqual( slider.val( '' ).slider( 'refresh' ).val(), slider.attr('min'), "val is equal to min attr");
	});

	test( "flip toggle switch title should be current selected value attr", function() {
		var slider = $( "#slider-switch" );

		deepEqual(slider.siblings(".ui-slider-switch").find("a").attr('title'),
				 $(slider.find("option")[slider[0].selectedIndex]).text(),
				 "verify that the link title is set to the selected option text");
	});

	test( "data-highlight works properly", function() {
		var $highlighted = $("#background-slider"), $unhighlighted = $("#no-background-slider");

		deepEqual( $highlighted.siblings( ".ui-slider-track" ).find( ".ui-slider-bg" ).length, 1,
					"highlighted slider should have a div for the track bg" );
		deepEqual( $unhighlighted.siblings( ".ui-slider-track" ).find( ".ui-slider-bg" ).length, 0,
					"unhighlighted slider _not_ should have a div for the track bg" );
	});

	test( "labels that have id keep that id", function() {
		var label = $( "[for=label-id-slider]" );
		equal(label.attr( "id" ), "label-id", "label id was not changed" );
	});

	test( "labels without an id get an id", function() {
		var slider = $( "#empty-string-val-slider" ),
			label = $( "[for=empty-string-val-slider]" );
		equal(label.attr( "id" ), slider.attr( "id" ) + "-label", "the label id is based off the slider id" );
	});

	// NOTE init binding to alter the setting is in settings.js
	test( "slider input does not get clear button", function() {
		deepEqual( $( ".textinput-test" ).find( ".ui-input-clear" ).length, 0, "slider input does not get clear button" );
	});
	
	test( "slider input is not wrapped in div.ui-input-text", function() {
		ok( ! $( "#textinput-test" ).parents().is( "div.ui-input-text" ), "slider input is not wrapped in div.ui-input-text" );
	});

	test( "slider tooltip", function() {
		var tooltip = $( "#tooltip-test" ).siblings( "div.ui-slider-popup" );

		deepEqual( tooltip.length, 1, "is present" );
		deepEqual( tooltip.is( ":visible" ), false, "is initially hidden" );
	});

	test( "slider is enabled/disabled correctly", function() {
		var slider = $( "#disable-test" ),
			track = slider.siblings( "div" );

			testDisabled = function( prefix, expectedDisabled ) {
				deepEqual( !!track.attr( "aria-disabled" ), expectedDisabled,
					prefix + "'aria-disabled' is " + expectedDisabled );
				deepEqual( !!slider.attr( "disabled" ), expectedDisabled,
					prefix + "'disabled' property is " + expectedDisabled );
				deepEqual( track.hasClass( "ui-state-disabled" ), expectedDisabled,
					prefix + "track class 'ui-state-disabled' is " +
						( expectedDisabled ? "on" : "off" ) );
			};

		testDisabled( "Initially: ", false );
		slider.slider( "option", "disabled", true );
		testDisabled( "After setting option 'disabled' to true: ", true );
		slider.slider( "option", "disabled", true );
		testDisabled( "After setting option 'disabled' to true a second time: ", true );
	});

	test( "refresh is triggered on mouseup", function() {
		expect( 1 );
		var slider = $( "#mouseup-refresh" );

		slider.val( parseInt(slider.val(), 10) +  10 );
		slider.change(function() {
			ok( true, "slider changed" );
		});
		slider.trigger( "mouseup" );
	});

	test( "slider tooltip & button values should match after input value changes", function() {
		var slider = $("#tooltip-test-both");
		var sliderHandle = slider.siblings(".ui-slider-track").children(".ui-slider-handle");

		slider.val( "9" ).blur();

		ok( slider.val() === sliderHandle.text(), "slider text should match handle text");
	});
})( jQuery );
